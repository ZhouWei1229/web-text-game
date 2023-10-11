module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "element-plus",
        customStyleName: (name) => {
          // 根据实际情况设置 Element Plus 的样式文件名
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
      "element-plus",
    ],
  ],
};
