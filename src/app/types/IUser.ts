import { Document } from "mongoose";

interface IUser extends Document {
    myId:string;
    userName: string;
    email: string;
    password: string;
}

export default IUser;