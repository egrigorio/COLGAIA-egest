const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    if(req.cookies.authToken) {
        const user = JWT.verify(req.cookies.authToken, jwtSecret);
        if(user) {
            return next();
        } else {
            return res.status(401).send('não autorizadoas');
        }
    } else {
        return res.status(401).send('não autorizadobolas');
    }
}

module.exports = auth;