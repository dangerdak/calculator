function Calculation(sequence, initial) {
  // If consecutive elements are numbers, combine them into one
  function mergeNumbers(s) {
    return s.reduce(function(acc, el) {
      var prevValue = acc[acc.length - 1];
      if (typeof el === 'number' && typeof prevValue === 'number') {
        acc[acc.length - 1] = parseInt(prevValue.toString() + el.toString(), 10);
        return acc;
      }
      else {
        acc.push(el);
        return acc;
      }
    }, []);
  }
  this.sequence = mergeNumbers(sequence);
  this.initial = initial || 0;
  this.operator = {
    plus: function(leftOperand, rightOperand) {
      return leftOperand + rightOperand;
    },
    minus: function(leftOperand, rightOperand) {
      return leftOperand - rightOperand;
    },
    div: function(leftOperand, rightOperand) {
      return leftOperand / rightOperand;
    },
    times: function(leftOperand, rightOperand) {
      return leftOperand * rightOperand;
    }
  };
}
Calculation.prototype.stringify = function () {
  return this.sequence.join('').replace(/(\D+)/g, '&$&;');
};
Calculation.prototype.evaluate = function() {
  var that = this;
  return this.sequence.reduce(function(subtotal, el, i, seq) {
    if (typeof el !== 'number') {
      subtotal = that.operator[el](subtotal, seq[i + 1]);
    }
    return subtotal;
  });
};
