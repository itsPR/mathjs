var assert = require('assert');
var math = require('../../../index');
var step = require('../../../lib/expression/step-solver/stepper.js');

describe('arithmetic stepping', function () {
	it('2+2 -> 4', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('(2+2) -> 4', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('(2+2)*5 -> 4*5', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('5*(2+2) -> 5*4', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('(((5))) -> 5', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('(2+(2)) -> 4', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
	it('(2+(2)+7) -> 4+7', function () {
	  assert.deepEqual(math.parse('4'), step(math.parse('2+2')));
	});
});









/*
describe('Checks', function() {

	Checks = stepper.Checks;

  	describe('combining exponents', function() {
    	it('says x is a symbol', function() {
      		assert.equal(Checks.isSymbol(math.parse('x')), true);
    	});
		it('says x^2 is a symbol', function() {
	  		assert.equal(Checks.isSymbol(math.parse('x^2')), true);
		});
		it('says 2x^2 is not a symbol', function() {
	  		assert.equal(Checks.isSymbol(math.parse('2x^2')), false);
		});
		it('says 2^2 is not a symbol', function() {
	  		assert.equal(Checks.isSymbol(math.parse('2x^2')), false);
		});
	});    
});


    // PREREQ FUNCTIONS
    // x*x -> x^(1+1)
    // x*x^3 -> x^(1+3)
    // x^2*x -> x^(2+1)
    // x^2 * x^5 -> x^(2+5)
    // 2x*x -> 2x^(1+1) 
    // 2x*4x -> 2*4*x^(1+1)
    // ---- mrahhh math.parse('x * 2x') gives x*2 on the left..
    // ---- probably still fine


    // case 1 has one in parens and one not, only addition
    // 2x * (3x + 4)
    // (2x + 4) * 3x
    // case 2 with subtraction
    // (2x - 4) * 3x
    // case 3 unary minus
    // -2x * (3x - 4)
    // (2x + 3)*(4x+7)
    // 2x^2 * (3x + 4)


*/