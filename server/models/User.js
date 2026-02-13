const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String , required:true}
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password,this.password)
}

const user = mongoose.model("User",UserSchema)