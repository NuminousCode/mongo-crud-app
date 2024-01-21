import { User } from "../models/userModel.js";

export async function getUsers() {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
}

export async function getUserById(_id) {
  try {
    return await User.findById(_id);
  } catch (error) {
    throw error;
  }
}

export async function createUser(props) {
  try {
    const user = await User.create(props);
    return user;
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteUser(_id) {
  try {
    const result = await User.deleteOne({ _id });
    return result;
  } catch (error) {
    console.log(error);
    throw error; 
  } 
}


export async function updateUser(_id, updateBody) {
  try {
    console.log(updateBody)
    const query = { _id: _id };
    const update = await User.findByIdAndUpdate(query, updateBody);
    return update;
  } catch (error) {
    console.log(error);
  } 
}

