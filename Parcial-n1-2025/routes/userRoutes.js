import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import usersModels from "../models/usersModels.js";
import { upload } from '../middleware/uploads.js';


dotenv.config()

const usersRouter = express.Router();

const secretKey = process.env.JWT_SECRET;



function verificarRol(rolesPermitidos){
    return function (req, res, next){
        const rolUsuario = req.user?.role;
        if(rolesPermitidos.includes(rolUsuario)){
            next();
        }else{
            res.status(403).json({ message: "No tienes permiso para acceder a esta ruta."});
        }
        
    };
}


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, secretKey, (err, payloud) => {
            if(err){
                return res.status(401).json({ message: "Token invalido o expirado"});
            }
            req.user = payloud;
            next()
        })
    }else{
        res.status(401).json({ message: "No se proporciono token de autorización"})
    }
};





usersRouter.post('/register', upload.single('image'), async (req, res) => {
    const {name, lastname, email, username, password, role } = req.body;

    if(role === 'admin'){
        return res.status(400).json({message: "No se puede crear un usuario con el rol "})
    }

    const userExist = await usersModels.findOne({ email });
        if(userExist) {
            return res.status(400).json({ message: "El email ya exite"});
        }

        const usernameExist = await usersModels.findOne({ username });
        if(usernameExist) {
            return res.status(400).json({ message: "El normbre de usuario ya exisste"});
        }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


    const newUser = new usersModels ( {
        name, 
        lastname,
        email,
        username,
        password: hashedPassword, 
        role: "user",
        imageUrl
    })

    await newUser.save();

    const {password: _, ...userWithoutPassword} = newUser.toObject();

    console.log(newUser)

    res.status(201).json(userWithoutPassword)

})


usersRouter.get('/', authenticateJWT, verificarRol(['admin']), async (req, res) => {
    try {
        console.log(req.user);

        const users = await usersModels.find({}, '-password');

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
});

usersRouter.get('/me', authenticateJWT, async (req, res) => {
    try {
        const user = await usersModels.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});


usersRouter.put('/me', authenticateJWT, upload.single('image'), async (req, res) => {
    try {
        const userId = req.user.id; 
        const updateData = { ...req.body };

        if (updateData.password && updateData.password.trim() !== '') {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        } else {
            delete updateData.password; 
        }

        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await usersModels.findByIdAndUpdate(userId, updateData, { new: true });

        const { password, ...userWithoutPassword } = updatedUser.toObject();
        res.json(userWithoutPassword);
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);
    }
});



usersRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await usersModels.findOne({email});

    if(!user){
        return res.status(404).json({message: "email no encontrado"})
    }

    const validPassword = await  bcrypt.compare(password, user.password)

    if(!validPassword){
        return res.status(401).json({message: "La constrasña es incorrecta"})
    }

    const token = jwt.sign({id: user._id, email: user.email, role: user.role},
        secretKey, {expiresIn: '1h'})

    res.status(200).json({token})
})



// Ruta para eliminar un usuario (solo admin puede)
usersRouter.delete('/:id', authenticateJWT, verificarRol(['admin']), async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await usersModels.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'No se puede eliminar un administrador' });
    }

    await usersModels.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});



export {usersRouter, authenticateJWT, verificarRol};

