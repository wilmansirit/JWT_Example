'use strict'

/**
 * authentication with JWT middleware.
 * @author Wilman Sirit
 */

const jwt = require('jsonwebtoken');
const unless = require('express-unless');

/**
 * @param {string} secret
 * @return {function(*, *, *): *}
 */

module.exports = (option) => {

    if (!option || !option.secret) throw new Error('secret should be set');

    const isAuth = (req, res, next) => {

        const bearerToken = req.headers.authorization;

        try {
            // If there is no token then....
            if (bearerToken === undefined) throw ({ name: 'JsonWebTokenError', message: 'No token' });

            // Decode the token
            const bearer = bearerToken.split(" ")[1];
            // Verify the token 
            const decoded = jwt.verify(bearer, option.secret);
            // Return credentials 
            req.token = decoded
            return next();

        } catch (err) {

            res.status(403).send(err);

        }

    }

    isAuth.unless = unless;
    return isAuth;

}