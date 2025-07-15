import 'dotenv/config';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { schema} from './schema/schema.js';
import {root} from './service/service.js';
const app= express();
app.use(cors());

app.use('/graphql',graphqlHTTP({
  schema,
  rootValue:root,
  graphiql:true
}

))
app.listen(4000,()=>{
  console.log('Server running on http://localhost:4000/graphql');
});