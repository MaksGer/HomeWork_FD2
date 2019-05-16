function $(selector){
    const elements = document.querySelectorAll(selector);
    return new OurJquery(elements);
}

function OurJquery(elements){
    
    this.elements = elements;

    this.on = function(eventname, f){
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].addEventListener(eventname, f);
        }
        
        return this;
    };
    
    this.addClass = function(name){
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].classList.add(name);
        }
        
        return this;
    };
    
    this.removeClass = function(name){
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].classList.remove(name);
        }
        
        return this;
    };

    this.validation = function() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].addEventListener('blur', () => {
                let type = this.elements[i].attributes.name.value;
                let value = this.elements[i].value;
                let check;
                switch (type) {
                    case 'name':
                        check = /^[a-z ,.'-]+$/i.test(value);
                        break;
                    case 'phone':
                        check = /^(\+|\d)[0-9]{7,16}$/.test(value);
                        break;
                    case 'email':
                        check = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value);
                        break;
                    case 'number':
                        check = /^\d+$/.test(value);
                        break;
                }
                if (check) {
                    this.elements[i].classList.add('valid');
                } else {
                    this.elements[i].classList.add('err');
                }
            });
        }
    }
    
//     this.html = function(html){
// //         if(typeof(html) === "undefined"){
// //             return this.elements[0].innerHTML;
// //         }
// //
// //         for(var i = 0; i < this.elements.length; i++){
// //             this.elements[i].innerHTML = html;
// //         }
// //
// //         return this;
// //     }
};