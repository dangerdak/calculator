window.onload = function() {
  var resultElt = document.getElementById('js-result');

  var calculation = {
    string: [],
    sequence: [],
    lastPress: '',
    subtotal: 0,
  };

  var calculationElt = document.getElementById('js-calculation');

  var buttons = document.getElementsByClassName('btn');
  for (var i = 0; buttons[i]; i++) {
    buttons[i].addEventListener('click', function(e) {
      var total;
      if (e.target.id === 'clearAll') {
        calculation.sequence = [];
        calculation.string = [];
        resultElt.textContent = '';
      }
      else if (e.target.id === 'clearLast') {
        calculation.sequence.pop();
        calculation.string.pop();
      }
      else {
        var previousPress = calculation.sequence[calculation.sequence.length];
        // Add handler function to end of calculation sequence
        if (previousPress && e.target.classList.contains('number') && typeof previousPress() === 'number') {
          calculation.sequence[calculation.sequence.length] = functionOrNumber(parseInt(previousPress().toString() + e.target.textContent, 10));
        }
        else {
          calculation.sequence.push(handlers[e.target.id]);
        }
        // Display calculation sequence
        calculation.string.push(e.target.textContent);
        if (e.target.id === 'equals') {
          total = handlers.equals(calculation.sequence);
          calculation.string.push(total);
          resultElt.textContent = total;
        }
      }
      calculationElt.textContent = calculation.string.join('');
    });
  }
};

var handlers = {
  plus: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand + rightOperand;
    };
  },
  minus: function(leftOperand) {
    return function(rightOperand) {
      return leftOperand - rightOperand;
    };
  },
  times: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand * rightOperand;
    };
  },
  dividedBy: function(leftOperand) {
    return function(rightOperand) {
      return leftOperand / rightOperand;
    };
  },
  equals: function(sequence) {
    var total = sequence.slice(1, -1).reduce(function(acc, fn) {
      return fn(acc);
    }, sequence[0]());
    return total;
  },
  // Return combined digits if acting on number
  zero: functionOrNumber(0), 
  one: functionOrNumber(1),
  two: functionOrNumber(2),
  three: functionOrNumber(3),
  four: functionOrNumber(4),
  five: functionOrNumber(5),
  six: functionOrNumber(6),
  seven: functionOrNumber(7),
  eight: functionOrNumber(8),
  nine: functionOrNumber(9),
};

  function functionOrNumber(n) {
    return function(fn) {
      return fn ? fn(n) : n;
    };
  }
