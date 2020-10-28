const fs = require('fs');
const SVGO = require('svgo');

// Create minified svgs via svgo.optimize
// SVGO: https://github.com/svg/svgo

const svgo = new SVGO({
    plugins: [
        {cleanupAttrs: true}, {removeDoctype: true}, {removeXMLProcInst: true}, {removeComments: true},
        {removeMetadata: true}, {removeTitle: true}, {removeDesc: true}, {removeUselessDefs: true},
        {removeEditorsNSData: true}, {removeEmptyAttrs: true}, {removeHiddenElems: true}, {removeEmptyText: true},
        {removeEmptyContainers: true}, {removeViewBox: false}, {cleanupEnableBackground: true}, {convertStyleToAttrs: true},
        {convertColors: true}, {convertPathData: true}, {convertTransform: true}, {removeUnknownsAndDefaults: true},
        {removeNonInheritableGroupAttrs: true}, {removeUselessStrokeAndFill: true}, {removeUnusedNS: true}, {cleanupIDs: true},
        {cleanupNumericValues: true}, {moveElemsAttrsToGroup: true}, {moveGroupAttrsToElems: true}, {collapseGroups: true},
        {removeRasterImages: false}, {mergePaths: true}, {convertShapeToPath: true}, {sortAttrs: true},
        {removeDimensions: true}, {removeAttrs: {attrs: '(stroke|fill)'}}
    ]
});

function minifySvg (source, files, dest) {
    files.forEach(file => {
        let data = fs.readFileSync(source + '/' + file, 'utf-8');
        svgo.optimize(data, {path: source}).then(result => {
            fs.writeFileSync(dest + '/' + file, result.data);
        })
    })
}

minifySvg('svgs/full', [
    'quizlet.svg',
    'search.svg',
    'create.svg',
], 'svgs/min');
