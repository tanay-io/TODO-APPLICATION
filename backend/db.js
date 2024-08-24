const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:Neeru%402005@cluster0.mou2u4p.mongodb.net/")
const todoschema= new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const Todo = mongoose.model('todo', todoschema);
module.exports  = Todo;
