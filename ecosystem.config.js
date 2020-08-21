module.exports = {
  apps: [{
    name: 'x_nsf_1',
    script: 'src/app.js',
    env: {
      "NODE_ENV": "production"
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }]
};
