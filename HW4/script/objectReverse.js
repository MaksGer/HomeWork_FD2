let cssColors = {
    "Blue": "#0000FF",
    "Olive": "#808000",
    "Gray": "#808080",
    "Magenta": "#FF00FF",
    "OrangeRed": "#FF4500",
    "Yellow": "#FFFF00"
};

function transformObject(obj) {
    let objectTransformed = {};

    for (key in obj) {
        objectTransformed[obj[key]] = key;
    }
    return objectTransformed;
}


console.log(transformObject(cssColors));