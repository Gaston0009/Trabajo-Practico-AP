import vehiclesModels from "../models/vehiclesModels.js";

export const likeVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicle = await vehiclesModels.findById(req.params.id);

    if (!vehicle) return res.status(404).json({ message: "Vehículo no encontrado" });

    // Remover dislike si ya lo tenía
    vehicle.dislikes = vehicle.dislikes.filter(id => id.toString() !== userId);

    // Si ya dio like, quitarlo (toggle), sino agregarlo
    if (vehicle.likes.includes(userId)) {
      vehicle.likes = vehicle.likes.filter(id => id.toString() !== userId);
    } else {
      vehicle.likes.push(userId);
    }

    await vehicle.save();
    res.json({ likes: vehicle.likes.length, dislikes: vehicle.dislikes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👎 Dislike a vehicle
export const dislikeVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicle = await vehiclesModels.findById(req.params.id);

    if (!vehicle) return res.status(404).json({ message: "Vehículo no encontrado" });

    // Remover like si ya lo tenía
    vehicle.likes = vehicle.likes.filter(id => id.toString() !== userId);

    // Si ya dio dislike, quitarlo (toggle), sino agregarlo
    if (vehicle.dislikes.includes(userId)) {
      vehicle.dislikes = vehicle.dislikes.filter(id => id.toString() !== userId);
    } else {
      vehicle.dislikes.push(userId);
    }

    await vehicle.save();
    res.json({ likes: vehicle.likes.length, dislikes: vehicle.dislikes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const createVehicles = async (req, res) => {

    try{
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const vehicle = new vehiclesModels({...req.body, imageUrl})
        const newVehicle = await vehicle.save();
        res.json(newVehicle)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const getVehicles = async (req, res) => {
    try{
        const Vehicles = await vehiclesModels.find().populate('brand', 'name country');
        res.json(Vehicles)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

export const getVehiclesById = async (req, res) => {
    try{
        const Vehicle = await vehiclesModels.findById(req.params.id).populate('brand', 'name country');
        res.json(Vehicle)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const searchByTag = async (req, res) => {
    try{
        const tags = req.query.tags.split(',')
        const vehicles = await vehiclesModels.find({tags: {$in: tags}})
        res.json(vehicles)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}




export const updateVehicle = async (req, res) => {
    try {
        const updatedData = { ...req.body };

        if (req.file) {
            updatedData.imageUrl = `/uploads/${req.file.filename}`;
        }

     
        if (updatedData.tags && typeof updatedData.tags === 'string') {
            updatedData.tags = updatedData.tags.split(',').map(tag => tag.trim());
        }

        const vehicle = await vehiclesModels.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.json(vehicle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



export const deleteVehicle = async (req, res) => {
    try{
        const vehicleEliminated = await vehiclesModels.findByIdAndDelete(req.params.id)
        res.json(vehicleEliminated)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const searchVehicleByModel = async (req, res) => {
    try{
        const { model, type } = req.query;

        let regex;

        switch(type){
            case 'exact':
            regex = new RegExp(`^${model}$`, 'i');
            break;
            case 'contains':
            regex = new RegExp(model, 'i');
            break;
            case 'startsWith':
            regex = new RegExp(`^${model}`, 'i');
            break;
            case 'endsWith':
            regex = new RegExp(`${model}$`, 'i');
            break;
            default:
                res.status(400).json({error: "tipo de error no valido"})
        }

        const vehicles = await vehiclesModels.find({model: {$regex: regex}})
        res.json(vehicles)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const filterAndSortByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice, order = 'asc', sortBy = 'price' } = req.query;

        const query = {};

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        let sortOrder = 1;
        if (order === 'desc') {
            sortOrder = -1;
        }

        const vehicles = await vehiclesModels
            .find(query)
            .populate('brand', 'name country')
            .sort({ [sortBy]: sortOrder }); 

        res.json(vehicles);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
