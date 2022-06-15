const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // add digit calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }
    // process all calculator operations
    processOperation(operation) {
        // check if current is empy
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // change operation
            if(this.previousOperationText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let operationValue 
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
            break;
            case "=":
                this.processEqualOperator();
            break;

            default:
                return;
        }
    }
    //Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ) {
      
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            //add current value to previus
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Change math operation
     changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = 
            previousOperationText.innerText.slice(0, -1) + operation;
     }

     // Delete the last digit
     processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
     }
     // Clear current Operation
     processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
     }
     //clear all operation
     processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
     }
     // Porces an operator
     processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);
     }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value);
        }
    });
});