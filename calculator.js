document.addEventListener('DOMContentLoaded', function() {
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        if (b === 0) {
            return "Math ERROR";
        }
        return a / b;
    }

    function operate(a, b, operation) {
        try {
            return operation(a, b);
        } catch (e) {
            return 0;  // Do nothing if user presses = when no numbers are pressed
        }
    }

    let displaySolution = document.querySelector('.solution');
    let num1 = '0', num2 = '0';
    let operation;
    const operation_obj = {'+': add, '-': subtract, '×': multiply, '÷': divide};
    const numberVals = '0123456789';
    let operationActive = false;
    let activeOperationButton = null;

    document.querySelector('.buttons-container').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const value = event.target.textContent;

            // Handle number and decimal inputs
            if (numberVals.includes(value) || value === '.') {
                if (operationActive) {
                    if (num2 !== '0' || num2 === '0.') {
                        num2 += value;
                        displaySolution.textContent = num2;
                    } else {
                        num2 = value;
                        displaySolution.textContent = num2;
                    }
                } else {
                    if (num1 !== '0' || num1 === '0.') {
                        num1 += value;
                        displaySolution.textContent = num1;
                    } else {
                        num1 = value;
                        displaySolution.textContent = num1;
                    }
                }
            }

            // Handle AC (All Clear)
            if (value === 'AC') {
                num1 = num2 = '0';
                displaySolution.textContent = '0';
                operationActive = false;
                if (activeOperationButton) {
                    activeOperationButton.classList.remove('active');
                    activeOperationButton = null;
                }
            }

            // Handle DEL (Backspace)
            if (value === 'DEL') {
                if (displaySolution.textContent.length !== 1) {
                    displaySolution.textContent = displaySolution.textContent.slice(0, -1);
                    if (operationActive) {
                        num2 = num2.slice(0, -1);
                    } else {
                        num1 = num1.slice(0, -1);
                    }
                } else {
                    displaySolution.textContent = '0';
                    if (operationActive) {
                        num2 = '0';
                    } else {
                        num1 = '0';
                    }
                }
            }

            // Handle operation buttons (+, -, ×, ÷)
            if (value in operation_obj) {
                if (num2 !== '0') {
                    const result = operate(Number(num1), Number(num2), operation);
                    displaySolution.textContent = parseInt(result) === result ? result : +result.toFixed(5);
                    num1 = result;
                    num2 = '0';
                }
                operation = operation_obj[value];
                operationActive = true;
                if (activeOperationButton) {
                    activeOperationButton.classList.remove('active');
                }
                activeOperationButton = event.target;
                activeOperationButton.classList.add('active');
            }

            // Handle equals button (=)
            if (value === '=') {
                if (num2 !== '0') {
                    const result = operate(Number(num1), Number(num2), operation);
                    displaySolution.textContent = parseInt(result) === result || result === 'Math ERROR' ? result : +result.toFixed(5);
                    operation = null;
                    num1 = result;
                    num2 = '0';
                    if (activeOperationButton) {
                        activeOperationButton.classList.remove('active');
                        activeOperationButton = null;
                    }
                }
            }

            // Handle +/- button
            if (value === '+/-') {
                if (operationActive) {
                    if (Number(num2)) {
                        num2 = displaySolution.textContent = (-Number(num2)).toString();
                    }
                } else {
                    if (Number(num1)) {
                        num1 = displaySolution.textContent = (-Number(num1)).toString();
                    }
                }
            }

            // Button press effect
            if (!(value in operation_obj)) {
                event.target.classList.add('pressed');
                setTimeout(() => {
                    event.target.classList.remove('pressed');
                }, 75);
            } else {
                if (activeOperationButton) {
                    activeOperationButton.classList.remove('active');
                }
                activeOperationButton = event.target;
                activeOperationButton.classList.add('active');
            }
        }
    });
});
