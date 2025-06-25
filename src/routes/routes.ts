import express from 'express';
import * as Taskcontroller from '../controller/controller';

const router= express.Router();

router.post('/', Taskcontroller.createTask);
router.get('/',Taskcontroller.getTask);
router.put('/:id',Taskcontroller.updatetask);
router.delete(':/id',Taskcontroller.deletetask);

export default router;