var GraphiteConfig = GraphiteConfig || {};

GraphiteConfig['0.9.12'] = GraphiteConfig['0.9.12'] || {};

GraphiteConfig['0.9.12'].Options = {
    areaMode:{
        type: "select",
        value: ["none", "first", "all", "stacked"],
        def: "none"
    },
    bgcolor:{
        type: 'color',
        def: '000000'
    },
    colorList:{
        type: 'string'
    },
    fgcolor:{
        type: 'color',
        def: 'ffffff'
    },
    fontName: {
        type: 'string'
    },
    fontSize: {
        type: 'number',
        min: 1
    },
    fontBold:{
        type: 'bool'
    },
    fontItalic:{
        type: 'bool'
    },
    from:{
        type: "string"
    },
    height:{
        type: 'number',
        unit: 'pixel',
        helpLink: 'width-height',
        min: 1
    },
    hideLegend: {
        type: 'bool'
    },
    hideAxes: {
        type: 'bool'
    },
    hideGrid: {
        type: 'bool'
    },
    lineMode:{
        type: 'select',
        value: ['staircase', 'slope'],
        def: 'slope'
    },
    lineWidth: {
        type: 'number'
    },
    majorGridLineColor:{
        type: 'color',
        def: '000000'
    },
    minorGridLineColor:{
        type: 'color',
        def: '000000'
    },
    minXStep:{
        type: 'number'
    },
    minorY:{
        type:'number'
    },
    template: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    tz:{
        type: 'string'
    },
    vtitle: {
        type: 'string'
    },
    width:{
        type: 'number',
        unit: 'pixel',
        helpLink: 'width-height',
        min: 1
    },
    yMax:{
        type: 'float'
    },
    yMin: {
        type: 'float'
    }
};
