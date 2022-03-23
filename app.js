// create a constant that access the fileSystem (fs)
const fs = require('fs');
// get the file that hold the generate page function
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// create and argument to takes in the array 
const [name, github] = profileDataArgs;



// the first argument is the file name to be created(output file), the second is the data that's being written, and the third is the callback function to handle errors
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});