QUnit.test('Setup', function(assert) {
  var sequence = [5, 'plus', 6, 0];
  var multiDigitSequence = [5, 6, 0];
  var c = new Calculation(sequence);
  var cMultiDigit = new Calculation(multiDigitSequence);
  assert.deepEqual(cMultiDigit.sequence, [560],
    'Merges multi-digit numbers on their own');
  assert.deepEqual(c.sequence, [5, 'plus', 60],
    'Merges multi-digit numbers as part of larger sequence');
  assert.strictEqual(c.stringify(), '5&plus;60', 'Stringifies simple calculation');
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

QUnit.test('Negative numbers', function(assert) {
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
  assert.strictEqual(new Calculation([1.2, 'times', 2]).evaluate(), 2.4,
    'Multiplies floating points');
});
