//these are just abbreviations for chai references
var expect = chai.expect;
var should = chai.should();

//TEMPLATE

// step 1 - give the test a name
describe('Is Even Tests', function () {

  //step 2 - describe the test
  it('Should always return a boolean', function () {
    /*step 3 - run the function you wanted to access - this should already be added as files inside of test.html as script tags. 
    
    by adding them as script tags, you're making the two JS files talk to each other that's why the next line can run the test
    
    Add the script you're testing inside of test.html, if you haven't already*/
   
    expect(isEven(2)).to.be.a('boolean');
  });

  //describe second test
  it('Calling isEven(76) should return true.', function () {
    expect(isEven(76)).to.be.true;
  });

  //describe third test
  it('Calling isEven(77) should return false.', function () {
    expect(isEven(77)).to.be.false;
  });


});
