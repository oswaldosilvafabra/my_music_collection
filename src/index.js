const routes = require("./bin/routes");
const { app } = require("./bin/routes");

app.listen(3000, () => {
  console.log("Server on port http://localhost:3000");
});
