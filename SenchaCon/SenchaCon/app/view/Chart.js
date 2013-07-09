Ext.define('SenchaCon.view.Chart', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.chart.Chart',
        'SenchaCon.store.Chart',
        'Ext.toolbar.Toolbar'
    ],

    alias: 'widget.senchacon-chart',
    title : 'Chart',

    layout: 'fit',

    tbar: [{
        text: 'Put into canvas...',
        handler: function () {
            var chart = Ext.ComponentQuery.query('chart')[0];
            
            var canvas = document.getElementsByTagName("canvas")[0];
            var ctx = canvas.getContext("2d");
            var data = chart.save({ type: 'image/svg+xml' });
            
            var DOMURL = self.URL || self.webkitURL || self;
            var img = new Image();
            var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
            var url = DOMURL.createObjectURL(svg);
            
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
                DOMURL.revokeObjectURL(url);

                Ext.ComponentQuery.query('button#SharePhoto')[0].enable();
            };
            img.src = url;
        }
    }],

    items: [
        {
            xtype : 'chart',
            animate: true,
            shadow: true,
            store: Ext.create('SenchaCon.store.Chart'),

            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['value'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['key'],
                title: 'Month of the Year'
            }],

            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,

                label: {
                    display: 'insideEnd',
                    field: 'value',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle'
                },
                xField: 'key',
                yField: ['value']
            }]
        }
    ]
});