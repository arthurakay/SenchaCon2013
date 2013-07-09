Ext.define('SenchaCon.view.Main', {
    xtype : 'SenchaCon-main',
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.Img',
        'Ext.Component',
        'SenchaCon.view.Chart'
    ],

    items: [
        {
            xtype : 'panel',
            title : 'Camera',

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults: {
                flex : 1
            },

            items: [
                {
                    xtype: 'image',
                    itemId: 'OriginalPhoto',
                    hidden : true
                },
                {
                    xtype: 'component',
                    itemId: 'ModifiedPhoto',
                    html: '<canvas height="100" width="100" style="background-color: #fff;"></canvas>'
                }
            ]
        },

        {
            xtype : 'senchacon-chart'
        }

    ]
});