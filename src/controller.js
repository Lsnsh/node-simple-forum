
const mysql = require('./mysql');


module.exports = {
  home: {
    async index(ctx) {
      await ctx.render('home', {
        title: 'home'
      });
    }
  },
  post: {
    async index(ctx) {
      await ctx.render('post/list', {
        title: 'post'
      });
    },
    async new(ctx) {
      await ctx.render('post/new', {
        title: 'new post'
      });
    }
  },
  user: {
    async index(ctx) {
      await ctx.render('user', {
        title: 'user'
      });
    }
  },
  login: {
    async index(ctx) {
      await ctx.render('login', {
        title: 'login'
      });
    }
  },
  signup: {
    async index(ctx) {
      await ctx.render('signup', {
        title: 'signup'
      });
    }
  },
  api: {
    async signup(ctx) {
      const body = ctx.request.body;
      await mysql.createUser([body.username, body.password]);
      ctx.body = {
        code: 200,
        message: '注册成功'
      };
    }
  }
}
