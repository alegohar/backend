const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

connectDatabase().catch((err) => console.log(err));

async function connectDatabase() {
  await mongoose.connect("mongodb+srv://aligohar:LUkdSqHFqxw3JbTO@cluster0.yll3xil.mongodb.net/Todolist?retryWrites=true&w=majority").then(() => {
    console.log("database is connected");
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const app = express();
app.use(cors());
app.use(express.json()); // allows to read the body req
// if we don't writ express.json(); req.body : {},  will be undefined
const router = express.Router();
app.use(router);

const TodoSchema = new mongoose.Schema({
  text: String,
  status: Boolean,
});

const TodoModel = mongoose.model("Todos", TodoSchema);

router.get("/todo", async (req, res) => {
  const todo = await TodoModel.find({}, { __v: 0 }); // fetches all the records
  res.json(todo);
});
router.patch("/todo", async (req, res) => {
  const { id, status } = req.body;
  const foundTodo = await TodoModel.findById(id); // gets the todo item by the id
  if (foundTodo) {
    foundTodo.status = status;
    foundTodo.save();
    res.json(foundTodo);
  } else
    res.status(404).json({
      message: "Not Found",
    });
  // const todo = await TodoModel.find({}, { __v: 0 }); // fetches all the records
});

router.post("/todo", async (req, res) => {
  console.log(req.body);
  const { text, status } = req.body;
  const todoCreated = new TodoModel({ status: status, text: text });
  todoCreated.save();
  res.json(todoCreated);
});

router.all("/", (req, res) => {
  res.json({
    message: "we are live 🚀🎄🎄🚀",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("server started 🚀🎄🎄🚀");
});
