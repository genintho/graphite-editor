var GraphiteConfig = GraphiteConfig || {};

GraphiteConfig['0.9.12'] = GraphiteConfig['0.9.12'] || {};

GraphiteConfig['0.9.12'].SerieFunctions = {
    absolute:{},
    alias:{
        arg:[{
            name: "newName",
            type: "string"
        }]
    },
    aliasByMetric:{},
    aliasByNode:{
        arg:[{
            name: "node",
            type: "number"
        }]
    },
    aliasSub:{
        arg:[{
            name: "search",
            type: "string"
        },{
            name: "replace",
            type: "string"
        }]
    },
    alpha:{
        arg:[{
            name: "alpha",
            type: "float"
        }]
    },
    areaBetween:{},
    asPercent:{
        arg:[{
            name: "total",
            type: "string",
            required: false
        }]
    },
    averageAbove:{
        arg:[{
            name: "n",
            type: "integer"
        }]
    },
    averageBelow:{
        arg:[{
            name: "n",
            type: "integer"
        }]
    },
    averageSeries: {},
    avg: {
        alias: 'averageSeries'
    },
    averageSeriesWithWildcards:{
        arg:[{
            name: "position",
            type: "integer"
        }]
    },
    cactiStyle:{
        arg:[{
            name: "system",
            type: "string",
            required: false
        }]
    },
    color:{
        arg:[{
            name: "theColor",
            type: "string"
        }]
    },
    groupByNode: {
        arg:[{
            name: "nodeNum",
            type: "number"
        },{
            name: "callback",
            type: "string"
        }]
    },
    movingAverage: {
        arg: [{
            name: "windowSize",
            type: "string"
        }]
    },
    summarize:{
        arg:[{
            name: "intervalString",
            type: "string"
        },{
            name: "func",
            type: "select",
            value: ["sum", "avg"],
            required: false,
            def: "sum",
            subtype: "string"
        },{
            name: "alignToFrom",
            type: "bool",
            required: false
        }]
    },
    sortByMaxima:{}
};