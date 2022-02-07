const fs = require('fs');
const { SourceMapConsumer, SourceMapGenerator } = require('source-map');

module.exports = {
  configureWebpack() {
    return {
      devtool: 'source-map',
      plugins: [{
        apply(compiler) {
          compiler.hooks.thisCompilation.tap('Initializing Compilation', (compilation) => {
            compilation.hooks.finishModules.tapPromise('Module Built', async (modules) => {
              for (const module of modules) {
                if (shouldSkipModule(module)) continue;

                const pathWithoutQuery = module.resource.replace(/\?.*$/, '');
                const sourceMap = extractSourceMap(module);
                const sourceFile = fs.readFileSync(pathWithoutQuery).toString('utf-8');

                sourceMap.sources = [pathWithoutQuery];
                sourceMap.sourcesContent = [sourceFile];
                sourceMap.mappings = await shiftMappings(sourceMap, sourceFile, pathWithoutQuery);
              }
            });
          });
        }
      }]
    };
  }
};

function shouldSkipModule(module) {
  const { resource = '' } = module;

  if (!resource) return true;
  if (/node_modules/.test(resource)) return true;
  if (!/\.vue/.test(resource)) return true;
  if (!/type=script/.test(resource)) return true;
  if (!/lang=ts/.test(resource)) return true;
  if (isMissingSourceMap(module)) return true;

  return false;
}

function isMissingSourceMap(module) {
  return !extractSourceMap(module);
}

function extractSourceMap(module) {
  if (!module['_source']) return null;

  return module['_source']['_sourceMap'] ||
    module['_source']['_sourceMapAsObject'] ||
    null;
}

async function shiftMappings(sourceMap, sourceFile, sourcePath) {
  const indexOfScriptTag = getIndexOfScriptTag(sourceFile);

  const shiftedSourceMap = await SourceMapConsumer.with(sourceMap, null, async (consumer) => {
    const generator = new SourceMapGenerator();

    consumer.eachMapping((mapping) => {
      const {
        generatedColumn,
        generatedLine,
        originalColumn,
        originalLine
      } = mapping;

      let name = mapping.name;
      let source = sourcePath;

      if (originalLine === null || originalColumn === null) {
        name = null;
        source = null;
      }
      else {
        original = {
          column: originalColumn,
          line: originalLine + indexOfScriptTag,
        };
      }

      generator.addMapping({
        generated: {
          column: generatedColumn,
          line: generatedLine,
        },
        original,
        source,
        name
      });
    });

    return generator.toJSON();
  });

  return shiftedSourceMap.mappings;
}

function getIndexOfScriptTag(sourceFile) {
  const lines = sourceFile.match(/.+/g);
  let indexOfScriptTag = 0;

  for (const line of lines) {
    ++indexOfScriptTag;
    if (/<script/.test(line)) break;
  }

  return indexOfScriptTag;
}