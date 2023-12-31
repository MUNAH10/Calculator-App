const keypad$ = document.querySelector('.keypad');
const operationText$ = document.querySelector('#operation');
const equalButton$ = document.querySelector('.equal');
const resetButton$ = document.querySelector('.reset');
const delButton$ = document.querySelector('.del');
const result$ = document.querySelector('#result');
const resultBox$ = document.querySelector('.result-box');
const switch$ = document.querySelector('.switch');
const body$ = document.querySelector('body');
const operationKeys = ['+', '-', 'x', '/'];
const objOperationKeys = {
  x: 'x',
  '-': '-',
  '+': '+',
  '/': '/',
};
let firstOperation = '';
let secondOperation = '';
operationText$.innerText = 0;
let sign = null;

switch$.addEventListener('click', (e) => {
  const value = e.target.value;
  if (value) {
    changeTheme(value);
  }
});

const changeTheme = (value) => {
  body$.className = '';

  switch (Number(value)) {
    case 1:
      body$.classList.add('theme-1');
      break;
    case 2:
      body$.classList.add('theme-2');
      break;
    default:
      body$.classList.add('theme-3');
      break;
  }
};

const resetAll = (result) => {
  firstOperation = '';
  secondOperation = '';
  sign = null;
  operationText$.innerText = result;
  result$.innerText = '';
};

keypad$.addEventListener('click', ({ target } = e) => {
  const keyClass = target.classList[0];
  if (keyClass !== 'key') return;

  const key = target.innerText;

  if (operationKeys.includes(key)) {
    sign = key;
  }

  if (!sign) {
    if (!isNaN(Number(firstOperation + key))) {
      firstOperation += key;
    }
  } else {
    if (!isNaN(Number(secondOperation + key))) {
      secondOperation += key;
    }
  }

  operationText$.innerText = !sign ? printFormat(firstOperation) : printFormat(secondOperation);
  result$.innerText = `${printFormat(firstOperation)} ${sign || ''} ${printFormat(secondOperation)}`;
});

const printFormat = (text) => text.replace(/\b(0(?!\b))+/g, '');

delButton$.addEventListener('click', () => {
  const numbers = [...firstOperation.split(''), sign, ...secondOperation.split('')];

  if (numbers.length === 0) return;

  if (operationKeys.includes(numbers[numbers.length - 1])) {
    sign = null;
  } else {
    if (!sign) {
      const arr = firstOperation.split('');
      arr.splice(firstOperation.length - 1, 1);
      firstOperation = arr.join('');
    } else {
      const arr = secondOperation.split('');
      arr.splice(secondOperation.length - 1, 1);
      secondOperation = arr.join('');
    }
  }

  numbers.splice(numbers.length - 1, 1);
  operationText$.innerText = !sign ? firstOperation || 0 : secondOperation || 0;
  result$.innerText = `${firstOperation || ''} ${sign || ''} ${secondOperation || ''}`;
});

resetButton$.addEventListener('click', () => {
  resetAll(0);
});

equalButton$.addEventListener('click', () => {
  if (!secondOperation) return;
  let result;
  switch (objOperationKeys[sign]) {
    case '+':
      result = Number(firstOperation) + Number(secondOperation);
      break;
    case '-':
      result = Number(firstOperation) - Number(secondOperation);
      break;
    case 'x':
      result = Number(firstOperation) * Number(secondOperation);
      break;
    default:
    case '/':
      result = Number(firstOperation) / Number(secondOperation);
      break;
  }

  resetAll(result);
});
