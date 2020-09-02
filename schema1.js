const mongoose = require("mongoose")

const schema1 = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    desc:
    {
        type:String,
        required:true,
    }

})
const ext = mongoose.model("codelan",schema1)
module.exports = ext