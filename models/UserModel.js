const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserModel = mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true
        },
        email: {
            type: String, 
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        },
        pic: {
            type: String, 
            default: "https://icon-library.com/images/2018/4051570_share-icon-icone-anonimo-hd-png-download.png"
        }
    },
    {
        timestamps: true
    }
);

UserModel.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserModel.pre('save', async function (next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", UserModel)

module.exports = User