import { unique } from 'drizzle-orm/gel-core';
import{v4 as uuidv4} from 'uuid';
import { int, mysqlEnum, mysqlTable, serial, varchar, uniqueIndex} from 'drizzle-orm/mysql-core';

export const Task = mysqlTable('Task', {
  id: serial("id").primaryKey(),
  taskname: varchar("task",{ length: 255 }).notNull(),
  status: varchar("status", {length : 15}).notNull(),
}
);

