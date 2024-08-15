import express from 'express'
import bodyParser from 'body-parser';
import _ from 'lodash';
const app = express()
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

const content = []
const name = []


app.get("/",(req,res)=>{    
    res.render("index.ejs",{nVlog: name, cVlog: content})
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/compose",(req,res)=>{
    res.render("compose.ejs")

})
app.post("/submit",(req,res)=>{
    name.push((req.body["vlog-name"]))
    content.push((req.body["vlog-content"]))
    res.render("index.ejs",{nVlog: name, cVlog: content})
})
app.get("/compose/:name",(req,res)=>{
    let nameContent = _.lowerCase(req.params.name)
    for(let i = 0; i < name.length; i++){
        if(nameContent === _.lowerCase(name[i])){
            res.render("post.ejs",{nVlog: name[i], cVlog: content[i]})
        }
    }
})

app.listen(port,()=>{
    console.log(`Sever Listening from port ${port}`)
})