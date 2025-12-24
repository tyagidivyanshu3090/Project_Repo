const fs = require("node:fs");

// Reading the file using sync method which takes 2 parameters: file name and character encoding format
const content = fs.readFileSync("note.txt", "utf-8");
console.log(content);
