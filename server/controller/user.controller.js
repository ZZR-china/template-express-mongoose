import AV from 'leanengine';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
const query = new AV.Query('_User');

function getAll(req, res, next) {

}

function create(req, res, next) {

}

function show(req, res, next) {
	const objectId = req.user.objectId;
	query.get(objectId).then(user => {
		res.send(user)
	}, err => {
		err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
		return next(err);
	})
}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

function showLover(req, res, next) {

}

export default { getAll, create, show, update, destroy, showLover }
