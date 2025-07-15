import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },

    filename: (req, file, cb) => {
        const unique = Date.now() + "-" ;
        cb(null, unique + path.extname(file.originalname))
    }
})


const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")) cb(null, true)
        else cb(new Error("only images are allowed"), false)
}

export const upload = multer({ storage, fileFilter})