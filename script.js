class Calculator {
  constructor() {
    this.display = document.getElementById("display");
    this.initEvents();
    this.initKeyboard();
  }
  initEvents() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.onclick = (event) => this.handleClick(event);
    });
  }

  initKeyboard() {
    document.addEventListener("keydown", (event) => this.handleKey(event));
  }

  handleKey(event) {
    const validKeys = "0123456789+-*/.=cCEnterBackspace";
    if (!validKeys.includes(event.key)) {
      return;
    }
    event.preventDefault();

    if (event.key === "Enter" || event.key === "=") {
      this.calculate();
    } else if (event.key.toLowerCase() === "c") {
      this.clear();
    } else if (event.key === "Backspace") {
      this.display.value = this.display.value.slice(0, -1);
    } else {
      this.addToDisplay(event.key);
    }
  }
  handleClick(event) {
    const value = event.target.textContent;
    if (value === "=") {
      this.calculate();
    } else if (value === "C") {
      this.clear();
    } else {
      this.addToDisplay(value);
    }
  }
  addToDisplay(value) {
    const lastChar = this.display.value.slice(-1);
    const isOperator = "+-*/.".includes(value);
    if (
      isOperator &&
      (this.display.value === "" || "+-*/.".includes(lastChar))
    ) {
      return;
    }
    this.display.value += value;
  }
  calculate() {
    try {
      const formula = this.display.value;
      if (/\/0(?!\d)/.test(formula)) {
        this.display.value = "Недопустимая операция";
        return;
      }
      const result = Function(`"use strict"; return (${formula})`)();
      this.display.value = result;
    } catch (error) {
      this.display.value = "Error";
    }
  }
  clear() {
    this.display.value = "";
  }
}

const calc = new Calculator();
