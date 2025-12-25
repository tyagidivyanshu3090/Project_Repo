const fs = require("node:fs");

// Reading the file using sync method which takes 2 parameters: file name and character encoding format

// const content = fs.readFileSync("note.txt", "utf-8");
// console.log(content);

// ------------------------------------------------------

// Creating the file using sync method: takes 3 parameters: file name, content, and character encoding format.
// for creating a new file, we use writeFileSync method not createFileSync as it is not a built-in method. 

fs.writeFileSync("createdFile.txt", "Hello World", "utf-8");


//------------------------------------------------------

// Other methods:

// 1. appendFileSync: In this the content will be appended to the file, if the file does not exist then it will create a new file.

// fs.appendFileSync("createdFile.txt", "Hello World", "utf-8");

// ------------------------------------------------------

// 2. unlinkSync: It is used to delete a file.

// fs.unlinkSync("createdFile.txt");

// ------------------------------------------------------

// 3. mkdirSync: It is used to create a directory.

// fs.mkdirSync("createdDirectory");

// ------------------------------------------------------

// 4. rmdirSync: It is used to delete a directory.

// fs.rmdirSync("createdDirectory");

    