import * as userService from '../services/userService.js';

export const getAll = async (req, res) => {
    const users = await userService.fetchAllUsers();
    res.status(200).json({ success: true, users });
}

export const createAccount = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const user = { first_name, last_name, email, password };

    try {
        const result = await userService.createAccount(user);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: `${e.message || "Internal Server Error"}`
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };

    try {
        const result = await userService.login(user);

        req.session.user = {
            id:      result.id,
            name:    result.name,
            email:   result.email,
            role:    result.role,
            riderId: result.riderId,
        };

        res.status(200).json({
            success: true,
            user:    req.session.user,
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: `${e.message || "Internal Server Error"}`
        });
    }
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out.' });
    });
}

export const me = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated.' });
    }
    res.status(200).json(req.session.user);
}

// Additional Context: These are recently edited files. Do not suggest code that has been deleted.