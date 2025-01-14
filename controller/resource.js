// 活动类型控制器
const Moment = require('moment');
const Resource = require('../model/resource');
const { getUserInfo, isAdminUser } = require('../utils/user');
const {
  CustomError
} = require('../utils/customError');
const { baseUploadUrl } = require('../config');

class resourceController {
  // 获取活动类型列表
  static async getList(ctx) {
    const {
      currentPage = 1, pageSize = 10
    } = ctx.query;
    const {
      userId
    } = await getUserInfo(ctx);
    // 过滤条件
    const options = {
      sort: {
        lastModifiedDate: -1
      }, // 按id倒序
      page: Number(currentPage), // 当前页
      limit: Number(pageSize) // 每页数
    };
    // console.log('88888', pageSize, ctx.query);
    const query = { userId };
    // 查询
    const result = await Resource
      .paginate(query, options)
      .catch(() => {
        throw new CustomError(500, '服务器内部错误');
      });
    // console.log('result---', result);
    if (result) {
      ctx.data({
        data: {
          pagination: {
            currentPage: result.page, // 当前页
            pageSize: result.limit, // 分页大小
            totalPage: result.pages, // 总页数
            total: result.total // 总条数
          },
          list: result.docs
        }
      });
    } else {
      ctx.data({ code: 1001 });
    }
  }

  // 编辑活动类型
  static async edit(ctx) {
    const _id = ctx.params.id;
    const {
      name
    } = ctx.request.body;

    if (!_id) {
      throw new CustomError(500, '无效参数');
    }

    const result = await Resource
      .findByIdAndUpdate(_id, {
        name
      }) // new: true ？？？
      .catch(() => {
        throw new CustomError(500, '服务器内部错误');
      });
    console.log('result---ActiveType', result);
    if (result) {
      ctx.data({
        data: result
      });
    } else {
      ctx.data({ code: 1001 });
    }
  }

  // 删除活动类型
  static async delete(ctx) {
    const {
      _id
    } = ctx.request.body;
    if (!_id) {
      throw new CustomError(500, '无效参数');
    }
    await isAdminUser(ctx);
    const result = await Resource
      .findByIdAndRemove(_id)
      .catch(() => {
        throw new CustomError(500, '服务器内部错误');
      });
    if (result) {
      ctx.data({
        data: result
      });
    } else {
      ctx.data({ code: 1001 });
    }
  }

  static async upload(ctx) {
    // const { filename } = ctx.req.file;
    // console.log('ctx---upload', ctx.request.body);
    // console.log('ctx---upload--req', ctx.request.files);
    const { name } = ctx.request.body;
    const { files: { file } } = ctx.request;
    // const result = upload2(ctx);
    const time = Moment().format('YYYY-MM-DD');
    const url = `${baseUploadUrl}${time}/${file.name}`;
    const {
      userId
    } = await getUserInfo(ctx);
    const result = await new Resource({
      userId,
      name,
      md5Name: file.name,
      url
    }).save();

    ctx.data({
      data: result
    });
  }
}

module.exports = resourceController;
