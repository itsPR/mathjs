"use strict"

const assert = require('assert');
const math = require('../../../index');
const stepper = require('../../../lib/expression/step-solver/stepper.js');
const step = stepper.step;
const simplify = stepper.simplify;

function testStep(exp) {
	return step(new stepper.RootNode(exp)).exp
}

// to create nodes, for testing
function opNode(op, args) {
	switch (op) {
		case '+':
			return new math.expression.node.OperatorNode('+', 'add', args);
		case '*':
			return new math.expression.node.OperatorNode('*', 'multiply', args);
		default:
			throw Error("Unsupported node type: " + exp.type);
	}
}

function constNode(val) {
	return new math.expression.node.ConstantNode(val);
}

function parenNode(content) {
	return new math.expression.node.ParenthesisNode(content);
}

describe('arithmetic stepping', function () {
	it('2+2 -> 4', function () {
	  assert.deepEqual(math.parse('4'), testStep(math.parse('2+2')));
	});
	it('(2+2) -> 4', function () {
	  assert.deepEqual(math.parse('4'), testStep(math.parse('(2+2)')));
	});
	it('(2+2)*5 -> 4*5', function () {
	  assert.deepEqual(math.parse('4*5'), testStep(math.parse('(2+2)*5')));
	});
	it('5*(2+2) -> 5*4', function () {
	  assert.deepEqual(math.parse('5*4'), testStep(math.parse('5*(2+2)')));
	});
	it('(((5))) -> 5', function () {
	  assert.deepEqual(math.parse('5'), testStep(math.parse('(((5)))')));
	});
	// TODO: remove unecessary parens before starting to step so this is 4
	it('(2+(2)) -> 2+2', function () {
	  assert.deepEqual(math.parse('2+2'), testStep(math.parse('(2+(2))')));
	});
	it('(2+(2)+7) -> 2+2+7', function () {
	  assert.deepEqual(math.parse('4+7'), testStep(math.parse('(2+2+7)')));
	});
});

describe('arithmetic simplify', function () {
	it('2+2 = 4', function () {
	  assert.deepEqual(math.parse('4'), simplify(math.parse('2+2')));
	});
	it('(2+2)*5 = 20', function () {
	  assert.deepEqual(math.parse('20'), simplify(math.parse('(2+2)*5')));
	});
	it('5*(2+2)*10 = 200', function () {
	  assert.deepEqual(math.parse('200'), simplify(math.parse('5*(2+2)*10')));
	});
	it('(2+(2)+7) = 11', function () {
	  assert.deepEqual(math.parse('11'), simplify(math.parse('(2+(2)+7)')));
	});
	it('(8-2) * 2^2 * (1+1) / (4 / 2) / 5 = 4.8', function () {
	  assert.deepEqual(math.parse('4.8'), simplify(math.parse('(8-2) * 2^2 * (1+1) / (4 /2) / 5')));
	});
});

describe('flatten ops', function () {
	let flatten = stepper.flattenOps;

	it('2+2', function () {
	  assert.deepEqual(math.parse('2+2'), flatten(math.parse('2+2')));
	});
	it('2+2+7', function () {
	  assert.deepEqual(opNode('+', [constNode(2), constNode(2), constNode(7)]),
	  	flatten(math.parse('2+2+7')));
	});
	it('9*8*6+3+4', function () {
	  assert.deepEqual(opNode('+', [
		  	opNode('*', [constNode(9), constNode(8), constNode(6)]),
				constNode(3),
				constNode(4)]),
	  	flatten(math.parse('9*8*6+3+4')));
	});
  it('5*(2+3+2)*10', function () {
	  assert.deepEqual(opNode('*', [
	  		constNode(5),
	  		parenNode(opNode('+', [constNode(2), constNode(3),constNode(2)])),
	  		constNode(10)]),
	  	flatten(math.parse('5*(2+3+2)*10')));
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
