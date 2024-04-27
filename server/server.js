const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');

// Importing our authMiddleware from utils
const { authMiddleware } = require("./utils/auth");

// Importing Apollo server and schemas
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

// Setting up GraphQL server using Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  cache: "bounded",
  context: authMiddleware,
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}
db.once('open', () => {
  app.listen(PORT, () => 
  console.log(`🌍 API Server running on port ${PORT}`));
  console.log(`GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  }
);

// Starting the Apollo server
startApolloServer(typeDefs, resolvers);