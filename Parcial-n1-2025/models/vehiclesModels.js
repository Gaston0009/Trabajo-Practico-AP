import mongoose, {Schema} from "mongoose";



const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fuel: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags : [{type: String,}],

    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brands',
    },
    imageUrl: {
        type: String,
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }],
    dislikes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }],
})

export default mongoose.model('Vehicles', vehicleSchema)