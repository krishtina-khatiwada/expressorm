
import { mysqlTable, serial,datetime, varchar, boolean, int} from 'drizzle-orm/mysql-core';

export const Task = mysqlTable('Task', {
  id: serial().primaryKey(),
  taskname: varchar({ length: 255 }).notNull(),
  status: varchar({length : 15}).notNull(),
  userId: int("userID").references(()=> otpverification.id),
},

);
export const otpverification= mysqlTable('otpverification', {
  id: serial().primaryKey(),
  email: varchar({length:100}).notNull(),
  otp: varchar ({length:6}),
  expiry: datetime("expiry"),
  verified:boolean("verified")
});