const Tarefa = require('../models/tarefa')

async function create(req, res) {
    const tarefa = new Tarefa(req.body)
    const tarefaCriado = await tarefa.save()
    res.status(201).json(tarefaCriado)
}

async function getAll(req, res) {
    res.json(await Tarefa.find().populate(['responsavel', 'projeto']))
}

async function getById(req, res) {
    const tarefa = await Tarefa.findById(req.params.id)
    if (tarefa) {
        res.json(tarefa)
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }
}

async function update(req, res) {
    const tarefaAtulizado = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (tarefaAtulizado) {
        res.json(tarefaAtulizado)
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }

}

async function remove(req, res) {
    const tarefaExcluido = await Tarefa.findByIdAndDelete(req.params.id)
    if (tarefaExcluido) {
        res.json({
            mensagem: "Tarefa excluida com sucesso!",
            tarefaExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}