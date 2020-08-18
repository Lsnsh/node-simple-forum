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
          username: userInfoList[0].username,
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
      const res = await mysql.createPost([body.title, ctx.session.username, ctx.session.id, body.content]);
      ctx.body = {
        res: res,
        result: true,
        status: {
          code: 200,
          message: '创建成功'
        }
      }
    },
  }
}
