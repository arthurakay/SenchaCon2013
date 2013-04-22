Ext.define('SenchaCon.view.Main', {
    xtype : 'SenchaCon-main',
    extend: 'Ext.Panel',

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
            itemId : 'OriginalPhoto'
        },
        {
            xtype: 'component',
            itemId: 'ModifiedPhoto',
            html: '<canvas height="100" width="100" style="background-color: #fff;"></canvas>'
        }
    ]
});