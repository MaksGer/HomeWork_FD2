let triangle = function () {
    let triangleType;
    arguments.length = 3; //Отбрасываем на всякий случай все входящие аргументы начиная с 4.
    let  args = [].slice.call(arguments, 0, 3).sort();
    if (args[0] + args[1] < args[2]){
        triangleType = "не существует"
    }

    let sum = args[0] ** 2 + args[1] ** 2;
    let sideBig = args[2] * 2;

    if (sum === sideBig) {triangleType = "прямоугольный"};
    if (sum < sideBig) {triangleType = "тупоугольный"};
    if (sum > sideBig) {triangleType = "остроугольный"};
    let result = `" Ваш треугольник ${triangleType}"`;
    return result
};