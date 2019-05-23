import $ from 'jquery'

$('<h1 />')
    .text('Заголовок для шапки')
    .css({
        textAlign: 'center',
        color: 'red'
    })
    .appendTo($('header'));

var data = null;
$.getJSON('../data.json', function(result) {
    data = result;
    console.log(data);
});