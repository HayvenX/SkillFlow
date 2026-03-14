import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';

const optimizeSvgSources = () => {
  const optimizeSvg = (filePath, isMono = false) => {
    if (!filePath.endsWith('.svg') || !fs.existsSync(filePath)) return;

    const svg = fs.readFileSync(filePath, 'utf8');
    const plugins = [
      'cleanupNumericValues',
      'removeEditorsNSData',
      'convertStyleToAttrs',
      'convertShapeToPath',
      'removeXMLProcInst',
      'removeUselessDefs',
      'removeDimensions',
      'removeComments',
      'removeDoctype',
      'removeMetadata',
      'collapseGroups',
      'convertColors',
      'removeScripts',
      'cleanupAttrs',
      'removeTitle',
      'removeDesc',
      'removeXMLNS',
      'mergePaths',
      {
        name: 'removeAttrs',
        params: { attrs: ['id', 'version'] },
      },
    ];

    if (isMono) {
      plugins.push(
        { name: 'removeStyleElement' },
        { name: 'removeAttrs', params: { attrs: '*:(stroke|fill|style):.*' } },
      );
    }

    const { data } = optimize(svg, {
      path: filePath,
      multipass: true,
      plugins,
    });
    if (data !== svg) fs.writeFileSync(filePath, data);
  };

  const optimizeDir = (dir, isMono = false) => {
    const folder = path.resolve(dir);
    if (!fs.existsSync(folder)) return;
    fs.readdirSync(folder).forEach((f) => {
      if (!f.endsWith('.svg')) return;
      optimizeSvg(path.join(folder, f), isMono);
    });
  };

  const runAll = () => {
    optimizeDir('src/assets/icons/monochrome', true);
    ['src/assets/icons', 'src/assets/images'].forEach(optimizeDir);
  };

  const handleSvgChange = (id) => {
    if (!id.endsWith('.svg')) return;
    const normalizedId = id.replace(/\\/g, '/');
    const isMono = normalizedId.includes('/src/assets/icons/monochrome/');
    if (normalizedId.includes('/src/assets/icons/')) optimizeSvg(id, isMono);
  };

  return {
    name: 'optimize-svg-sources',
    buildStart: runAll,

    watchChange(id, { event }) {
      if (event === 'update' || event === 'create') handleSvgChange(id);
    },
  };
};

export default optimizeSvgSources;
