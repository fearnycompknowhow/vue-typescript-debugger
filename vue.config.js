module.exports = {
  configureWebpack() {
    return {
      devtool: 'source-map',
      plugins: [{
        apply(compiler) {
          compiler.hooks.thisCompilation.tap('Initializing Compilation', (compilation) => {
            compilation.hooks.succeedModule.tap('Module Built', (module) => {

            });
          });
        }
      }]
    };
  }
};