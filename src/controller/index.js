
const apiController = require('./api');
const mysql = require('../mysql');
const { $withPrefix } = require('../utils');
const config = require('../config');

module.exports = {
  ...apiController,
  home: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('home', {
        $withPrefix,
        title: 'home',
        version: config.version,
        postList: postList,
        session: ctx.session
      });
    }
  },
  post: {
    async index(ctx) {
      const postList = await mysql.postList();
      await ctx.render('post/index', {
        $withPrefix,
        title: 'post list',
        version: config.version,
        postList: postList,
        session: ctx.session
      });
    },
    async new(ctx) {
      await ctx.render('post/new', {
        $withPrefix,
        title: 'new post',
        version: config.version,
        session: ctx.session
      });
    },
    async _id(ctx) {
      const postDetail = await mysql.postDetail([+ctx.params.id]);
      const commentList = await mysql.commentList([+ctx.params.id]);
      await ctx.render('post/_id', {
        $withPrefix,
        title: 'post detail',
        version: config.version,
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
        $withPrefix,
        title: 'user detail',
        version: config.version,
        postList: userPostList,
        user: userDetail[0],
        session: ctx.session
      });
    }
  },
  signin: {
    async index(ctx) {
      await ctx.render('signin', {
        $withPrefix,
        title: 'signin',
        version: config.version,
        session: ctx.session
      });
    }
  },
  signup: {
    async index(ctx) {
      await ctx.render('signup', {
        $withPrefix,
        title: 'signup',
        version: config.version,
        session: ctx.session
      });
    }
  },
  signout: {
    async index(ctx) {
      // When ctx.session gets cleared ( = {} or null ), cookie and store data will be deleted.
      // https://www.npmjs.com/package/koa-session-minimal
      ctx.session = {};

      let url = ctx.query.u || '/';
      if (typeof url === 'string' && url.endsWith('/post/new')) {
        url = '/';
      }
      // 重定向到客户端指定的地址
      ctx.redirect(url, 302);
    }
  }
}
