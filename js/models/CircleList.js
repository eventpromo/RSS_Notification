class CircleNode {
    constructor(value) {
        this.data = value;
        this.previous = null;
        this.next = null;
        this.index = 0;
        this.isLast = true;
        this.isFirst = false;
    }
}

class CircleList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null; 
        this.current = null;       
    }

    next(){
        this.current = this.current.next;
    }

    prev(){
        this.current = this.current.previous;
    }

    goTo(index){
        let counter = this._length;
        let current = this.head;
        while(counter--){               
            if(current.index === index){
                this.current = current;
                return;                
            }    
            current = current.next;        
        }
    }

    add(value) {
        var node = new CircleNode(value);                
        if (this._length) {
            this.tail.next = node;
            node.previous = this.tail;
            node.index = this.tail.index + 1;
            this.tail.isLast = false;
            this.tail = node;
        } else {
            node.isFirst = true;
            this.head = node;
            this.tail = node;
            
            this.current = node;
        }
        node.next = this.head;                       
        this.head.previous = node;
        this._length++;
        return node;
    };
    
    getSegment(index, number){
        let segment = [];
        let current = this.head;
        let counter = this._length;
        number = number > this._length ? this._length : number;
        if(this._length === 1 && current.index === index){
            segment.push(current);
        }
        while(counter--){               
            if(current.index === index){
                while(number--){
                    segment.push(current);
                    current = current.next;
                }
                return segment;                
            }
            current = current.next;
        }
        return segment;
    }
}