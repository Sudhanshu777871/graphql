const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require('cors');
const bodyParser = require("body-parser");

// code for making function to graphql
async function callFun() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
      
        type Todo{
            id:ID!
            title:String!
            completed:Boolean
        }

        type Users{
            name:String!,
            username: String!,
            email:String!,
        }
 type Query{
    getTodos:[Todo],
    getUsers:[Users]
 }

        `,
        resolvers: {
            Query: {
                getTodos: async () => (await fetch("https://jsonplaceholder.typicode.com/todos")).json(),
                getUsers: async () => (await fetch("https://jsonplaceholder.typicode.com/users")).json(),
            }
        }
    });

    app.use(cors())
    app.use(bodyParser.json());
    await server.start();

    app.use("/graphql", expressMiddleware(server));
    app.listen(8000, () => {
        console.log("Listen On Port " + 8000)
    });
}

// calling the function
callFun();