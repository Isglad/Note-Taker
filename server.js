const express = require("express");
const path = require("path");
const fs = require("fs");

const uuid = require("./helpers/uuid");

const PORT = process.env.PORT || 3001;

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

// DELETE request to delete a note
app.delete("/api/notes/:id", (req, res) => {
  // Destructuring req.params.id to use 'id' as a variable
  const { id } = req.params;
  console.log(id);

  // log that a DELETE request was received
  console.info(
    `${req.method} request received to delete a note with id: ${id}`
  );

  // Read the current notes from the db.json file
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.err(err);
      return res.status(500).json("Error in deleting note");
    } else {
      // Convert the string data into JSON object
      //   const parsedNotes = JSON.parse(data);
      let notes = JSON.parse(data);
      console.log(notes);

      //   Filter out the note with the specified id
      notes = notes.filter((data) => data.id != id);
      console.log(notes);

      // Write updated notes back to the file
      fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info("Successfully deleted note!")
      );
      // Return success status to the client
      res.status(200).json("Note successfully deleted");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
