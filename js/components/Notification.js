class Notification{
    constructor(news){
        this.disabled = !!window.localStorage['notification-disabled'];
        
        if(!this.disabled){
            this.addNews(news);  
            this.render();            
        }
    }
    
    render(){
        this.element = document.createElement('div');
        this.element.classList.add('notification');             
        this.pager = new Pager(this.news);
        this.pager.element.classList.add('notification__pager');
        this.element.innerHTML = 
        `<div class="notification__wrapper">
            <div class="notification__header">
                <span class="notification__title">У вас есть непрочитанные соообщения.</span>
                <span class="notification__close">✘</span>
            </div>
            <div class="notification__body">               
            </div>
            <div class="notification__footer">
                <div class="notification__settings">
                    <label for="disable-setting">Отключить уведомления</label>
                    <input type="checkbox" id="disable-setting"/>
                </div>                
            </div>
        </div>`;
        this.renderBody();        
        this.element.querySelector('.notification__footer').appendChild(this.pager.element);
        this.addLinsteners();
    }

    renderBody(){
        this.body = this.element.querySelector('.notification__body');        
        this.body.innerHTML =
            `<div class="notification__wrapper">  
                <h4>${this.pager.selected.title}</h4>
                <p>${this.pager.selected.text}</p>
            </div>`;        
    }    

    addLinsteners(){
        let close = this.element.querySelector('.notification__close');
        close.addEventListener('click', (event) => {            
            this.element.outerHTML = '';
        });    
        
        let disable = this.element.querySelector('#disable-setting');
        disable.addEventListener('change', (event) => {            
            this.disable();
        });  

        document.addEventListener('changedPage', (event) => {            
            this.renderBody();
        });       
    }

    disable(){
        let value = !!window.localStorage['notification-disabled'];
        window.localStorage.setItem('notification-disabled', value);
    }

    addNews(news){
        if(!news){
            return;
        }    
        if(!this.news){
            this.news = [];
        }
        this.news.push(...news);
    }
}