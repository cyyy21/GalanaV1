import { Schema, model } from "mongoose";

const schema = new Schema({
    userName:String,
    password:String,
    profile:String,

});

const User =  model ('User', schema);

export default User;