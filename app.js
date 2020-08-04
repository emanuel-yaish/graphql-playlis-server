const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

//allow corss-origin requests
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_KEY}@cluster0-9zuj7.mongodb.net/graphQLDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .once("open", () => {
    console.log("connected to database");
  })
  .on("error", (error) => {
    console.log("error");
  });

app.use(
  "/graphql",
  graphqlHTTP({
    //  schema : schema
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`now listening for request on ${PORT}`);
});
