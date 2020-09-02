const mongoose = require("mongoose")

const schema2 = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    title:
    {
        type:String,
        required:true,
    },
    comment:
    {
        type:String,
        required:true
    },
    lang:
    {
        type:String,
        required:true
    },
    image:
    {
        type:Buffer,
        required:true
    }

},{
    timestamps:true
})

const comment = mongoose.model("comments",schema2)
module.exports = comment