import { Router } from "express";
import { authRequiered } from "../middlewares/validateToken.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
const router = Router();

router.get('/tasks', auth, getTasks)
router.get('/tasks/:id', auth, getTask)
router.post('/tasks', auth, validateSchema(createTaskSchema) , createTask)
router.delete('/tasks/:id', auth, deleteTask)
router.put('/tasks/:id', auth, updateTask)

export default router;