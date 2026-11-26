import * as userModel  from '../models/userModel.js';
import * as riderModel from '../models/riderModel.js';
import validator from 'validator';
import bcrypt    from 'bcryptjs';

const doesUserExist = async (email) => {
    const existing = await userModel.findUserByEmail(email);
    if (existing.length > 0) {
        return { result: true, user: existing[0] };
    }
    return { result: false, user: undefined };
}

// get all
export const fetchAllUsers = async () => {
    const users = await userModel.fetch();
    return users;
}

// register
export const createAccount = async (user) => {
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
        throw new Error('First name, last name, email, and password are required.');
    }

    if (!validator.isEmail(user.email)) {
        throw new Error('Enter a valid email address.');
    }

    if (user.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
    }

    const existing = await doesUserExist(user.email);
    if (existing.result) {
        throw new Error('An account with this email already exists.');
    }

    const salt           = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const id = await userModel.insert({
        first_name: user.first_name.trim(),
        last_name:  user.last_name.trim(),
        email:      user.email,
        password:   hashedPassword,
        role:       'c',
    });

    if (!id || id <= 0) {
        throw new Error('Unable to create account. Please try again later.');
    }

    return 'Account created successfully!';
}

// login
export const login = async (user) => {
    if (!user.email || !user.password) {
        throw new Error('Email and password are required.');
    }

    const existing = await doesUserExist(user.email);
    if (!existing.result) {
        throw new Error('No account found with this email.');
    }

    const isCorrect = await bcrypt.compare(user.password, existing.user.password);
    if (!isCorrect) {
        throw new Error('Incorrect password.');
    }

    const { id, name, email, role } = existing.user;

    // attach riderId for rider account
    let riderId = null;
    if (role === 'r') {
        const rider = await riderModel.findRiderByUserId(id);
        if (!rider.length || rider[0].status === 'Resigned') {
            throw new Error('Your rider account has been deactivated. Please contact the admin.');
        }
        riderId = rider[0].id;
    }

    return { id, name, email, role, riderId };
}
