const express = require("express");
const path = require("path");
const fs = require("fs");

const uuid = require('./helpers/uuid')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Because we set up middleware for the public folder,
//Express.js automatically looks for an index.html in the public folder to send when a user visits the root path.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
  console.info(`${req.method} request received to get notes`);
});

// POST request to add a note
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
        // return res.status(500).json('Error in posting review');
      } else {
        // Convert string into JSON object
        const parsedReviews = JSON.parse(data);

        // Add a new note
        parsedReviews.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedReviews, null, 4),
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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
