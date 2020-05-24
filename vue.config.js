module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080 // 端口
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.graphql$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader");
  }
};
