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

Calculation.prototype.stringify = function () {
  return this.sequence.join('').replace(/(\D+)/g, '&$&;');
};

Calculation.prototype.evaluate = function() {
  var that = this;
  var result = this.sequence.reduce(function(subtotal, el, i, seq) {
    // Checks if el is an operator
    if (that.operator[el]) {
      subtotal = that.operator[el](subtotal, seq[i + 1]);
    }
    return subtotal || el;
  }, 0);

  return '' + Math.round(result * 10000000000) / 10000000000;
}

function Sequence() {
  this.current = [];
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
