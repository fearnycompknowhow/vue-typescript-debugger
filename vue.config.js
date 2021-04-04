const sourceMaps = {};

module.exports = {
  configureWebpack() {
    return {
      devtool: 'source-map',
      plugins: [{
        apply(compiler) {
          compiler.hooks.thisCompilation.tap('Initializing Compilation', (compilation) => {
            compilation.hooks.succeedModule.tap('Module Built', (module) => {
              const { resource } = module;

              if (!resource) return;
              if (/node_modules/.test(resource)) return;
              if (!/\.vue/.test(resource)) return;
              if (!/type=template/.test(resource)) return;
              if (!module['_source'] || !module['_source']['_sourceMap']) return;

              const pathWithoutQuery = module.resource.replace(/\?.*$/, '');

              sourceMaps[pathWithoutQuery] = module['_source']['_sourceMap'];
            });
          });
        }
      }]
    };
  }
};