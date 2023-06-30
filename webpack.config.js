module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Nếu bạn muốn sử dụng CSS Modules
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  // ...
};
