"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.Task = (0, mysql_core_1.mysqlTable)('Task', {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    taskname: (0, mysql_core_1.varchar)("task", { length: 255 }).notNull(),
    status: (0, mysql_core_1.varchar)("status", { length: 15 }).notNull(),
});
