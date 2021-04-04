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


            compilation.hooks.finishModules.tapPromise('All Modules Built', async (modules) => {
              for (const module of modules) {
                const { resource } = module;

                if (!resource) continue;
                if (/node_modules/.test(resource)) continue;
                if (!/\.vue/.test(resource)) continue;
                if (!/type=script/.test(resource)) continue;
                if (!/lang=ts/.test(resource)) continue;
                if (!module['_source'] || !module['_source']['_sourceMap']) continue;
              }
            });
          });
        }
      }]
    };
  }
};