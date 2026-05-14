import User from '../models/user.models.js';

//Get all users
export async function getAllUsers() {
    return User.find().exec();
}
//Get user by ID
export async function getUser(id) {
    return User.findById(id).exec();
}
//Update user by ID
export async function updateDataOfUser(id, user) {
    return User.findByIdAndUpdate(id, user, { new: true }).exec();
}
//Create a new user
export async function createUser(user) {
    return User.create(user);
}
//Delete a user by ID
export async function removeUser(id) {
    return User.findByIdAndDelete(id).exec();
}

