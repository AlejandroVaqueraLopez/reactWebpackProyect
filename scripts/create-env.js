const fs = require("fs");
const api = "API" + process.env.API + "\n";
fs.writeFileSync("./.env",api);
