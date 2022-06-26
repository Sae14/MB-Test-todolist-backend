const { Todo } = require("../models/index");

exports.getAllTodos = (req, res, next) => {
  Todo.findAll()
    .then((todos) => res.status(200).json(todos))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOneTodo = (req, res, next) => {
  Todo.findOne({
    where: { id: req.params.id },
  })
    .then((todo) => res.status(200).json(todo))
    .catch((error) => res.status(404).json({ error }));
};

exports.createTodo = (req, res, next) => {
  const todoObject = {
    title: req.body.title,
    description: req.body.description,
  };
  Todo.create(todoObject)
    .then(() => {
      res.status(201).json({ message: "New todo saved !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyTodo = (req, res, next) => {
  Todo.findOne({
    where: { id: req.params.id },
  })
    .then(() => {
      Todo.update(
        {
          state: req.body.state,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(() => {
          if (req.body.state == true) {
            res.status(200).json({ message: "Todo accomplished" });
          } else {
            res.status(200).json({ message: "Todo unaccomplished" });
          }
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteTodo = (req, res, next) => {
  Todo.findOne({ where: { id: req.params.id } })
    .then(() => {
      Todo.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Todo deleted" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
