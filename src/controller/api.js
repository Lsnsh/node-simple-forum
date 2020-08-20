const mysql = require('../mysql');

module.exports = {
  api: {
    async signup(ctx) {
      const body = ctx.request.body;
      await mysql.createUser([body.username, body.password]);
      ctx.body = {
        result: true,
        status: {
          code: 200,
          message: '注册成功'
        }
      };
    },
    async signin(ctx) {
      const body = ctx.request.body;
      const userInfoList = await mysql.userLogin([body.username, body.password]);
      const isLogined = userInfoList && userInfoList.length > 0;
      if (isLogined) {
        ctx.session = {
          name: userInfoList[0].username,
          id: userInfoList[0].id
        }
      }
      ctx.body = {
        result: isLogined,
        status: {
          code: 200,
          message: isLogined ? '登陆成功' : '登陆失败'
        }
      }
    },
    async createPost(ctx) {
      const body = ctx.request.body;
      const res = await mysql.createPost([body.title, ctx.session.name, ctx.session.id, body.content]);
      ctx.body = {
        res: res,
        result: true,
        status: {
          code: 200,
          message: '创建成功'
        }
      }
    },
    async deletePost(ctx) {
      const body = ctx.request.body;
      const res = await mysql.deletePost([body.post_id]);
      ctx.body = {
        res: res,
        result: true,
        status: {
          code: 200,
          message: '删除成功'
        }
      }
    },
    async createComment(ctx) {
      const body = ctx.request.body;
      const res = await mysql.createComment([body.post_id, body.post_author_id, ctx.session.id, ctx.session.name, body.text]);
      ctx.body = {
        res: res,
        result: true,
        status: {
          code: 200,
          message: '发表成功'
        }
      }
    },
    async deleteComment(ctx) {
      const body = ctx.request.body;
      // 删除前先确保有权限删除
      const comment = await mysql.findUserIdByPostIdAndCommentIdFromComment([body.comment_id, body.post_id]);
      const hasResult = comment.length > 0;
      if (!hasResult) {
        return ctx.body = {
          result: false,
          status: {
            code: 200,
            message: '删除失败'
          }
        }
      }
      if (ctx.session.id !== comment[0].post_author_id && ctx.session.id !== comment[0].user_id) {
        return ctx.body = {
          result: false,
          status: {
            code: 200,
            message: '权限不足'
          }
        }
      }
      const res = await mysql.deleteComment([body.comment_id, body.post_id]);
      ctx.body = {
        res: res,
        result: true,
        status: {
          code: 200,
          message: '删除成功'
        }
      }
    },
  }
}
