describe("pow", function() {

  describe.only("raises x to power n", function() {

    for (let x = 1; x <= 10; x++) {

      let expected = 1;

      for (let n = 1; n <= 10; n++) {

        expected *= x;

        makeTest(x, n, expected);

      }

    }

    function makeTest(x, n, expected) {

      it(`${x} in the power ${n} is ${expected}`, function() {
        assert.equal(pow(x, n), expected);
      });
      
    }
    
    

  });

  describe("raises x to power 3", function() {

    function makeTest(x) {

      let expected = x * x * x;

      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  describe("Raises 5 to the power n", function() {
    let x = 5;

    function makeTest(n) {
      let expected = 1;

      for (let i = 1; i <= n; i++) {
        expected *= 5;
      }

      it(`5 in the power ${n} is ${expected}`, function() {
        assert.equal(pow(5, n), expected);
      });
    }

    for (let n = 1; n <= 3; n++) {
      makeTest(n);
    }
    
  });

  it("for negative n the result is NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  it("for non-integer n the result is NaN", function() {
    assert.isNaN(pow(2, 1.2));
  });

  // ... more tests to follow here, both describe and it can be added
});