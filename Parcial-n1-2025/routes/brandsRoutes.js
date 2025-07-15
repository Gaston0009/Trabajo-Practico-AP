import express from "express"

import { createBrands, getBrands, getBrandsById, updateBrand, deleteBrand, searchBrandByName  } from "../controllers/brandsControllers.js"
import { authenticateJWT, verificarRol } from "../routes/userRoutes.js"
import { upload } from "../middleware/uploads.js";

const brandsRouter = express.Router();

brandsRouter.post('/', authenticateJWT, verificarRol(['admin']), upload.single('image'), createBrands)
brandsRouter.get('/', authenticateJWT, getBrands)
brandsRouter.get('/search/name', searchBrandByName)
brandsRouter.get('/:id', getBrandsById)
brandsRouter.put('/:id', authenticateJWT, verificarRol(['admin']), upload.single('image'), updateBrand)
brandsRouter.delete('/:id', authenticateJWT, verificarRol(['admin']), deleteBrand)


export {brandsRouter};