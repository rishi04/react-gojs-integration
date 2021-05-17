import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import DiagramButtons from './DiagramButtons';
import './MyDiagram.css';
import { getRandomColor } from '../Helpers/ColorHelper';
import SelectionDetails from './SelectionDetails';

class MyDiagram extends React.Component {
    nodeId = 0;

    constructor(props) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
        this.modelChangeHandler = this.modelChangeHandler.bind(this);
        this.initModelHandler = this.initModelHandler.bind(this);
        this.updateColorHandler = this.updateColorHandler.bind(this);
        this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.addNode = this.addNode.bind(this);
        this.updateNodeText = this.updateNodeText.bind(this);
        this.onTextEdited = this.onTextEdited.bind(this);
        this.state = {
            selectedNodeKeys: [],
            model: {
                nodeDataArray: [{ key: 'test', label: 'Before setting the state', color: 'lightblue' }],
                linkDataArray: []
            }
        };
    }

    render() {
        return [
            <DiagramButtons
                key="diagramButtons"
                onInit={this.initModelHandler}
                onUpdateColor={this.updateColorHandler}
                onAddNode={this.addNode}
            />,
            <SelectionDetails key="selectionDetails" selectedNodes={this.state.selectedNodeKeys} />,
            <GojsDiagram
                key="gojsDiagram"
                diagramId="myDiagramDiv"
                model={this.state.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
                onModelChange={this.modelChangeHandler}
            />
        ];
    }

    initModelHandler() {
        this.setState({
            ...this.state,
            model: {
                copiesArrays: true,
                copiesArrayObjects: true,
                linkFromPortIdProperty: 'fromPort',
                linkToPortIdProperty: 'toPort',
                nodeDataArray: [
                    {
                        key: 'DL2',
                        header: 'Snowflake Data Landing',
                        isGroup: true,
                        footer: 'Snowflake DL2',
                        role: 'b',
                        nodeImage: 'images/landingZone2.png'
                    },
                    {
                        key: 'DL3',
                        header: 'Snowflake Data Conformed',
                        isGroup: true,
                        footer: 'Snowflake DL3',
                        role: 'b',
                        nodeImage: 'images/conformedData.png'
                    },
                    {
                        key: 'Stage Table',
                        nodeImage: 'images/snowflake.png',
                        fields: [
                            { name: 'stg_bal_amt', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'stg_prog_rco_scr_nr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'stg_update_fico_scr_nr', info: '', color: '#00BCF2' }
                        ],
                        //loc: "400 250",
                        group: 'DL2'
                    },
                    {
                        key: 'Stage Table2',
                        nodeImage: 'images/snowflake.png',
                        fields: [
                            { name: 'stg_bal_amt', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'stg_prog_rco_scr_nr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'stg_update_fico_scr_nr', info: '', color: '#00BCF2' }
                        ],
                        group: 'DL3'
                    },

                    {
                        key: 'dsj1bk456214_adept_stagetypes',
                        header: 'Datastage Job',
                        isGroup: true,
                        footer: 'dsj1bk456214_adept_stagetypes',
                        nodeImage: 'images/datastage3.png'
                    },
                    {
                        key: 'Datastage Transformer1',
                        nodeImage: 'images/datastageTransformer.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-1200 0"
                    },
                    {
                        key: 'Datastage Dataset0',
                        nodeImage: 'images/datastageDataset.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-1500 0"
                    },
                    {
                        key: 'Datastage Dataset1',
                        nodeImage: 'images/datastageDataset.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-900 0"
                    },
                    {
                        key: 'Datastage Dataset2',
                        nodeImage: 'images/datastageDataset.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-900 200"
                    },
                    {
                        key: 'Datastage Sort1',
                        nodeImage: 'images/datastageSort.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-1200 200"
                    },
                    {
                        key: 'Datastage Aggregator1',
                        nodeImage: 'images/datastageAggregator.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-1500 200"
                    },
                    {
                        key: 'Datastage Snowflake1',
                        nodeImage: 'images/snowflake.png',
                        fields: [
                            { name: 'stg_bal_amt', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'stg_prog_rco_scr_nr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'stg_update_fico_scr_nr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-1800 200"
                    },
                    {
                        key: 'Datastage Funnel',
                        nodeImage: 'images/datastageFunnel.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-600 0"
                    },

                    {
                        key: 'Datastage Snowflake',
                        nodeImage: 'images/snowflakeGrey.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'dsj1bk456214_adept_stagetypes'
                        //loc: "-300 0"
                    },
                    {
                        key: 'DBT Model',
                        nodeImage: 'images/dbt4.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ],
                        group: 'DL3'
                    },
                    {
                        key: 'DL5',
                        header: 'Business Intelligence',
                        isGroup: true,
                        footer: 'BI Consumption DL5',
                        nodeImage: 'images/businessIntelligence3.jpeg'
                    },

                    {
                        key: 'FICO Risk Score Report',
                        nodeImage: 'images/tableauWorkbook.png',
                        fields: [
                            { name: 'cur_bal_amt', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'prog_rco_scr_nr', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'as_of_dt', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'update_fico_scr_nr', info: '', color: '#E4E8EB', figure: '' }
                        ],
                        //loc: "1215 250",
                        group: 'DL5'
                    },

                    {
                        key: 'Originating FICO Risk Score Report',
                        nodeImage: 'images/tableauWorkbook.png',
                        fields: [
                            { name: 'fico_scr_nr', info: '', color: 'orange', figure: 'Ellipse' },
                            { name: 'cur_bal_amt', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'prog_rco_scr_nr', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'as_of_dt', info: '', color: '#E4E8EB', figure: '' },
                            { name: 'update_fico_scr_nr', info: '', color: '#E4E8EB', figure: '' }
                        ],
                        group: 'DL5'
                    },

                    {
                        key: 3,
                        header: 'Datastage Job',
                        isGroup: true,
                        footer: 'dsj1345_adept_lineage',
                        role: 'b',
                        //loc: "0 0",
                        nodeImage: 'images/datastage3.png'
                    },
                    {
                        key: 'StageA',
                        header: 'Supplier',
                        text: 'Planned Order Variations',
                        footer: 'Retailer',
                        role: 'b',
                        group: 3,
                        nodeImage: 'images/datastageDataset.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ]
                        //loc: "-1755 455",
                    },
                    {
                        key: 'StageB',
                        header: 'Supplier',
                        text: 'Order & Delivery Variations',
                        footer: 'Retailer',
                        role: 't',
                        group: 3,
                        nodeImage: 'images/snowflakeGrey.png',
                        fields: [
                            { name: 'bal_amount', info: '', color: '#F7B84B', figure: 'Ellipse' },
                            { name: 'prog_rco_score_nbr', info: '', color: '#F25022', figure: 'Diamond' },
                            { name: 'update_fico_score_nbr', info: '', color: '#00BCF2' }
                        ]
                    }
                ],
                linkDataArray: [
                    { from: 'Datastage Snowflake', fromPort: 'bal_amount', to: 'Stage Table', toPort: 'stg_bal_amt' },
                    {
                        from: 'Datastage Snowflake',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Stage Table',
                        toPort: 'stg_prog_rco_scr_nr'
                    },
                    {
                        from: 'Datastage Snowflake',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Stage Table',
                        toPort: 'stg_update_fico_scr_nr'
                    },

                    { from: 'Stage Table', fromPort: 'stg_bal_amt', to: 'DBT Model', toPort: 'bal_amount' },
                    {
                        from: 'Stage Table',
                        fromPort: 'stg_prog_rco_scr_nr',
                        to: 'DBT Model',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Stage Table',
                        fromPort: 'stg_update_fico_scr_nr',
                        to: 'DBT Model',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_bal_amt',
                        to: 'FICO Risk Score Report',
                        toPort: 'cur_bal_amt'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_prog_rco_scr_nr',
                        to: 'FICO Risk Score Report',
                        toPort: 'prog_rco_scr_nr'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_update_fico_scr_nr',
                        to: 'FICO Risk Score Report',
                        toPort: 'update_fico_scr_nr'
                    },

                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_bal_amt',
                        to: 'Originating FICO Risk Score Report',
                        toPort: 'cur_bal_amt'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_prog_rco_scr_nr',
                        to: 'Originating FICO Risk Score Report',
                        toPort: 'prog_rco_scr_nr'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_update_fico_scr_nr',
                        to: 'Originating FICO Risk Score Report',
                        toPort: 'update_fico_scr_nr'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_bal_amt',
                        to: 'Originating FICO Risk Score Report',
                        toPort: 'fico_scr_nr'
                    },
                    {
                        from: 'Stage Table2',
                        fromPort: 'stg_prog_rco_scr_nr',
                        to: 'Originating FICO Risk Score Report',
                        toPort: 'fico_scr_nr'
                    },

                    { from: 'StageA', fromPort: 'bal_amount', to: 'StageB', toPort: 'bal_amount' },
                    { from: 'StageB', fromPort: 'bal_amount', to: 'Stage Table', toPort: 'stg_bal_amt' },

                    { from: 'DBT Model', fromPort: 'bal_amount', to: 'Stage Table2', toPort: 'stg_bal_amt' },
                    {
                        from: 'DBT Model',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Stage Table2',
                        toPort: 'stg_prog_rco_scr_nr'
                    },
                    {
                        from: 'DBT Model',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Stage Table2',
                        toPort: 'stg_update_fico_scr_nr'
                    },

                    {
                        from: 'Datastage Snowflake1',
                        fromPort: 'stg_bal_amt',
                        to: 'Datastage Aggregator1',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Snowflake1',
                        fromPort: 'stg_prog_rco_scr_nr',
                        to: 'Datastage Aggregator1',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Snowflake1',
                        fromPort: 'stg_update_fico_scr_nr',
                        to: 'Datastage Aggregator1',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Aggregator1',
                        fromPort: 'bal_amount',
                        to: 'Datastage Sort1',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Aggregator1',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Sort1',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Aggregator1',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Sort1',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Dataset0',
                        fromPort: 'bal_amount',
                        to: 'Datastage Transformer1',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Dataset0',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Transformer1',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Dataset0',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Transformer1',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Transformer1',
                        fromPort: 'bal_amount',
                        to: 'Datastage Dataset1',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Transformer1',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Dataset1',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Transformer1',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Dataset1',
                        toPort: 'update_fico_score_nbr'
                    },

                    { from: 'Datastage Sort1', fromPort: 'bal_amount', to: 'Datastage Dataset2', toPort: 'bal_amount' },
                    {
                        from: 'Datastage Sort1',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Dataset2',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Sort1',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Dataset2',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Dataset1',
                        fromPort: 'bal_amount',
                        to: 'Datastage Funnel',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Dataset1',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Funnel',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Dataset1',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Funnel',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Dataset2',
                        fromPort: 'bal_amount',
                        to: 'Datastage Funnel',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Dataset2',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Funnel',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Dataset2',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Funnel',
                        toPort: 'update_fico_score_nbr'
                    },

                    {
                        from: 'Datastage Funnel',
                        fromPort: 'bal_amount',
                        to: 'Datastage Snowflake',
                        toPort: 'bal_amount'
                    },
                    {
                        from: 'Datastage Funnel',
                        fromPort: 'prog_rco_score_nbr',
                        to: 'Datastage Snowflake',
                        toPort: 'prog_rco_score_nbr'
                    },
                    {
                        from: 'Datastage Funnel',
                        fromPort: 'update_fico_score_nbr',
                        to: 'Datastage Snowflake',
                        toPort: 'update_fico_score_nbr'
                    },

                    { from: 'StageA', fromPort: 'bal_amount', to: 'StageB', toPort: 'bal_amount' },
                    { from: 'StageB', fromPort: 'bal_amount', to: 'Stage Table', toPort: 'stg_bal_amt' }
                ]
            }
        });
    }

    updateColorHandler() {
        const updatedNodes = this.state.model.nodeDataArray.map(node => {
            return {
                ...node,
                color: getRandomColor()
            };
        });

        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: updatedNodes
            }
        });
    }

    createDiagram(diagramId) {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, 'myDiagramDiv', {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $(go.LayeredDigraphLayout),
            validCycle: go.Diagram.CycleNotDirected, // don't allow loops
            'undoManager.isEnabled': true
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        const fieldTemplate = $(
            go.Panel,
            'TableRow', // this Panel is a row in the containing Table
            new go.Binding('portId', 'name'), // this Panel is a "port"
            {
                background: 'transparent', // so this port's background can be picked by the mouse
                fromSpot: go.Spot.Right, // links only go from the right side to the left side
                toSpot: go.Spot.Left,
                //color: "red",

                // allow drawing links from or to this port:
                fromLinkable: true,
                toLinkable: true
            },

            {
                // allow the user to select items -- the background color indicates whether "selected"
                //?? maybe this should be more sophisticated than simple toggling of selection
                click: function(e, item) {
                    // assume "transparent" means not "selected", for items
                    var oldskips = item.diagram.skipsUndoManager;
                    item.diagram.skipsUndoManager = true;
                    if (item.background === 'transparent') {
                        //alert("HMMM: " + item.background);
                        console.log('ROBERT: ' + item);
                        console.log('SUBJECT: ' + item.part);
                        item.background = '#d4e3f9';
                        //item.stroke = "#DFBB00";
                        //item.strokeWidth: 4;
                    } else {
                        //alert("HMMM: " + item.background);
                        console.log('ROBERT: ' + item);

                        item.background = 'transparent';
                    }
                    item.diagram.skipsUndoManager = oldskips;
                }
            },

            $(
                go.Shape,
                {
                    width: 12,
                    height: 12,
                    column: 0,
                    strokeWidth: 0,
                    margin: new go.Margin(1, 0),
                    //background: "#FBE7C9",
                    stretch: go.GraphObject.Horizontal,
                    // but disallow drawing links from or to this shape:
                    alignment: go.Spot.Top,
                    fromLinkable: false,
                    toLinkable: false
                },
                new go.Binding('figure', 'figure'),
                new go.Binding('fill', 'color')
            ),

            $(
                go.TextBlock,
                {
                    margin: new go.Margin(1, 0),
                    alignment: go.Spot.Left,
                    column: 1,
                    height: 22,
                    font: 'regular 12px Roboto',
                    stroke: '#4a4a4a',
                    //background: "#FBE7C9",
                    //stretch: go.GraphObject.Horizontal,
                    // and disallow drawing links from or to this text:
                    fromLinkable: false,
                    toLinkable: false
                },
                new go.Binding('text', 'name')
            )
        );

        myDiagram.nodeTemplate = $(
            go.Node,
            'Auto',
            { copyable: false, deletable: false, padding: 20 },

            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),

            // this rectangular shape surrounds the content of the node
            $(go.Shape, {
                fill: 'white',
                shadowVisible: true,
                //isShadowed: true,
                //stroke: "deepskyblue",
                stroke: 'lightgrey',
                strokeWidth: 2
                //shadowBlur: 5,
                //shadowColor: "blue",
            }),

            // the content consists of a header and a list of items
            $(
                go.Panel,
                'Vertical',

                // ********************     NEW HEADER INFO BASED ON ADEPT LINEAGE WIREFRAME
                $(
                    go.Panel,
                    'AUTO',
                    {
                        //background: "black",
                        stretch: go.GraphObject.Horizontal
                        //shadowOffset: new go.Point(0, 0),
                        //shadowBlur: 5,
                        //shadowColor: "blue",
                    }, // as wide as the whole node

                    $(go.Shape, {
                        //geometryString: "F M120 0 L80 80 0 50z",
                        figure: 'rectangle',
                        stroke: 'grey',
                        height: 0.1,
                        stretch: go.GraphObject.Horizontal,
                        position: new go.Point(0, 45)
                    }),

                    $(go.Picture, new go.Binding('source', 'nodeImage'), {
                        //source: "images/snowflake.png",
                        width: 30,
                        height: 29,
                        margin: new go.Margin(9, 7, 9, 7),
                        position: new go.Point(0, 0)
                    }),

                    $(go.TextBlock, new go.Binding('text', 'key'), {
                        alignment: go.Spot.Right,
                        //width: 255,
                        //margin: new go.Margin(0, 24, 0, 2),
                        position: new go.Point(45, 15),
                        stroke: '#4a4a4a',
                        textAlign: 'center',
                        font: 'Regular 12px Roboto'
                    }),

                    $(go.TextBlock, ' Before state updated', {
                        alignment: go.Spot.Right,
                        //width: 255,
                        //margin: new go.Margin(0, 24, 0, 2),
                        position: new go.Point(45, 28),
                        stroke: '#4a4a4a',
                        textAlign: 'center',
                        font: 'Regular 11px Roboto'
                    }),

                    // THIS IS THE EXPAND BUTTON FOR COLUMNS AND ATTRIBUTES

                    $(
                        'PanelExpanderButton',
                        'LIST', // the name of the element whose visibility this button toggles
                        {
                            alignment: go.Spot.TopRight,
                            width: 48,
                            height: 48,
                            position: new go.Point(255, 0)
                        }
                    ),

                    // THIS IS THE EXPAND BUTTON FOR COLUMNS AND ATTRIBUTES

                    $(
                        'PanelExpanderButton',
                        'LIST2', // the name of the element whose visibility this button toggles
                        {
                            alignment: go.Spot.TopRight,
                            width: 48,
                            height: 48,
                            background: 'transparent',
                            //figure: "square",
                            //stroke: "#ffffff",
                            position: new go.Point(0, 0)
                        }
                    )
                ),

                // THIS HOUSES THE FILTER OPTIONS FOR LARGE ENTITIES

                $(
                    go.Panel,
                    'VERTICAL',
                    {
                        //background: "black",
                        stretch: go.GraphObject.Horizontal,
                        name: 'LIST2'
                        //shadowOffset: new go.Point(0, 0),
                        //shadowBlur: 5,
                        //shadowColor: "blue",
                    }, // as wide as the whole node

                    $(go.TextBlock, '400 columns  |  20 CDE  |  5 mapped', {
                        //alignment: go.Spot.Right,
                        //width: 255,
                        margin: new go.Margin(5, 24, 2, 20),
                        //position: new go.Point(45, 28),
                        stroke: '#549bfd',
                        textAlign: 'left',
                        font: 'Regular 11px Roboto'
                    }),

                    $(go.Shape, {
                        //geometryString: "F M120 0 L80 80 0 50z",
                        figure: 'rectangle',
                        stroke: 'lightgrey',
                        height: 0.1,
                        stretch: go.GraphObject.Horizontal,
                        position: new go.Point(0, 20)
                    }),

                    $(go.TextBlock, 'search columns', {
                        //alignment: go.Spot.Right,
                        //width: 255,
                        margin: new go.Margin(5, 24, 2, 20),
                        position: new go.Point(0, 28),
                        stroke: 'lightgrey',
                        textAlign: 'left',
                        font: 'Regular 11px Roboto'
                    }),

                    $(go.Shape, {
                        //geometryString: "F M120 0 L80 80 0 50z",
                        figure: 'rectangle',
                        stroke: 'grey',
                        height: 0.1,
                        stretch: go.GraphObject.Horizontal,
                        position: new go.Point(0, 48)
                    }),

                    $(go.Picture, {
                        source: 'images/searchv6.png',
                        width: 13,
                        height: 13,
                        margin: 5,
                        position: new go.Point(0, 28)
                    })
                ),

                // this Panel holds a Panel for each item object in the itemArray;
                // each item Panel is defined by the itemTemplate to be a TableRow in this Table
                $(
                    go.Panel,
                    'Table',
                    {
                        name: 'LIST',
                        padding: 2,
                        minSize: new go.Size(300, 10),
                        defaultStretch: go.GraphObject.Horizontal,
                        itemTemplate: fieldTemplate
                    },
                    new go.Binding('itemArray', 'fields')
                )
            )
        );

        return myDiagram;
    }

    modelChangeHandler(event) {
        switch (event.eventType) {
            case ModelChangeEventType.Remove:
                if (event.nodeData) {
                    this.removeNode(event.nodeData.key);
                }
                if (event.linkData) {
                    this.removeLink(event.linkData);
                }
                break;
            default:
                break;
        }
    }

    addNode() {
        const newNodeId = 'node' + this.nodeId;
        const linksToAdd = this.state.selectedNodeKeys.map(parent => {
            return { from: parent, to: newNodeId };
        });
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray,
                    { key: newNodeId, label: newNodeId, color: getRandomColor() }
                ],
                linkDataArray:
                    linksToAdd.length > 0
                        ? [...this.state.model.linkDataArray].concat(linksToAdd)
                        : [...this.state.model.linkDataArray]
            }
        });
        this.nodeId += 1;
    }

    removeNode(nodeKey) {
        const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
                ]
            }
        });
    }

    removeLink(linKToRemove) {
        const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...this.state.model,
                linkDataArray: [
                    ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
                ]
            }
        };
    }

    updateNodeText(nodeKey, text) {
        const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToUpdateIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
                    {
                        ...this.state.model.nodeDataArray[nodeToUpdateIndex],
                        label: text
                    },
                    ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1)
                ]
            }
        });
    }

    nodeSelectionHandler(nodeKey, isSelected) {
        if (isSelected) {
            this.setState({
                ...this.state,
                selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
            });
        } else {
            const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState({
                ...this.state,
                selectedNodeKeys: [
                    ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
                ]
            });
        }
    }

    onTextEdited(e) {
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const node = tb.part;
        if (node instanceof go.Node) {
            this.updateNodeText(node.key, tb.text);
        }
    }
}

export default MyDiagram;
