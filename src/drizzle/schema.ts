
import { mysqlTable, serial, varchar} from 'drizzle-orm/mysql-core';

export const Task = mysqlTable('Task', {
  id: serial().primaryKey(),
  taskname: varchar({ length: 255 }).notNull(),
  status: varchar({length : 15}).notNull(),
}
);


export const User= mysqlTable('User',{
  id:serial().primaryKey(),
  email: varchar({length:255}).notNull().unique(),
  password:varchar({length:50}).notNull(),
});