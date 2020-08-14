
const apiController = require('./api');

module.exports = {
  ...apiController,
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
  signin: {
    async index(ctx) {
      await ctx.render('signin', {
        title: 'signin'
      });
    }
  },
  signup: {
    async index(ctx) {
      await ctx.render('signup', {
        title: 'signup'
      });
    }
  }
}
