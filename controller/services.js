const model = require('../models')

const getAllTodo=async()=>
{
    const result = await model.todo.findAll({
        include:[
            {
                model:model.user,
                as:"user",
                attributes:{exclude:['password']}
            }
        ],
        raw:true
    })
          return result
    }


    module.exports={
        getAllTodo:getAllTodo
    }