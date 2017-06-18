QUnit.module('Calculation');
QUnit.test('Basic operators', function(assert) {
  assert.strictEqual(new Calculation(['5', 'plus', '62']).evaluate(), '67',
    'Adds two numbers');
  assert.strictEqual(new Calculation(['10', 'minus', '6']).evaluate(), '4',
    'Subtracts two numbers');
  assert.strictEqual(new Calculation(['100', 'div', '20']).evaluate(), '5',
    'Divides two numbers');
  assert.strictEqual(new Calculation(['10', 'times', '6']).evaluate(), '60',
    'Multiplies two numbers');
});

QUnit.test('Multiple operations', function(assert) {
  assert.strictEqual(new Calculation(['5', 'plus', '62', 'minus', '3']).evaluate(), '64',
    'Two operations');
  assert.strictEqual(new Calculation(['10', 'minus', '6', 'times', '2', 'plus', '4']).evaluate(), '12',
    'Three operations');
  assert.strictEqual(new Calculation(['100', 'div', '20', 'div', '5', 'minus', '12', 'plus', '1']).evaluate(), '-10',
    'Four operations');
});

QUnit.test('Negative numbers', function(assert) {
  assert.strictEqual(new Calculation(['minus', '10', 'plus', '6']).evaluate(), '-4',
    'Deals with first number being negative');
  /*
  assert.strictEqual(new Calculation(['10', 'plus', 'minus', '6']).evaluate(), '4',
    'Adds negative numbers');
  assert.strictEqual(new Calculation(['10', 'times', 'minus', '6']).evaluate(), '-60',
    'Multiplies negative numbers');
  assert.strictEqual(new Calculation(['12', 'div', 'minus', '6']).evaluate(), '-2',
    'Divides by negative numbers');
  assert.strictEqual(new Calculation(['10', 'plus', 'minus', 'minus', '6']).evaluate(), '16',
    'Deals with multiple negatives');
*/
});

QUnit.test('Floating point arithmetic', function(assert) {
  assert.strictEqual(new Calculation(['0.1', 'plus', '0.2']).evaluate(), '0.3',
    'Adds 0.1 and 0.2');
  assert.strictEqual(new Calculation(['2.3', 'plus', '2.4']).evaluate(), '4.7',
    'Adds 2.3 and 2.4');
});

QUnit.module('Sequence');
QUnit.test('Adding numbers', function(assert) {
  var seq = new Sequence();
  seq.addItem('5');
  assert.deepEqual(seq.current, ['5'],
    'Adds number to start');
  seq.addItem('6');
  assert.deepEqual(seq.current, ['56'],
    'Two-digit numbers');
  seq.addItem('1');
  assert.deepEqual(seq.current, ['561'],
    'Three-digit numbers');
  assert.deepEqual(new Sequence().addItem('minus').addItem('3').current, ['-3'],
    'Negative starting number');
});
QUnit.test('Can\'t start with an operator', function(assert) {
  assert.deepEqual(new Sequence().addItem('plus').current, [],
    'Plus operator')
  assert.deepEqual(new Sequence().addItem('div').current, [],
    'Division operator')
  assert.deepEqual(new Sequence().addItem('times').current, [],
    'Multiplication operator')
  assert.deepEqual(new Sequence().addItem('minus').addItem('plus').current, ['minus'],
    'Doesn\'t overwrite first operator if it\'s a minus')
});
QUnit.test('Adding operators', function(assert) {
  assert.deepEqual(new Sequence().addItem('4').addItem('plus').addItem('3').current, ['4', 'plus', '3'],
    'Plus operator');
  assert.deepEqual(new Sequence().addItem('4').addItem('plus').addItem('minus').addItem('3').current, ['4', 'minus', '3'],
    'Consecutive operators overwrite each other');
});
QUnit.test('Decimal points', function(assert) {
  assert.deepEqual(new Sequence().addItem('4').addItem('.').addItem('2').current, ['4.2'],
    'Accepts decimal points')
  assert.deepEqual(new Sequence().addItem('.').addItem('5').current, ['.5'],
    'Accepts starting decimal point');
  assert.deepEqual(new Sequence().addItem('4').addItem('.').addItem('2').addItem('.').current, ['4.2'],
    'Doesn\'t allow multiple decimal points in same number')
  assert.deepEqual(new Sequence().addItem('4').addItem('.').addItem('2').addItem('plus').addItem('1').addItem('.').addItem('1').current, ['4.2', 'plus', '1.1'],
    'Allows multiple decimal numbers');
});
