QUnit.module('Calculation');
QUnit.test('Setup', function(assert) {
  var sequence = [5, 'plus', 6, 0];
  var c = new Calculation(sequence);
  assert.deepEqual(new Calculation([5, 6, 0]).sequence, [560],
    'Merges multi-digit numbers on their own');
  assert.deepEqual(c.sequence, [5, 'plus', 60],
    'Merges multi-digit numbers as part of larger sequence');
  assert.strictEqual(c.stringify(), '5&plus;60',
    'Stringifies simple calculation');
});

QUnit.test('Basic operators', function(assert) {
  assert.strictEqual(new Calculation([5, 'plus', 6, 2]).evaluate(), 67,
    'Adds two numbers');
  assert.strictEqual(new Calculation([10, 'minus', 6]).evaluate(), 4,
    'Subtracts two numbers');
  assert.strictEqual(new Calculation([100, 'div', 20]).evaluate(), 5,
    'Divides two numbers');
  assert.strictEqual(new Calculation([10, 'times', 6]).evaluate(), 60,
    'Multiplies two numbers');
});

QUnit.test('Multiple operations', function(assert) {
  assert.strictEqual(new Calculation([5, 'plus', 62, 'minus', 3]).evaluate(), 64,
    'Two operations');
  assert.strictEqual(new Calculation([10, 'minus', 6, 'times', 2, 'plus', 4]).evaluate(), 12,
    'Three operations');
  assert.strictEqual(new Calculation([100, 'div', 20, 'div', 5, 'minus', 12, 'plus', 1]).evaluate(), -10,
    'Four operations');
});

QUnit.test('Negative numbers', function(assert) {
  assert.strictEqual(new Calculation(['minus', 10, 'plus', 6]).evaluate(), -4,
    'Deals with first number being negative');
  assert.strictEqual(new Calculation([10, 'plus', 'minus', 6]).evaluate(), 4,
    'Adds negative numbers');
  assert.strictEqual(new Calculation([10, 'times', 'minus', 6]).evaluate(), -60,
    'Multiplies negative numbers');
  assert.strictEqual(new Calculation([12, 'div', 'minus', 6]).evaluate(), -2,
    'Divides by negative numbers');
  assert.strictEqual(new Calculation([10, 'plus', 'minus', 'minus', 6]).evaluate(), 16,
    'Deals with multiple negatives');
});

QUnit.test('Floating point numbers', function(assert) {
  assert.strictEqual(new Calculation([0.1, 'plus', 0.2]).evaluate(), 0.3,
    'Adds 0.1 and 0.2');
});

QUnit.module('Sequence');
QUnit.test('Adding numbers', function(assert) {
  var seq = new Sequence();
  seq.addItem(5);
  assert.deepEqual(seq.current, [5],
    'Adds number to start');
  seq.addItem(6);
  assert.deepEqual(seq.current, [56],
    'Two-digit numbers');
  seq.addItem(1);
  assert.deepEqual(seq.current, [561],
    'Three-digit numbers');
  assert.deepEqual(new Sequence().addItem('minus').addItem(3).current, [-3],
    'Negative numbers to start');
});
