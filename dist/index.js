"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mysql2_1 = require("drizzle-orm/mysql2");
const schema_1 = require("./drizzle/schema");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// You can specify any property from the mysql2 connection options
const db = (0, mysql2_1.drizzle)({ connection: { uri: process.env.DATABASE_URL } });
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestbody } = req.body;
    if (!requestbody) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: 'request body not defined'
        });
    }
    const user = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
    };
    yield db.insert(schema_1.UsersTable).values(user);
    console.log('New user created!');
}));
app.listen(3000);
