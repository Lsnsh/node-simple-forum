
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
      await ctx.render('post/index', {
        title: 'post list',
        postList: postList || []
      });
    },
    async new(ctx) {
      await ctx.render('post/new', {
        title: 'new post'
      });
    },
    async _id(ctx) {
      const postDetail = await mysql.postDetail([+ctx.params.id]);
      const commentList = await mysql.commentList([+ctx.params.id]);
      await ctx.render('post/_id', {
        title: 'post detail',
        post: postDetail[0],
        commentList: commentList,
        session: ctx.session
      });
    },
  },
  user: {
    async _id(ctx) {
      const userDetail = await mysql.userDetail([+ctx.params.id]);
      await ctx.render('user/_id', {
        title: 'user detail',
        user: userDetail[0]
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
