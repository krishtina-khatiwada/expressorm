"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferencesTable = exports.UsersTable = exports.UserRole = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.UserRole = (0, mysql_core_1.mysqlEnum)(["ADMIN", "BASIC"]);
exports.UsersTable = (0, mysql_core_1.mysqlTable)('users_table', {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 255 }).notNull(),
    age: (0, mysql_core_1.int)("age").notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 255 }).notNull().unique(),
}, table => [
    {
        emailIndex: (0, mysql_core_1.uniqueIndex)("emailindex").on(table.email),
    }
]);
exports.UserPreferencesTable = (0, mysql_core_1.mysqlTable)("userPreferences ", {});
