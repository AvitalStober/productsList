import { Document } from "mongoose";

interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
}

export default IUser;