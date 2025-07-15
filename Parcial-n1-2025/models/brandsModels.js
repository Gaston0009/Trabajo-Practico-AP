import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    }
})

export default mongoose.model('Brands', brandSchema)