import React, { Component } from "react";
import Button from "../Buttons/Button";
import "./Calculator.css";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      Stack: [],
      operatorStack: [],
      operators: ["+", "-", "*", "/"],
    };
  }
  //Resets the calculator
  resetCalculator = () => {
    this.setState({ result: "", Stack: [] });
  };

  //resets the result
  resetResult = () => {
    this.setState({ result: "" });
  };

  //Push to Stack or operatorStack as per symbol
  pushToStack = (symbol) => {
    if (typeof symbol === "number") {
      let newStack = this.state.Stack;
      newStack.push(symbol);
      this.setState({ Stack: newStack });
    } else if (symbol !== "." && typeof symbol === "string") {
      let newOpStack = this.state.operatorStack;
      newOpStack.push(symbol);
      this.setState({ operatorStack: newOpStack });
    }
  };

  //Reads input and takes action as per input type
  classifyInput = (symbol) => {
    if (!this.state.operators.includes(symbol) && symbol !== "=") {
      let newResult = this.state.result + symbol;
      this.setState({ result: newResult });
    } else {
      let number = parseFloat(this.state.result);
      if (symbol !== "=") {
        this.pushToStack(number);
        this.pushToStack(symbol);
        this.resetResult();
      }
      if (symbol === "=") {
        this.pushToStack(number);
        console.log(this.state.Stack);
        console.log(this.state.operatorStack);
        let result = this.evaluateExpression(symbol);
        console.log(result);
        this.setState({ result: result });
      }
    }
  };

  // Evaluates and returns answer
  evaluateExpression = (symbol) => {
    let { Stack, operatorStack } = this.state;
    var result = 0;
    while (operatorStack.length > 0) {
      let op1 = Stack.shift();
      let op2 = Stack.shift();
      let opn = operatorStack.shift();
      switch (opn) {
        case "+":
          result = op1 + op2;
          break;

        case "-":
          result = op1 - op2;
          break;

        case "*":
          result = op1 * op2;
          break;
        case "/":
          result = op1 / op2;
          break;
      }
      console.log("Result:", result);
    }
    return result;
  };
  render() {
    const buttons = [
      { symbol: "C", cols: 3, action: this.resetCalculator },
      { symbol: "/", cols: 1, action: this.classifyInput },
      { symbol: "7", cols: 1, action: this.classifyInput },
      { symbol: "8", cols: 1, action: this.classifyInput },
      { symbol: "9", cols: 1, action: this.classifyInput },
      { symbol: "*", cols: 1, action: this.classifyInput },
      { symbol: "4", cols: 1, action: this.classifyInput },
      { symbol: "5", cols: 1, action: this.classifyInput },
      { symbol: "6", cols: 1, action: this.classifyInput },
      { symbol: "-", cols: 1, action: this.classifyInput },
      { symbol: "1", cols: 1, action: this.classifyInput },
      { symbol: "2", cols: 1, action: this.classifyInput },
      { symbol: "3", cols: 1, action: this.classifyInput },
      { symbol: "+", cols: 1, action: this.classifyInput },
      { symbol: "0", cols: 2, action: this.classifyInput },
      { symbol: ".", cols: 1, action: this.classifyInput },
      { symbol: "=", cols: 1, action: this.classifyInput },
    ];
    return (
      <div>
        <input type="text" value={this.state.result} />
        {buttons.map((button, i) => {
          return (
            <Button
              symbol={button.symbol}
              cols={button.cols}
              action={(symbol) => button.action(symbol)}
            />
          );
        })}
      </div>
    );
  }
}
