document.addEventListener('DOMContentLoaded', function() {
    function add (a, b) {
        return a + b;
      };
      
    function subtract (a, b) {
        return a - b;
      };
    
    function multiply (a, b) {
        return a * b;
      };
    
    function divide (a, b) {
        if (b === 0) {
            return "Math ERROR";
        }
        return a / b;
      };
    
    function operate (a, b, operation) {
        try {
        return operation(a, b);
        } catch (e) {
            //do nothing if user presses = when no numbers pressed
            return 0;
        }
      };
    
    const displaySolution = document.querySelector('.solution');
    let num1 = num2 = 0;
    let operation;
    const operation_obj = {'+':add, '-':subtract, 'X':multiply, '/':divide};
    const numberVals = '00123456789';
    let operationActive = false;

    document.querySelector('.buttons-container').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const value = event.target.textContent;
            if (numberVals.includes(value)) {
                if (operationActive) {
                    if (Number(num2)) {
                        num2 += value;
                        displaySolution.textContent += value;
                    } else {
                        num2 = value;
                        displaySolution.textContent = value;
                    }
                } else {
                    if (Number(num1)) {
                        num1 += value;
                        displaySolution.textContent += value;
                    } else {
                        num1 = value;
                        displaySolution.textContent = value;
                    }
                }
            }
            if (value === 'AC') {
                num1 = num2 = 0;
                displaySolution.textContent = 0;
                operationActive = false;
            }
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
            if (value === '.') {
                if (!displaySolution.textContent.includes('.')) {
                    displaySolution.textContent += '.';
                    if (operationActive) {
                        num2 += '.';
                    } else {
                        num1 += '.';
                    }
                }
            }
            if (value in operation_obj) {
                if (num2) {
                    result = operate(Number(num1), Number(num2), operation);
                    displaySolution.textContent = parseInt(result) === result ? result : result.toFixed(5);
                    num1 = result;
                    num2 = 0;
                    operation = operation_obj[value];
                    operationActive = true;
                } else {
                    operation = operation_obj[value];
                    operationActive = true;
                }
            }
            if (value === '=') {
                if (num2) {
                    result = operate(Number(num1), Number(num2), operation);
                    displaySolution.textContent = parseInt(result) === result ? result : result.toFixed(5);
                    num1 = result;
                    num2 = 0;
                }
            }
        };
    });

    // document.querySelector('.buttons-container').addEventListener('click', function(event) {
    //     if (event.target.tagName === 'BUTTON') {
    //         const value = event.target.textContent;

    //         if (value === 'DEL') {
    //             calculation = calculation.slice(0, -1);
    //         } else if (value === 'AC') {
    //             calculation = '';
    //             solution = '';
    //         } else if (value === '=') {
    //             try {
    //                 solution = '';
    //                 calculation = solution;
    //             } catch (e) {
    //                 solution = 'Error';
    //             }
    //         } else if (value === 'ANS') {
    //             calculation += solution;
    //         } else {
    //             calculation += value;
    //         }

    //         displayCalculation.textContent = calculation;
    //         displaySolution.textContent = solution;
    //     }
    //});
});