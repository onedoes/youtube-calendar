//

import path from 'path';
import Builder from 'systemjs-builder';

export default function (config) {
  var {cwd, dest, src, isInSFXMode, builderOptions} = config;

  return function systemjsBuilderTask() {
    var builder = new Builder();

    const buildFn = isInSFXMode ? builder.buildSFX.bind(builder) : builder.build.bind(builder);

    return builder
      .loadConfig('jspm.config.js')
      .then(function () {
        builder.config({
          "baseURL": 'file:' + path.resolve(process.cwd(), cwd),
          "paths": {
            "npm:*": 'file:' + path.resolve(process.cwd(), 'jspm_packages/npm') + '/*.js',
            "github:*": 'file:' + path.resolve(process.cwd(), 'jspm_packages/github') + '/*.js'
          }
        });
        return buildFn(
          src,
          dest,
          builderOptions
        );
      });
  };

};
