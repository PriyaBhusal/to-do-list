//const db = require ('./db');
//const{checkPhone,addUser}=require('./db')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const model = require('../models')

const {getAllTodo} = require('./services')

const homePage =(req,res)=>{
    res.render('home',{title:"Home-Page"})
}

const showTodo =async(req,res)=>{
    try
    {
        var result =await getAllTodo();
        console.log(result, "heeeee;pppp")
        res.status(200).render('todo' ,{title:'Todo-list',data:result})
    }
    catch(err)
    {
        res.status(500).render('error',{title:"Error"})
    }
    // res.render('todo',{title:"Todo-Page"})
}

   
   module.exports={
    homePage:homePage,
    showTodo:showTodo
   }