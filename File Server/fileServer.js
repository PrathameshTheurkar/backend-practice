const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let directory_name = "/files"; 
let fileNames = [];
app.get('/files',(req,res)=>{
 
  fs.readdir(path.join(__dirname,directory_name), (err, files) => { 
    if (err) 
      res.status(500).json({error : 'Failed to retrieve files'});
    else { 
      files.forEach(file => { 
        fileNames.push(file); 
      }) 
      res.json({fileNames});
    } 
  }) 
})


app.get('/file/:filename' , (req,res)=>{
  let filename = '/files/' + req.params.filename;
  
  fs.readFile(path.join(__dirname,filename), 'utf8', (err, data)=>{
    if(err)res.status(404).send('File not found');
  
    res.send(data);
  });

})

app.get('*' , (req,res)=>{
  res.status(404).send('Route not found');
})

app.listen(3000 , ()=>{
  console.log('Server is running on port : 3000')
})