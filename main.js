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
      }
      else if (e.target.id === 'clearLast') {
        calculation.sequence.pop();
        calculation.string.pop();
      }
      else {
        // Add handler function to end of calculation sequence
        calculation.sequence.push(handlers[e.target.id]);
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
  zero: function(fn) { return fn ? fn(0) : 0; },
  one: function(fn) { return fn ? fn(1) : 1; },
  two: function(fn) { return fn ? fn(2) : 2; },
  three: function(fn) { return fn ? fn(3) : 3; },
  four: function(fn) { return fn ? fn(4) : 4; },
  five: function(fn) { return fn ? fn(5) : 5; },
  six: function(fn) { return fn ? fn(6) : 6; },
  seven: function(fn) { return fn ? fn(7) : 7; },
  eight: function(fn) { return fn ? fn(8) : 8; },
  nine: function(fn) { return fn ? fn(9) : 9; }
};


