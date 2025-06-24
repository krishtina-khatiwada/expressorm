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
const drizzle_orm_1 = require("drizzle-orm");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// You can specify any property from the mysql2 connection options
const db = (0, mysql2_1.drizzle)({ connection: { uri: process.env.DATABASE_URL } });
/* interface UserRequestBody{
    taskname:string;
    status:string;
}; */
app.post('/task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskname, status } = req.body;
    if (!taskname || !status) {
        res.status(400).json({
            status: 400,
            success: false,
            error: 'request body not defined'
        });
    }
    else {
        yield db.insert(schema_1.Task).values(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: "new task created"
        });
        console.log('New task created!');
    }
}));
app.get('/task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db.select().from(schema_1.Task);
        console.log("the user list is", users);
        if (users.length === 0) {
            res.status(200).json([]);
        }
        else {
            res.status(200).json({
                success: true,
                message: "successfull",
                data: users
            });
        }
    }
    catch (error) {
        console.error('error fetching user', error);
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
}));
app.put('/task/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestbody = req.body;
    const id = parseInt(req.params.id, 10);
    try {
        if (isNaN(id)) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "id not found"
            });
        }
        yield db
            .update(schema_1.Task)
            .set({
            taskname: requestbody.taskname,
            status: requestbody.status
        })
            .where((0, drizzle_orm_1.eq)(schema_1.Task.id, id));
        console.log('task info updated!');
        res.status(200).json({
            status: 200,
            success: true,
            message: "update successful"
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error
        });
    }
}));
app.delete('/task/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "id not found"
            });
        }
        const result = yield db.select().from(schema_1.Task);
        const del = yield db.delete(schema_1.Task).where((0, drizzle_orm_1.eq)(schema_1.Task.id, id));
        if (result.length == 0) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "id not found"
            });
        }
        console.log('User deleted!');
        res.status(200).json({
            status: 200,
            success: true,
            message: "deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error
        });
    }
}));
app.listen(3000);
