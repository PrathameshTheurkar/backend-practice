const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let todos = [];

app.get('/todos' , (req,res) =>{
  res.json(todos);
})

app.get('/todos/:id' , (req,res)=>{
  let id = req.params.id;

  for(let i=0;i<todos.length;i++){
    if(todos[i].id == id){
      res.json(todos[i]);
    }
  }

  res.status(404).send();
})


app.post('/todos',(req,res)=>{
  let newTodo  = {
    id : Math.floor(Math.random() * 1000000),
    title : req.body.title,
    description : req.body.description,
  }
  todos.push(newTodo);
  res.status(201).json(newTodo);
})


app.put('/todos/:id' , (req,res) => {
  let id = req.params.id;
  for(let i=0;i<todos.length;i++){
    if(todos[i].id == id){
      todos[i].title = req.body.title;
      todos[i].description = req.body.description;
      res.json(todos[i]);
    }
  }

  res.status(404).send();

})


app.delete('/todos/:id' , (req,res) =>{
  let id = req.params.id;
  let newArray = [];
  let flag = 0;
  for(let i=0;i<todos.length;i++){
    if(todos[i].id != id){
      newArray.push(todos[i]);

    }else flag = 1;
  }

  if(flag){
  todos = newArray
  res.status(200).send();
  }else{
    res.status(404).send();
  }

})

app.use((req,res,next)=>{
  res.status(404).send();
})



app.listen(3000 , ()=>{
  console.log("Server is running on port : ",3000);
})
