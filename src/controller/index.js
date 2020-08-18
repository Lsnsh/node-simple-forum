
const apiController = require('./api');
const mysql = require('../mysql');

module.exports = {
  ...apiController,
  home: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('home', {
        title: 'home',
        postList: postList || [],
        session: ctx.session
      });
    }
  },
  post: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('post/list', {
        title: 'post',
        postList: postList || []
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
