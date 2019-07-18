const db = require('../models'); //When we end the path with a directory it'll fetch its index file.
const jwt = require('jsonwebtoken'); //Used to mark users as "Logged in"

exports.signup = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch(err) {
        if(err.code === 11000){ //If validation fails
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}