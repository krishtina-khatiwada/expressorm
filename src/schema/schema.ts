 import { buildSchema } from "graphql";
 export const schema = buildSchema(`
 type Task{
  id:ID!,
  title: String!,
  taskstatus:String!
  
 }
 type Query{
   tasks:[Task],
   task(id:ID!): Task
 }
type Mutation{
   createTask(title:String!, taskstatus:String!):Task
   updateTask(id:ID!, title:String!, taskstatus: String!):Task
   deleteTask(id:ID!):Boolean
}

 `
 );