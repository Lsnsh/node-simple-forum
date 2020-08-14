const mysql = require('../mysql');

module.exports = {
  api: {
    async signup(ctx) {
      const body = ctx.request.body;
      await mysql.createUser([body.username, body.password]);
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    },
    async signin(ctx) {
      const body = ctx.request.body;
      const userInfo = await mysql.userLogin([body.username, body.password]);
      const isLogined = userInfo && userInfo.length > 0;
      if (isLogined) {
        ctx.session = {
          user: userInfo[0].name,
          id: userInfo[0].id
        }
      }
      ctx.body = {
        result: isLogined,
        status: {
          code: 200,
          message: isLogined ? '登陆成功' : '登陆失败'
        }
      }
    }
  }
}
