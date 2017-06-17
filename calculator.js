function Calculation(sequence) {

  // If consecutive elements are numbers, combine them into one
  function mergeNumbers(rawSequence) {
    return rawSequence.reduce(function(newSequence, el) {
      var prevValue = newSequence[newSequence.length - 1];
      if (typeof el === 'number' && typeof prevValue === 'number') {
        newSequence[newSequence.length - 1] = parseInt(prevValue.toString() + el.toString(), 10);
        return newSequence;
      }
      else {
        newSequence.push(el);
        return newSequence;
      }
    }, []);
  }

  this.sequence = mergeNumbers(sequence);

  this.operator = {
    plus: function(leftOperand, rightOperand) {
      return leftOperand + rightOperand;
    },
    minus: function(leftOperand, rightOperand) {
      return typeof leftOperand === 'number' ? leftOperand - rightOperand : -1 * rightOperand;
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
    return subtotal || el;
  }, 0);
};

  // If consecutive elements are numbers, combine them into one
  function mergeNumbers(rawSequence) {
    return rawSequence.reduce(function(newSequence, el) {
      var prevValue = newSequence[newSequence.length - 1];
      if (typeof el === 'number' && typeof prevValue === 'number') {
        newSequence[newSequence.length - 1] = parseInt(prevValue.toString() + el.toString(), 10);
        return newSequence;
      }
      else {
        newSequence.push(el);
        return newSequence;
      }
    }, []);
  }

function Sequence() {
  this.current = [];
}

Sequence.prototype.addItem = function(item) {
  var previousItem = this.current[this.current.length - 1];
  var length = this.current.length;
  if (typeof item === 'number') {
    if (typeof previousItem === 'number') {
      this.current[length - 1] = parseInt('' + previousItem + item);
    }
    else if (previousItem === 'minus' && length === 1) {
      this.current[length - 1] = -item;
    }
    else {
      this.current.push(item);
    }
  }
  else {
    this.current.push(item);
  }
  return this;
}
