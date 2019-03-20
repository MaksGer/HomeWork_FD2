function drawTriangle() {
    let symbol, rows;

    symbol = String(document.getElementById("symbol").value);
    //Валидация на один символ
    symbol = symbol.charAt(0);

    //Получаем значение из формы и приводим к числу
    rows = parseInt(document.getElementById("rows").value);

    //Валидация на число задана через input type=number, ограничиваем диапазон значений
    let min = 3;
    let max = 30;
    rows = (rows < min)?rows = min:(rows > max?rows = max:rows);

    //Цикл. Рисуем треугольник
    for (let line = symbol; line.length <= rows; line += symbol)
        console.log(line);
}

