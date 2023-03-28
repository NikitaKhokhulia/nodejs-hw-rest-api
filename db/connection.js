const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose
    .connect(
      "mongodb+srv://testuser:terfac@cluster0.grthfxa.mongodb.net/db-contacts?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
};

module.exports = {
  connectMongo,
};
