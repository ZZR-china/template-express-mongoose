import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import AV from 'leanengine';
import APIError from '../helpers/APIError';

const config = require('../../config/env');
/**
 * Returns jwt token if valid username and phone is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
    const body = req.body;
    const smsCode = body.smsCode;
    const mobilePhoneNumber = body.mobilePhoneNumber;
    AV.User.signUpOrlogInWithMobilePhone(mobilePhoneNumber, smsCode)
        .then(function(user) {
            const objectId = user.id;
            const mobilePhoneNumber = user.mobilePhoneNumber;
            const token = jwt.sign({
                objectId: objectId
            }, config.jwtSecret);
            return res.send({user, token});
        }, function(err) {
            err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
            return next(err);
        });
}

function get(req, res) {
    res.json(req.user);
}
/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}

export default { create, getRandomNumber, get };
