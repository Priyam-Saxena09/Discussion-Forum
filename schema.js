const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    dob:
    {
        type:Date,
        required:true
    },
    password:
    {
        type:String,
        required:true,
        unique:true
    },
    images:
    {
        type:Buffer,
        required:true
    }
},{
    timestamps:true
})

const user = mongoose.model("user",schema)
module.exports = user