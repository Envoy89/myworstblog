const winston = require("../config/winston");
const User = require("../models/User");

const initUser = async () => {
    try {
        const login = process.env.DB_USER || "";
        const password = process.env.USER_PASSWORD || "";

        if (!login || !password) return;

        const existUser = await User.findOne({login});
        if (existUser) {
            return;
        }

        const newUser = new User({
            login: login,
        });

        newUser.setPassword(password);
        await newUser.save();
        winston.info("###########")
    } catch(e) {
        winston.error(e);
    }
}

module.exports = initUser;