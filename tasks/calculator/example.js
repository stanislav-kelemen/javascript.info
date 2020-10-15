'use strict';

let calculator = {
  read() {
    this.firstVal = +prompt('Input first operand', '');
    this.secondVal = +prompt('Input second operand', '');
  },
  sum() {
    return this.firstVal + this.secondVal;
  },
  mul() {
    return this.firstVal * this.secondVal;
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );