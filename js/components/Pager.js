class Pager{
    constructor(items, pageNumber = 3){
        this.items = items;
        this.count = this.items.length;
        this.pageNumber = pageNumber;
        this.circle = this.createCircle(items);
        
        this.render();
    }

    get selected(){        
        return this.circle.current.data;
    }
    
    addListeners(){
        this.element.addEventListener('click', (event) => {
            if(event.target.classList.contains('pager__page')){
                this.select(parseInt(event.target.dataset.index));
            }
            if(event.target.classList.contains('pager__prev')){
                this.prev();
            }
            if(event.target.classList.contains('pager__next')){
                this.next();
            }
        });   
        
        document.addEventListener('changedPage', (event) => {
            this.renderItems();
        });   
        
        document.addEventListener('keydown', (event) => {
            if(event.keyCode == '37'){
                this.prev();
            }

            if(event.keyCode == '39'){
                this.next();
            }            
        });   
    }

    createCircle(items){
        let circle = new CircleList();
        this.items.forEach(item => circle.add(item));
        return circle;
    }

    render(){
        this.element = document.createElement('div');
        this.element.classList.add('pager'); 
        this.renderItems();
        this.addListeners();
    }

    renderItems(){  
        this.renderedItems = this.circle.getSegment(Math.floor(this.circle.current.index / this.pageNumber) * this.pageNumber, this.pageNumber);
        let needRenderArrow = this.renderedItems.length > 1;
        this.element.innerHTML = '';
        if(needRenderArrow){
            this.element.innerHTML += '<span class="pager__prev">&#8678;</span>';
        }
        this.renderedItems.forEach((element) => {             
            let page = document.createElement('span');
            page.classList.add('pager__page');            
            page.dataset.index = element.index;            
            page.innerHTML = element.index + 1;
            if(element.index === this.circle.current.index){
                page.classList.add('pager__page_selected');
            }                         
            this.element.appendChild(page);                    
        });
        if(needRenderArrow){
            this.element.innerHTML += '<span class="pager__next">&#8680;</span>';
        }
    }

    select(index){          
        this.circle.goTo(index);      
        document.dispatchEvent(new CustomEvent('changedPage', { 'selected': this.selected }));
    }

    next(){
        this.circle.next();
        document.dispatchEvent(new CustomEvent('changedPage', { 'selected': this.selected }));
    }

    prev(){
        this.circle.prev();             
        document.dispatchEvent(new CustomEvent('changedPage', { 'selected': this.selected }));
    }
}

