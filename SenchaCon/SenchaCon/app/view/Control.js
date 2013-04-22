Ext.define('SenchaCon.view.Control', {
    extend: 'Ext.form.Panel',

    xtype : 'SenchaCon-control',

    items: [
        {
            xtype: 'fieldset',
            items: [
                {
                    xtype: 'button',
                    itemId: 'TakePhoto',
                    text: 'Take Picture...'
                },
                {
                    xtype: 'button',
                    itemId: 'SharePhoto',
                    disabled: true,
                    text: 'Share...'
                }
            ]
        },
        {
            xtype: 'fieldset',
            items: [
                {
                    xtype: 'slider',
                    itemId: 'RedSlider',
                    fieldLabel: 'Red',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'GreenSlider',
                    fieldLabel: 'Green',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'BlueSlider',
                    fieldLabel: 'Blue',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                }
            ]
        }
    ]
});