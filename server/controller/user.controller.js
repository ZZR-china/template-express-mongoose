import httpStatus from 'http-status';
import APIError from '../helpers/apierror.helper';
import co from 'co';

function getAll(req, res, next) {

}

function create(req, res, next) {

}

function RegisterWithEmail(req, res, next) {
    co(function*() {
        let count = yield staff_mongo.count({ _id: { $ne: ObjectId(staff_id) }, name: username }); //统计有多少条记录的nickname与用户设置的名相同(用户自己除外)
        if (count == 0) {
            let userobj = yield staff_mongo.findOne({ _id: ObjectId(staff_id) }); //根据_id查找用户信息

            userobj = userobj.toObject();

            let pwd = yield encryption.cipherpromise(password, userobj.key); //对用户设置的密码进行加密
            yield staff_mongo.findByIdAndUpdate(staff_id, { name: username, password: pwd }); //更新用户名和密码
        } else {
        	let err = new APIError('Conflict error', httpStatus.CONFLICT);
        	return next(err);
        }
    }).catch(function(e) {
        console.error(e);
        let err = new APIError('BAD_REQUEST error', httpStatus.BAD_REQUEST);
        return next(err);
    })
}

function show(req, res, next) {

}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

export default {
    getAll,
    create,
    RegisterWithEmail,
    show,
    update,
    destroy
}
