Ext.define('SenchaCon.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'SenchaCon.view.Main',
        'SenchaCon.view.Control',
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'west',
            xtype: 'SenchaCon-control',
            title: '',
            width: 300
        },
        {
            region: 'center',
            xtype: 'SenchaCon-main',
            title : 'SenchaCon 2013 - Building Windows 8 apps with Ext JS'
        }
    ]
});