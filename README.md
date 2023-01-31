# Note-Taker

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:|    
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)      |
| Node.js  | [https://nodejs.org/docs/latest-v16.x/api/synopsis.html](https://nodejs.org/docs/latest-v16.x/api/synopsis.html)


## Description

Welcome to the Note Taker app. This application allows you to write and save notes so that you can organize your thoughts and keep track of tasks you need to complete.

[Link to the deployed app]()

## Table of Contents

- [Code Example](#code-example)
- [Installation](#installation)
- [Usage](#usage)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [Credits](#credits)
- [License](#license)

## Code Example

This is a POST request to add a note to the webpage
```js
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error in posting review");
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});
```
## Installation

- Visit the Node.js website to download and install Node.js to your computer
- Clone the repository to your local directory
- Create a .gitignore file that includes "node_modules/"  and  " .DS_Store/" before installing any npm dependencies.
- Run `npm init` to include a `package.json` to your repo with required dependencies.
- Run `npm install` to install dependencies.
- Import `express`.
- Import `fs`.
- Import `path`. 

## Usage

- Navigate to the root directory of your project in the command-line
- Run the command `npm install` to install and confirm all dependencies are stored in package.json file.
- Run the command `npm start` to start the application on a local host.
- Hit the Get started button and you'll be presented with a text input field for you note title and text.
- After typing the title and text of your note, you will see a 'save' icon available on the top left side of the page.
- Hit the save icon and your note will be saved and you will be able to see it in the left-hand column of the page.
- Hit the addition '+' sign to add a new note.
- You can display your previous saved notes from the left-hand column to the right-hand column by clicking on it.
- To delete your saved note, click on the trash icon right on the same line as the note you wish to delete.

## Learning Points

- Configure an Express.js app to handle POST requests.
- Implement Express.js middleware to be able to read data from a POST request.
- Implement client-side POST requests to submit form data to a server.
- Read and write to a JSON text file.
- Implement separation of concerns for routing.
- Write a custom middleware function for Express.js.
- Deploy a Node.js app to Heroku.
- Navigate Git History inside a large open source application.

## Author Info 

```md
### Gladys Ange Isingizwe 


* [Email](gladyisingizwe@gmail.com)
* [LindeIn](www.linkedin.com/in/gladys-isingizwe)
* [Github]()https://github.com/Isglad
```

## Credits

Collabortors on this project are instructional staff, TAs and winter cohort 2022 of the University of Calfornia Berkeley Coding Bootcamp.

## License

Please refer to the LICENSE in the repo.