const fs = require("node:fs");

// Reading the file using sync method which takes 2 parameters: file name and character encoding format

// const content = fs.readFileSync("note.txt", "utf-8");
// console.log(content);

// ------------------------------------------------------

// Creating the file using sync method: takes 3 parameters: file name, content, and character encoding format.
// for creating a new file, we use writeFileSync method not createFileSync as it is not a built-in method. 

fs.writeFileSync("createdFile.txt", "Hello World", "utf-8");
