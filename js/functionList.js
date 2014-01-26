define({
    groupByNode: {
        arg:[{
            name: "nodeNum",
            type: "number",
            required: true
        },{
            name: "callback",
            type: "string",
            required: true
        }]
    },
    summarize:{
        arg:[{
            name: "intervalString",
            type: "string",
            required: true
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
    sortByMaxima:{

    },
    thomas:{}
});