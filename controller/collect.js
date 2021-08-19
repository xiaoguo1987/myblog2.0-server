const mongoose = require('mongoose');
const Collect = require('../model/collect');
const Article = require('../model/article');
const {
  isValidObjectId
} = require('../utils/tool');
const { getUserInfo } = require('../utils/user');

class collectController {
  static async getList(ctx) {
    const {
      currentPage = 1, pageSize = 10, keywords = '', state = 1
    } = ctx.query;
    // 过滤条件
    const options = {
      title: {
        $regex: keywords
      },
      sort: {
        lastModifiedDate: -1
      }, // 按id倒序
      page: Number(currentPage), // 当前页
      limit: Number(pageSize) // 每页数
    };
    // 参数
    const querys = { state };

    if (keywords) {
      if (isValidObjectId(keywords)) {
        querys.$or = [{
          _id: mongoose.Types.ObjectId(keywords)
        }];
      } else {
        querys.$or = [{
          title: {
            $regex: keywords
          },
          description: {
            $regex: keywords
          }
        }];
      }
    }
    const result = await Collect
      .paginate(querys, options);
    const data = {
      pagination: {
        currentPage: result.page, // 当前页
        pageSize: result.limit, // 分页大小
        totalPage: result.pages, // 总页数
        total: result.total // 总条数
      },
      list: result.docs
    };
    ctx.data({ data });
  }

  static async edit(ctx) {
    const { id, value } = ctx.request.body;
    console.log('id', id);
    const {
      userId
    } = await getUserInfo(ctx);
    const article = await Article.findOne({ _id: id });
    let result;
    if (value) {
      const res = await new Collect({
        userId,
        articleId: id
      }).save();
      ++article.collectCount;
      result = await Article.findOneAndUpdate({ _id: id }, {
        collectCount: article.collectCount
      });
    } else {
      const res = await Collect.findOneAndRemove({
        userId,
        articleId: id
      });
      --article.collectCount;
      result = await Article.findOneAndUpdate({ _id: id }, {
        collectCount: article.collectCount
      });
    }
    console.log('result', result, article);
    ctx.data({ data: article });
  }

  static async getInfo(ctx) {
    const { id } = ctx.query;
    // const {
    //   userId
    // } = await getUserInfo(ctx);
    const userId = 'Aimee1608';
    const res = await Collect.findOne({ articleId: id, userId });
    if (res) {
      ctx.data({ data: res });
    } else {
      ctx.data({ data: {} });
    }
  }
}
module.exports = collectController;
