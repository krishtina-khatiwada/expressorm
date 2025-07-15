 import { buildSchema } from "graphql";
 export const schema = buildSchema(`
 type Task{
  id:ID!
  title: String!
  taskstatus:String!
  
 }
 type Query{
   tasks:[Task]
   task(id:ID!): Task
 }
type Mutation{
   createTask(email:String!, title:String!, taskstatus:String!):Task
   updateTask(email:String!, id:ID!, title:String!, taskstatus: String!):Task
   deleteTask(email:String!, id:ID!):Boolean

   requestotp(email:String!):
   verifyotp(email:String!, otp:String! )
}

 `
 );