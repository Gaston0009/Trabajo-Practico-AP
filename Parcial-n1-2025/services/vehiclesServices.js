import { getAllVehicles, saveAllVehicles} from "../models/vehiclesModels.js";
import {v4 as uuidv4} from "uuid"


export async function getVehicles({category, order}){
    let vehicles = await getAllVehicles();

    if(category){
        vehicles = vehicles.filter(m => m.category === category.toLowerCase())
    }

    if(order === 'asc'){
        vehicles.sort((a,b) => a.model.localeCompare(b.model))
    }else if(order === 'desc'){
        vehicles.sort((a,b) => b.model.localeCompare(a.model))
    }


    return vehicles;
    
}

export async function getVehicle(id) {
    let vehicles = await getAllVehicles();
    return vehicles.find(m => m.id === id);
    
}


export async function createVehicle(data) {
    let vehicles = await getAllVehicles();
    const  newVehicle = {id: uuidv4(), ...data}
    vehicles.push(newVehicle);
    await saveAllVehicles(vehicles);
    return newVehicle;
}


export async function updateVehicle(id, updates){
    let vehicles = await getAllVehicles();
    const index = vehicles.findIndex(m => m.id === id);
    if(index === -1) return null;
    vehicles[index] = {...vehicles[index], ...updates};
    await saveAllVehicles(vehicles);
    return vehicles[index];
}


export async function deleteVehicle(id){
    let vehicles = await getAllVehicles();
    const index = vehicles.findIndex(m => m.id === id);
    if(index === -1) return null;
    vehicles.splice(index, 1)
    await saveAllVehicles(vehicles);
    return true;
}