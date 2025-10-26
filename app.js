const express = require('express');
const Path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(Path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  fs.readdir(`./khaata`, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send(err);
    }
    res.render('index',{files: files});
  });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/createKhaata', (req, res) => {
  fs.writeFile(`./khaata/${req.body.khaataTitle}.txt`, req.body.khaataContent,(err)=>{
    if(err){
      console.error('Error creating khaata:', err);
      return res.status(500).send(err);
    }
    res.redirect('/');
  } )
});

app.get('/edit/:fileName', (req, res) => {
  fs.readFile(`./khaata/${req.params.fileName}`,'utf-8',(err,data)=>{
    if(err){
      console.error('Error reading file:', err);
      return res.status(500).send(err);
    }
    res.render('edit',{fileName: req.params.fileName, fileContent: data});
  })
});

app.post('/update/:fileName', (req, res) => {
  fs.writeFile(`./khaata/${req.params.fileName}`, req.body.updateContent,(err)=>{
    if(err){
      console.error('Error updating khaata:', err);
      return res.status(500).send(err);
    }
    res.redirect('/');
  } )
});

app.get('/view/:fileName', (req, res) => {
  fs.readFile(`./khaata/${req.params.fileName}`,'utf-8',(err,data)=>{
    if(err){
      console.error('Error reading file:', err);
      return res.status(500).send(err);
    }
    res.render('hisaab',{fileName: req.params.fileName, fileContent: data});
  })
});

app.get('/delete/:fileName', (req, res) => {
  fs.unlink(`./khaata/${req.params.fileName}`,(err)=>{
    if(err){
      console.error('Error deleting khaata:', err);
      return res.status(500).send(err);
    }
    res.redirect('/');
  })
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});