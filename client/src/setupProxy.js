const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/media"],
    createProxyMiddleware({
      target: "https://agile-stream-99792.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
