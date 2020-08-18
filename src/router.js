module.exports = (option) => {
  const { router, controller } = option;
  router.get('/', controller.home.index);
  router.get('/post', controller.post.index);
  router.get('/post/new', controller.post.new);
  router.get('/post/:id', controller.post._id);
  router.get('/user/:id', controller.user._id);
  router.get('/signin', controller.signin.index);
  router.get('/signup', controller.signup.index);
  router.post('/api/signup', controller.api.signup);
  router.post('/api/signin', controller.api.signin);
  router.post('/api/post/create', controller.api.createPost);
}
