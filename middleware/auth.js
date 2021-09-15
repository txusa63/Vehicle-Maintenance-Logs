const JWT = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        const verified = JWT.verify(token, process.env.JWT_SECRET);
        // console.log('verified', verified)
        
        req.user = verified.user;
        next();
    }

    catch(err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
};

module.exports = auth;