import bcrypt from 'bcrypt';
import UserModel from '../models/user.js';

export const getUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
}

export const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({email, password: hashedPassword});
    await user.save();

    console.log(user);
    return user;
}

export const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        console.log(`User ${email} not registered.`);
        return false;
    }

    return await bcrypt.compare(password, user.password);
}