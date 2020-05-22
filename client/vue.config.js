module.exports = {

  configureWebpack: {

    // other webpack options to merge in ...

  },

  // devServer Options don't belong into `configureWebpack`

  devServer: {

    public: '192.168.3.7:8080',   // You can set your own IP address and port number where the client is running.

    hot: true,

    disableHostCheck: true

  }
}
