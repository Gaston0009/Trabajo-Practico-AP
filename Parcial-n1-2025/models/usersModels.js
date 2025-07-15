import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' 
    },
    imageUrl: {
    type: String,
    }
    }, 
    {
    timestamps: true  // ✅ Correcto: habilita createdAt y updatedAt automáticamente
});


    export default mongoose.model('Users', userSchema)