
import { mysqlTable, serial, varchar} from 'drizzle-orm/mysql-core';

export const Task = mysqlTable('Task', {
  id: serial("id").primaryKey(),
  taskname: varchar("task",{ length: 255 }).notNull(),
  status: varchar("status", {length : 15}).notNull(),
}
);

