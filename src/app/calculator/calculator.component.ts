import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  constructor() { }  
  ngOnInit() { }

  //Variables
  calculatorScreen : string = '0';
  currentNumber : string = null;
  firstOperand : number = null;
  operator : string = null;
  waitForSecondNumber : boolean = false;
  
  /* Function: getNumber
   *  Purpose: Sets the selected value to the variable for operations 
   */
  public getNumber(v : string){
    this.currentNumber = v;
    if (this.waitForSecondNumber) {
      this.waitForSecondNumber = false;
      this.calculatorScreen += v;
    } else this.calculatorScreen === '0' ? this.calculatorScreen = v : this.currentNumber += this.calculatorScreen += v;
  }
  
  /* Function: getDecimal
   *  Purpose: Appends a decimal to the current value
   */
  public getDecimal() {
	  if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
      this.calculatorScreen += '.';
    }
  }
  
  /*  Function: doCalculation
   *   Purpose: Returns a calculated result based on the argument values passed in
   */
  private doCalculation(op: string, secondOp: number) {
    switch (op){
      case '+':
        return this.firstOperand += secondOp;
      case '-': 
        return this.firstOperand -= secondOp; 
      case '*': 
        return this.firstOperand *= secondOp; 
      case '/': 
        return this.firstOperand /= secondOp; 
      case '=':
        return secondOp;
    }
  }
  
  /* Function: getOperation
   *  Purpose: Prepares the operand for calculation depending on the sequence entered
   */
  public getOperation(op : string){
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber); 
      this.calculatorScreen = this.firstOperand + op;
    } else if(this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber))
      this.calculatorScreen = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
  }
  
  /* Function: clear
   *  Purpose: Clears all pertinent variables
   */
  public clear(){
    this.calculatorScreen = '0';
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }  
}