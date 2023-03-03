const showNum = document.getElementById("showNum");
let currentOperand = "";
let prevOperand = "";
let operator = null;

function appendNum(num) {
  if (num === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + num.toString();
}

function chooseOperator(op) {
  if (currentOperand === "") return;
  if (prevOperand !== "") {
    calculate();
  }
  operator = op;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
  let result;
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result;
  operator = null;
  prevOperand = "";
}

function clear() {
  currentOperand = "";
  prevOperand = "";
  operator = null;
}

function updateDisplay() {
  showNum.value = currentOperand;
}

const numButtons = document.querySelectorAll(
  ".column button:not(.extra-width)"
);
const opButtons = document.querySelectorAll(
  ".column button:not(.extra-width):not(:nth-child(-n+4))"
);
const clearButton = document.getElementById("ok");
const equalsButton = document.querySelector(".extra-width");

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNum(button.innerText);
    updateDisplay();
  });
});

opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});
