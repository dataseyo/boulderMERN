import mongoose from 'mongoose'

var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    likedBoulder: { type: Array }
})

var User = mongoose.model("User", UserSchema)
export default User