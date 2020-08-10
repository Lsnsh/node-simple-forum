module.exports = (option) => {
  const { router, controller } = option;
  router.get('/', controller.home.index);
  router.get('/post', controller.post.index);
  router.get('/post/new', controller.post.new);
  router.get('/user', controller.user.index);
  router.get('/login', controller.login.index);
  router.get('/signup', controller.signup.index);
  router.post('/api/signup', controller.api.signup);
}
