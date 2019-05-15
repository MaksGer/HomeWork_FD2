//Класс 

class RootElement {
    constructor(tagName = 'div') {
        this.$el = document.createElement(tagName);
        this.$el.style.marginBottom = '20px';
    }
    append() {
        document.querySelector('.wrapper').insertAdjacentElement('beforeend', this.$el)
    }
}

class Box extends RootElement {
    constructor(color, size = 150, tagName) {
        super(tagName);
        this.color = color;
        this.size = size;
    }

    create() {
        this.$el.style.background = this.color;
        this.$el.style.width = this.$el.style.height = `${this.size}px`;
        this.append();
        return this
    }
}

class Circle extends RootElement {
    constructor(color) {
        super();
        this.color = color;
    }
    create() {
        this.$el.style.borderRadius = '50%';
        this.$el.style.width = this.$el.style.height = '120px';
        this.$el.style.background = this.color;
        this.append();
        return this
    }
}
const redBox = new Box('red', 100, 'div').create();
//Переопределим у экземпляра родительское свойство. Для этого в начале
//создадим в объекте пустое поле с данным ключом, а затем запишем в него
//нужное нам значени
redBox.$el.style.marginBottom = {};
redBox.$el.style.marginBottom = '100px';
const blueBox = new Box('blue').create();
const  circle = new Circle('green').create();