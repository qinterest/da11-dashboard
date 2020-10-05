const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#009edb', // 全局主色
              '@link-color': '#009edb', // 链接色
              '@heading-color': 'rgba(0, 0, 0, 0.85)',  // 标题色
              '@text-color': '#333333', //Dark Grey is used for body text
              '@text-color-secondary': '#4D4D4D', // Grey for the Site Title, the Navbar, and some subheadings.
              '@border-color-base': '#F2F2F2',//Light Grey is used for page elements such as borders and backgrounds
              '@font-family': "-apple-system,  Roboto,BlinkMacSystemFont, Arial,'Segoe UI', 'Helvetica Neue', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'",
              '@layout-trigger-background': '#009edb',
            }, 
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};