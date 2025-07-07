import express from 'express';
import { registeruser, loginuser } from '../auth/auth.controller';
import { authmiddleware} from '../auth/auth.middleware';
import { getTask,createTask } from '../controller/controller';

const router= express.Router();

router.post('/auth/register', registeruser);
router.post('/auth/login', loginuser);

router.get('/task', authmiddleware, getTask);
router.post('/task', authmiddleware, createTask);


export default router;