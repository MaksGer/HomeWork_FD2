let decimaBtn = document.getElementById("calc-decimal");
let clearBnt = document.getElementById("calc-clear");
let backspaceBnt = document.getElementById("calc-backspace");
let equalsBtn = document.getElementById("calc-equals");
let displayValElement = document.getElementById("calc-display-val");
let showmemoryBtn = document.getElementById("calc-memory");
let setMemoryBtn = document.getElementById("set-memory");
let clearLocalStorage = document.getElementById("clear");

let displayVal = "0";
let pendingVal;
let evalStringArray = [];
let _local = window.localStorage;

// доп выборка в массив по операторам и цифрам//
let calcNumBtns = document.getElementsByClassName("calc-btn-num");
let calcOperatorBtns = document.getElementsByClassName("calc-btn-operator");

let updateDisplayVal = (clickObj) => {
    let btnText = clickObj.target.innerText;

    if (displayVal === "0") displayVal = " ";
    displayVal += btnText;
    displayValElement.innerText = displayVal;

};

let performOperation = (clickObj) => {
    let operator = clickObj.target.innerText;

    function setOperator(arg) {
        pendingVal = displayVal;
        displayVal = "0";
        displayValElement.innerText = displayVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push(arg)
    };

    switch (operator) {
        case "+":
            setOperator("+");
            break;
        case "-":
            setOperator("-");
            break;

        case "x":
            setOperator("*");
            break;

        case "÷":
            setOperator("/");
            break;

        case "=":
            evalStringArray.push(displayVal);
            let evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + "";
            displayValElement.innerText = displayVal;
            evalStringArray = [];
            break;
    }
};
//вешаем обработчики на кнопки//
for (let i = 0; i < calcNumBtns.length; i++) {
    calcNumBtns[i].addEventListener("click", updateDisplayVal, false)
};
for (let i = 0; i < calcOperatorBtns.length; i++) {
    calcOperatorBtns[i].addEventListener("click", performOperation, false)
};

clearBnt.onclick = () => {
    displayVal = "0";
    pendingVal = undefined;
    evalStringArray = [];
    displayValElement.innerText = displayVal;
};
backspaceBnt.onclick = () => {
    let lengthOfDisplayVal = displayVal.length;
    displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);

    if (displayVal === " ")
        displayVal = "0";

    displayValElement.innerText = displayVal;
};
decimaBtn.onclick = () => {
    if(!displayVal.includes(".")) {
        displayVal += ".";
    }

    displayValElement.innerText = displayVal;
};
setMemoryBtn.onclick = () => {
    _local.setItem("result", displayVal);
};
showmemoryBtn.onclick = () => {
    if (_local.getItem("result")){
    displayVal = _local.getItem("result");
    }
    else {displayVal = "0"}
    displayValElement.innerText = displayVal;
};
clearLocalStorage.onclick = () => {
    localStorage.clear();
};
equalsBtn.onclick = () => {
   setMemoryBtn.classList.remove("hide")
};
