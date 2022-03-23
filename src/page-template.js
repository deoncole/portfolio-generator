// use back ticks (`) to pass parameters into a function. Use return to create line breaks
const generatePage = (name, github) => {
    return`
    <!DOCTYPE html>
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
    </head>
    <body>
      <h1>${name}</h1>
      <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
  };

//   used to export to page for use on other pages
module.exports = generatePage;