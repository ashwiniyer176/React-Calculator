import React, { Component } from "react";

export default class Button extends Component {
  printText(text) {
    console.log(text);
  }

  render() {
    return (
      <div className={`column-${this.props.cols}`}>
        <button onClick={() => this.props.action(this.props.symbol)}>
          {this.props.symbol}
        </button>
      </div>
    );
  }
}
