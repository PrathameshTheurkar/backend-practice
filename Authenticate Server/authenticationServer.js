const express = require("express")
const PORT = 3000;
const app = express();

app.use(express.json());

let users = [];

app.post('/signup' , (req,res)=>{
  let user = req.body;

  for(let i=0;i<users.length;i++){
     if(users[i].email == user.email){
      res.sendStatus(400);
     }
  }
  users.push(user);
  res.status(201).send("Signup successful");
})

app.post("/login" , (req,res)=>{
  let user = req.body;
  for(let i=0;i<users.length;i++){
    if(users[i].email == user.email && users[i].password == user.password ){
      res.json({
        firstName : users[i].firstName,
        lastName : users[i].lastName,
        email : users[i].email, 
      })
    }
  }
  
  res.sendStatus(401);
})

app.get("/data" , (req,res)=>{
  let email = req.headers.email;
  let password =req.headers.password;
  for(let i=0;i<users.length;i++){
    if(users[i].email == email && users[i].password == password){
      res.json({users});
    }
  }
  
  res.sendStatus(401);
})



app.listen(PORT , ()=>{
  console.log('Server is running on port : ',PORT)
})