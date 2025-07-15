import brandsModels from "../models/brandsModels.js";

export const createBrands = async (req, res) => {
    try{
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const brand = new brandsModels({...req.body, imageUrl})
        const newBrand = await brand.save();
        res.json(newBrand)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const getBrands = async (req, res) => {
    try{
        const brands = await brandsModels.find();
        res.json(brands)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

export const getBrandsById = async (req, res) => {
    try{
        const brands = await brandsModels.findById(req.params.id);
        res.json(brands)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


export const updateBrand = async (req, res) => {

    try {
            const updatedData = { ...req.body };
    
            if (req.file) {
                updatedData.imageUrl = `/uploads/${req.file.filename}`;
            }
    
            const brand = await brandsModels.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
            res.json(brand);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
}



export const deleteBrand = async (req, res) => {
    try{
        const brandsEliminated = await brandsModels.findByIdAndDelete(req.params.id);
        res.json(brandsEliminated)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}



export const searchBrandByName = async (req, res) => {
    try{
        const { name, type } = req.query;

        let regex;

        switch(type){
            case 'exact':
            regex = new RegExp(`^${name}$`, 'i');
            break;
            case 'contains':
            regex = new RegExp(name, 'i');
            break;
            case 'startsWith':
            regex = new RegExp(`^${name}`, 'i');
            break;
            case 'endsWith':
            regex = new RegExp(`${name}$`, 'i');
            break;
            default:
                return res.status(400).json({error: "tipo de error no valido"})
        }

        const brands = await brandsModels.find({name: {$regex: regex}})
        res.json(brands)

    }catch(err){
        res.status(400).json({error: err.message})
    }
}