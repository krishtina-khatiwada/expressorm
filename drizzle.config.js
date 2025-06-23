"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: './drizzle/migrations',
    schema: './src/drizzle/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
