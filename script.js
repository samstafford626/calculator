// Initialize variables for clear btn, display, number btn(0-9),
//  and operations buttons
let clearBtn = document.querySelector('.clear');
let display = document.querySelector('.display');
let numBtn = document.querySelectorAll('.num');
let operationBtn = document.querySelectorAll('.operation-btn')

// add event listeners
operationBtn.forEach(btn => btn.addEventListener('click', operate));
numBtn.forEach(btn => btn.addEventListener('click', addToDisplay));
clearBtn.addEventListener('click', clearDisplay);

// tracking data
let currentNumber = '';
let currentOperator = '';
let lastBtn = '';
let runningNumber = 0;

function operate(e) {
    changeBackground(e, 'operator');

    // evaluate the previous expression
    if (currentOperator == 'add') {
        runningNumber += Number(currentNumber);
        display.textContent = roundNum(runningNumber);
    } else if (currentOperator == 'divide') {
        if (currentNumber == '0') {
            alert('ERROR: DIVIDE BY 0')
        } else {
            runningNumber /= Number(currentNumber);
            display.textContent = roundNum(runningNumber);
        }
    } else if (currentOperator == 'subtract') {
        runningNumber -= Number(currentNumber);
        display.textContent = roundNum(runningNumber);
    } else if (currentOperator == 'multiply') {
        runningNumber *= Number(currentNumber);
        display.textContent = roundNum(runningNumber);
    } else if (currentOperator == 'evaluate') {
        
    } else {
        runningNumber = Number(currentNumber);
    }
    
    currentNumber = 0;//resets current number after operator

    // setup next expression
    currentOperator = e.srcElement.id;
    lastBtn = e.srcElement.id;
    checkSize();
}

function clearDisplay(e) {
    display.textContent = '0';
    runningNumber = 0;
    currentNumber = '';
    lastBtn = 'clear';
    currentOperator = '';
    display.style.fontSize = '108px';
    if (e !== undefined) {
        changeBackground(e,'clear')
    }
}

function addToDisplay(e) {
    changeBackground(e, 'num')
    // add function to check if decimal
    if (e.target.textContent == '.' && checkDecimal()) {
        return
    }

    //either replace the 0 or add to what's there
    if (lastBtn == 'num') {
        display.textContent += e.target.textContent;
    } else {
        display.textContent = e.target.textContent;
    }
    currentNumber = display.textContent;
    lastBtn = 'num';
    checkSize();
}

function roundNum(num) {
    return Math.round(num * 10000) / 10000;
}

function checkSize() {
    let size = display.textContent.length;
    // let newFontSize = display.style.fontSize;
    if (size == 7) {
        display.style.fontSize = '96px';
    } else if (size == 8) {
        display.style.fontSize = '86px';
    } else if (size == 9) {
        display.style.fontSize = '76px';
    } else if (size == 10) {
        display.style.fontSize = '66px';
    } else if (size == 11 || size == 12) {
        display.style.fontSize = '55px';
    } else if (size >= 13 && size <= 14) {
        display.style.fontSize = '45px';
    } else if (size >= 15) {
        alert('Error: OVERFLOW')
        clearDisplay();
    } else {
        display.style.fontSize = '108px';
    }
}

function checkDecimal() {
    if (display.textContent.includes('.')) {
        return true
    } else {
        return false
    }
}

function changeBackground(e, numOrOperator) {
    // clears background of all operator buttons on any click
    operationBtn.forEach(btn => btn.classList.remove('highlight'))

    // if operator is clicked (except equals), background color is changed
    if (numOrOperator == 'operator' && e.srcElement.id !== 'evaluate') {
        e.srcElement.classList.add('highlight');
    }

    // if number, clear, or equals is hit, background color flashes change
    if (numOrOperator == 'num' || numOrOperator == 'clear' || e.srcElement.id == 'evaluate') {
        e.srcElement.classList.add('highlight')
        setTimeout(() => {
            e.srcElement.classList.remove('highlight');
        }, "250")
    }
    
}


