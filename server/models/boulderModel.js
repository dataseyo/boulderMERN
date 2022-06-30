import mongoose from 'mongoose'

var Schema = mongoose.Schema

var BoulderSchema = new Schema({
    name: { type: String },
    grade: { type: Number },
    crag: { type: String },
    rating: { type: Number, min: 0, max: 5},
    likedBy: { type: Array }
})

var Boulder = mongoose.model("Boulder", BoulderSchema)
export default Boulder