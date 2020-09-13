const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/mongol-api',
        createProxyMiddleware({
            target: 'https://mongol.brono.com/mongol/api.php',
            changeOrigin: true,
        })
    );
};