const express=require('express')
const {createtodo,updatetodo}= require ("./zod")
const { todo }= require ("./db")
const app=express();
app.use(express.json())

app.post("/todo",async function(req,res){
    const Createpayload=req.body
    const parsepayload=createtodo.safeparse(Createpayload)
    if( !parsepayload.success){
        res.status(400).send(parsepayload.error)
    }
    return;})
    await todo.create({  
       title : Createpayload.title,
       description : Createpayload.description,
       completed:false
      })

app.get("/todos",function(req,res){ 
const todo=todo.find({})
res.json({
    todo
})
})
app.put("/completed",async function(req,res){
const updatepayload =req.body
const parsepayload=updatetodo.safeparse(updatepayload)
if( !parsepayload.success){
    res.status(400).send(parsepayload.error)
    return;
}await todo.update({_id : req.body.id},{
    completed : true
})
res.json({
    "message": "Todo updated successfully",
})
})

