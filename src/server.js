const Koa = require("koa");
const Router = require("@koa/router");
const graphqlHTTP = require("koa-graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = new Koa();
// app.use(bodyParser.json());

const router = new Router();

router.all(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true,
    rootValue: graphQlResolvers,
  })
);

app.use(router.routes()).use(router.allowedMethods());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ijdva.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then()
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 8081;

app.listen(PORT, (_) =>
  console.log(
    ` 🚀 Server is running at http://localhost:${PORT}
    open graphql: http://localhost:${PORT}/graphql `
  )
);
