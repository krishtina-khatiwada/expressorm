import { unique } from 'drizzle-orm/gel-core';
import{v4 as uuidv4} from 'uuid';
import { int, mysqlEnum, mysqlTable, serial, varchar, uniqueIndex} from 'drizzle-orm/mysql-core';

export const UserRole= mysqlEnum(["ADMIN","BASIC"])
export const UsersTable = mysqlTable('users_table', {
  id: serial("id").primaryKey(),
  name: varchar("name",{ length: 255 }).notNull(),
  age: int("age").notNull(),
  email: varchar("email",{ length: 255 }).notNull().unique(),
}, table=>[
  {
    emailIndex:uniqueIndex("emailindex").on(table.email),

  }

]
);
export const UserPreferencesTable= mysqlTable ("userPreferences ",{

})
