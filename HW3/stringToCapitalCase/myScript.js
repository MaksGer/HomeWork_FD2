let userString = document.getElementById("userString");
let result = document.getElementById("result");


function ToCapitalCase(a) {
    //Забираем строку из формы
    let string = a.value;
    //Преобразуем строку в массив по разделителю пробел
    let words = string.split(" ");
    //Блок обьявления переменных, куда запишем промежуточные результаты
    let resultArray = [];
    let resultString;

    //Запуск цикла for, для преобразования слов
    for (let i = 0; i < words.length; i++) {
        //В отдельную переменную забираем первую букву каждого слова, приведя ее к верхнему регистру
        let firstLetter = words[i].charAt(0).toUpperCase();
        //Остальные буквы каждого слова записываем в другую переменную
        let leftLetters = words[i].substring(1, words[i].length);
        //Конкатенация двух строк - Первой буквы и остальных, с последующей записью в массив (запись в конец массива)
        resultArray.push(firstLetter + leftLetters);
    }

    //Обьединяем массив в строку через пробел
    resultString = resultArray.join(" ");
    //Выводим результат в DOM
    result.value = resultString;
}




