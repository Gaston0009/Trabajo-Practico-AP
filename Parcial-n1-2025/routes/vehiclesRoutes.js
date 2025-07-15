import express from "express";

import { createVehicles, getVehicles, getVehiclesById, searchByTag, searchVehicleByModel , updateVehicle, deleteVehicle, filterAndSortByPrice, likeVehicle, dislikeVehicle } from "../controllers/vehiclesControllers.js";
import { authenticateJWT, verificarRol } from "../routes/userRoutes.js"
import { upload } from "../middleware/uploads.js";

const vehiclesRouter = express.Router();

vehiclesRouter.post('/', authenticateJWT, verificarRol(['admin']), upload.single('image'), createVehicles)
vehiclesRouter.post('/:id/like', authenticateJWT, likeVehicle);
vehiclesRouter.post('/:id/dislike', authenticateJWT, dislikeVehicle);
vehiclesRouter.get('/', getVehicles)
vehiclesRouter.get('/search/model', searchVehicleByModel)
vehiclesRouter.get('/search/tags', searchByTag)
vehiclesRouter.get('/filter/price-sort', filterAndSortByPrice)
vehiclesRouter.get('/:id', getVehiclesById)
vehiclesRouter.put('/:id', authenticateJWT, verificarRol(['admin']), upload.single('image'), updateVehicle)
vehiclesRouter.delete('/:id', authenticateJWT, verificarRol(['admin']), deleteVehicle)


export {vehiclesRouter};



