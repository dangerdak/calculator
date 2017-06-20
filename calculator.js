window.onload = function() {
  var sequence = new Sequence();
  var buttons = document.getElementsByClassName('btn');
  var resultElt = document.getElementById('js-result');
  var calculationElt = document.getElementById('js-calculation');
  var result;
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener('click', function(e) {
      if (e.target.value === 'clearAll') {
        sequence.clearAll();
        sequence.display(calculationElt);
        resultElt.textContent = '';
      }
      else if (e.target.value === 'clearEntry') {
        sequence.clearEntry();
        sequence.display(calculationElt);
        resultElt.textContent = '';
      }
      else if (e.target.value === '=') {
        result = new Calculation(sequence).evaluate();
        resultElt.textContent = result;
        calculationElt.textContent += '=' + result;

      }
      else {
        sequence.addItem(e.target.value);
        sequence.display(calculationElt);
      }
    });
  });
}

function Calculation(sequence) {
  this.sequence = sequence;

  this.operator = {
    plus: function(leftOperand, rightOperand) {
      return (+leftOperand + +rightOperand).toString();
    },
    minus: function(leftOperand, rightOperand) {
      return !isNaN(+leftOperand) ? (+leftOperand - +rightOperand).toString() : '-' + rightOperand;
    },
    div: function(leftOperand, rightOperand) {
      return (+leftOperand / +rightOperand).toString();
    },
    times: function(leftOperand, rightOperand) {
      return (+leftOperand * +rightOperand).toString();
    }
  };
}


Calculation.prototype.evaluate = function() {
  var precision = Math.pow(10, 10);
  var that = this;
  var result = this.sequence.current.reduce(function(subtotal, el, i, seq) {
    // Checks if el is an operator and isn't at the end of the sequence
    if (that.operator[el] && seq[i + 1]) {
      subtotal = that.operator[el](subtotal, seq[i + 1]);
    }
    return subtotal || el;
  }, 0);

  return '' + Math.round(result * precision) / precision;
}

function Sequence() {
  this.current = [];
}

Sequence.prototype.stringify = function () {
  var symbol = {
    'plus': '+',
    'minus': '-',
    'div': '\u00F7',
    'times': 'x',
    '.': '.',
  };
  return this.current.join('').replace(/\D+/g, function(operator) {
    return symbol[operator];
  });
};

Sequence.prototype.display = function(elt){
  elt.textContent = this.stringify();
}

Sequence.prototype.clearAll = function() {
  this.current = [];
  return this;
}

Sequence.prototype.clearEntry = function() {
  this.current.pop();
  return this;
}

Sequence.prototype.addItem = function(item) {
  function isOperator(item) {
    return item === 'plus' || item === 'minus' ||
        item === 'div' || item === 'times';
  }
  function isNumeric(item) {
    return !isNaN(item);
  }
  var previousItem = this.current[this.current.length - 1];
  var length = this.current.length;
  if (isNumeric(item)) {
    if (isNumeric(previousItem) || previousItem === '.') {
      this.current[length - 1] = previousItem + item;
    }
    else if (previousItem === 'minus' && length === 1) {
      this.current[length - 1] = '-' + item;
    }
    else {
      this.current.push(item);
    }
  }
  else if (isOperator(item)) {
    // Don't allow consecutive operators - replace previous one instead
    // Unless previous item is the first item and is a minus - then  don't
    // replace
    if (isOperator(previousItem) && !(previousItem === 'minus' && length === 1)) {
      this.current[length - 1] = item;
    }
    // Only add operator on to sequence if it's not first, or it's minus
    else if (previousItem  && !isOperator(previousItem) || item === 'minus') {
      this.current.push(item);
    }
  }
  else if (item === '.') {
    // If this is first item
    if (!previousItem) {
      this.current.push(item);
    }
    // If last item is a whole number
    else if (!previousItem || isNumeric(previousItem) && parseInt(previousItem, 10) === +previousItem) {
      this.current[length - 1] = previousItem + item;
    }
  }
  return this;
}
