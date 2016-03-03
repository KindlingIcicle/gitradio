var fs = require('fs');

module.exports = function() {
  try {
    var env = fs.lstatSync(__dirname + '/../../.env');
    if (env.isFile()){
      console.log('.env found, loading dotenv');
      require('dotenv').load();
    }
  } 
  catch (error) {
    console.log('.env not found');
  }
}
