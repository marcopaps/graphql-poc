const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://graphql-user:graphql-user@cluster0-shard-00-00.wgre2.mongodb.net:27017,cluster0-shard-00-01.wgre2.mongodb.net:27017,cluster0-shard-00-02.wgre2.mongodb.net:27017/graphql-poc?ssl=true&replicaSet=atlas-12d3sk-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
