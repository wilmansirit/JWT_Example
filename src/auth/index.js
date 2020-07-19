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

        const bearedToken = req.headers.authorization;

        try {
            // If there is no token then....
            if (bearedToken === undefined) throw ({ name: 'JsonWebTokenError', message: 'No token' });

            // Decode the token
            const token = bearedToken.split(" ")[1];
            // Verify the token 
            const verifiedToken = jwt.verify(token, option.secret);
            // Return credentials 
            req.token = verifiedToken
            return next();

        } catch (err) {

            res.status(403).send(err);

        }

    }

    isAuth.unless = unless;
    return isAuth;

}