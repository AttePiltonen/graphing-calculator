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
        return operation(a, b);
      };
    
    //const displayCalculation = document.querySelector('.calculation');
    const displaySolution = document.querySelector('.solution');
    //let calculation = '';
    //let solution = '';
    let num1 = 0;
    let num2 = 0;
    let operation;
    const operation_obj = {'+':add, '-':subtract, 'X':multiply, '/':divide}

    document.querySelector('.buttons-container').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const value = event.target.textContent;
            if (value === 'AC') {
                num1 = 0;
                num2 = 0;
                displaySolution.textContent = 0;
            }
            if (value in operation_obj) {
                operation = operation_obj[value];
            }
            if (value === '=') {
                displaySolution.textContent = operate(num1, num2, operation);
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