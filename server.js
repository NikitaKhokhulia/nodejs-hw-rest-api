const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  await connectMongo();
  app.listen(3000, () => {});
};

start();
