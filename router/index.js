const Router = require('koa-router');
const config = require('../config');
const {
  checkToken
} = require('../utils/token');

const router = new Router({
  prefix: config.routerBaseApi // 设置接口基础路径
});

const user = require('../controller/user');
const article = require('../controller/article');
const articleCate = require('../controller/articleCate');
const collect = require('../controller/collect');
const like = require('../controller/like');
const comment = require('../controller/comment');
const love = require('../controller/love');
const uploader = require('../controller/upload');
const { upload } = require('../utils/upload');

router.get('/user/login', user.login);
router.get('/user/logout', checkToken, user.logout);
router.get('/user/getUserInfo', checkToken, user.getUserInfo);
router.get('/user/getList', user.getList);
router.post('/user/edit', checkToken, user.edit);
router.post('/user/editRole', checkToken, user.editRole);
router.get('/user/getWebBlogUser', user.getWebBlogUser);

router.get('/article/getList', article.getList);
router.get('/article/getListByClass', article.getListByClass);
router.get('/article/getInfo', article.getInfo);
router.post('/article/add', article.add);
router.post('/article/edit', article.edit);

router.get('/articleCate/getList', articleCate.getList);
router.get('/articleCate/getAllList', articleCate.getAllList);
router.post('/articleCate/add', checkToken, articleCate.add);
router.post('/articleCate/edit', checkToken, articleCate.edit);

router.post('/collect/edit', collect.edit);
router.get('/collect/getInfo', collect.getInfo);

router.post('/like/edit', like.edit);
router.get('/like/getInfo', like.getInfo);

router.get('/comment/getList', comment.getList);
router.get('/comment/getAdminList', comment.getAdminList);
router.post('/comment/add', comment.add);
router.post('/comment/edit', checkToken, comment.edit);
router.get('/comment/getTopComment', comment.getTopComment);

router.post('/love/add', love.add);

router.post('/upload/add', checkToken, upload.single('face'), uploader.add);

module.exports = router;
