const Koa = require("koa");
const Router = require("@koa/router");
const graphqlHTTP = require("koa-graphql");
const bodyParser = require("koa-bodyparser");
  const expressPlayground = require("graphql-playground-middleware-express").default;
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const app = new Koa();
// app.use(bodyParser());

  const headers = JSON.stringify({
    "apollographql-client-name": "playground",
    "apollographql-client-version": "yada-yada",
  });

const router = new Router();
// app.use(isAuth);
router.all(
  "/graphql",
  isAuth,
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
