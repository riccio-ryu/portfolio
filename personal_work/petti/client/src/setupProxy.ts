const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  console.log('sa');
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};