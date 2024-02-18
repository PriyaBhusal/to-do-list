var express = require('express')
const router = express.Router()
const {homePage,userRegister,userLogin} = require("./controller")

router.get("/",homePage)
.post("/register",userRegister)
.post("/login",userLogin)
module.exports = router