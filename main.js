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
};

var op = {
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
};
function zero(fn) { return fn ? fn(0) : 0; }
function one(fn) { return fn ? fn(1) : 1; }
function two(fn) { return fn ? fn(2) : 2; }
function three(fn) { return fn ? fn(3) : 3; }
function four(fn) { return fn ? fn(4) : 4; }
function five(fn) { return fn ? fn(5) : 5; }
function six(fn) { return fn ? fn(6) : 6; }
function seven(fn) { return fn ? fn(7) : 7; }
function eight(fn) { return fn ? fn(8) : 8; }
function nine(fn) { return fn ? fn(9) : 9; }
