window.onload = function() {
  var resultElt = document.getElementById('js-result');
  var result = '400';

  var calculation = {
    string: '',
    lastPress: '',
    subtotal: 0,
    run: null,
  };

  var calculationElt = document.getElementById('js-calculation');
  resultElt.textContent  = result;

  var buttons = document.getElementsByClassName('btn');
  for (var i = 0; buttons[i]; i++) {
    buttons[i].addEventListener('click', function(e) {
      calculation.string += e.target.textContent;
      calculationElt.textContent = calculation.string;
      if (calculation.run) {
        calculation.run = handlers[e.target.id].bind(calculation.run);
      }
      else {
        calculation.run = handlers[e.target.id];
      }
      
    });
  }
};

var handlers = {
  plus: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand + rightOperand;
    };
  },
  minus: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand - rightOperand;
    };
  },
  times: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand * rightOperand;
    };
  },
  dividedBy: function(rightOperand) {
    return function(leftOperand) {
      return leftOperand / rightOperand;
    };
  },
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


