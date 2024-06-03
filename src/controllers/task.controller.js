import Task from '../models/task.models.js'

// Listar una tarea en especifico
export const getTask = async (req, res ) => {
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

// Listar todas las tareas
export const getTasks = async (req, res ) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)
}


// Crear una tarea
export const createTask = async (req, res ) => {
    const {title, description, date} = req.body

    const newTask = new Task({
        title,
        description, 
        date,
        user: req.user.id
    })

    const savedTask =  await newTask.save();
    res.json(savedTask)
}

// Eliminar una tarea
export const deleteTask = async (req, res ) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

// Actualizar una tarea
export const updateTask = async (req, res ) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}