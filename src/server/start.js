const app = require("./index.js")
      
// designates what port the app will listen to for incoming requests
const port = 8081;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}