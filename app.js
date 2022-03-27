// create a constant that takes in the inquirer npm package
const inquirer = require('inquirer');
// create a constant that access the fileSystem (fs)
// const fs = require('fs');
// get the file that hold the generate page function
const generatePage = require('./src/page-template.js');
// import the file to write to the documents
const { writeFile, copyFile } = require('./utils/generate-site.js');

// the first argument is the file name to be created(output file), the second is the data that's being written, and the third is the callback function to handle errors
// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
//  create a function to hold the prompt
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter your github name!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message:'Provide some information about yourself',
      when: ({confirmAbout}) => {
        if (confirmAbout){
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

// function to get the questions and answers from the user on project questions
const promptProject = portfolioData => {
  console.log(`
    =================
    Add a New Project
    =================
  `);
  if(!portfolioData.projects) {
    portfolioData.projects = []; 
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter the name of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter a description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter a GitHub link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
}


// use a then to check once the promise is resolved
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
  // .then(portfolioData => {
  //   const pageHTML = generatePage(portfolioData);

  //   fs.writeFile('./dist/index.html', pageHTML, err => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log('Page created! Check out index.html in this directory to see it!');
  //   });
  // });