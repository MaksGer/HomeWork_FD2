// Пример реализации callback-hell
fs.readdir(source, function (err, files) {
    if (err) {
      console.log('Error finding files: ' + err);
    } else {
      files.forEach(function (filename, fileIndex) {
        console.log(filename);
        gm(source + filename).size(function (err, values) {
          if (err) {
            console.log('Error identifying file size: ' + err);
          } else {
            console.log(filename + ' : ' + values);
            var aspect = (values.width / values.height);
            widths.forEach(function (width, widthIndex) {
              var height = Math.round(width / aspect);
              console.log('resizing ' + filename + 'to ' + height + 'x' + height);
              this.resize(width, height).write(dest + 'w' + width + '_' + filename, function (err) {
                if (err) {
                  console.log('Error writing file: ' + err);
                }
              });
            }.bind(this));
          }
        });
      });
    }
  });
//   Отличительная особенность - большая вложенность функций одной в другую. Используется 
//   для обработки кода в случаях когда есть некоторая задержка. Например отправка запроса 
//   на сервер и дальнейшая обработка и отображение на страницы полученного от сервера. 
//   Явный минус такого способо - нечитаемость кода, сложно обслуживать/вносить правки в код
//   Дабы облегчить работу с таким кодом принято - давать имена функциям, делить на модули
//   обрабатывать ошибки. С введением ES6 для этих задач ввели промисы и генераторы.