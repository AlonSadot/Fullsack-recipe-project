module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    host: "localhost"
    // host: "http://doralonrecipes.cs.bgu.ac.il"

  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
