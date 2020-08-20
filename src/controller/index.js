
const apiController = require('./api');
const mysql = require('../mysql');

module.exports = {
  ...apiController,
  home: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('home', {
        title: 'home',
        postList: postList,
        session: ctx.session
      });
    }
  },
  post: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('post/index', {
        title: 'post list',
        postList: postList,
        session: ctx.session
      });
    },
    async new(ctx) {
      await ctx.render('post/new', {
        title: 'new post',
        session: ctx.session
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
      const userPostList = await mysql.findUserPostByUserIdFromPost([+ctx.params.id]);
      await ctx.render('user/_id', {
        title: 'user detail',
        postList: userPostList,
        user: userDetail[0],
        session: ctx.session
      });
    }
  },
  signin: {
    async index(ctx) {
      await ctx.render('signin', {
        title: 'signin',
        session: ctx.session
      });
    }
  },
  signup: {
    async index(ctx) {
      await ctx.render('signup', {
        title: 'signup',
        session: ctx.session
      });
    }
  },
  signout: {
    async index(ctx) {
      // When ctx.session gets cleared ( = {} or null ), cookie and store data will be deleted.
      // https://www.npmjs.com/package/koa-session-minimal
      ctx.session = {};
      // 重定向到客户端指定的地址
      ctx.redirect(ctx.query.u || '/', 302);
    }
  }
}
