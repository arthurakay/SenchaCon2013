Ext.define('SenchaCon.view.Control', {
    extend: 'Ext.form.Panel',

    xtype: 'SenchaCon-control',

    requires: [
        'Ext.form.FieldSet',
        'Ext.slider.Single',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    items: [
        {
            xtype: 'toolbar',
            dock : 'top',
            items: [
                {
                    xtype: 'button',
                    scale: 'large',
                    iconCls : '',
                    itemId: 'TakePhoto',
                    text: 'Take Picture...'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    iconCls: '',
                    itemId: 'SharePhoto',
                    disabled: true,
                    text: 'Share...'
                }
            ]
        },

        {
            xtype: 'fieldset',
            title : 'Filter Values',
            items: [
                {
                    xtype: 'slider',
                    itemId: 'BrightnessSlider',
                    fieldLabel: 'Brightness',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'ContrastSlider',
                    fieldLabel: 'Contrast',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'HueSlider',
                    fieldLabel: 'Hue',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'SaturationSlider',
                    fieldLabel: 'Saturation',
                    value: 50,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                }
            ]
        },

        {
            xtype: 'fieldset',
            title : 'Blur Values',
            items: [
                {
                    xtype: 'slider',
                    itemId: 'HorizontalBlurSlider',
                    fieldLabel: 'Horizontal',
                    value: 0,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                },
                {
                    xtype: 'slider',
                    itemId: 'VerticalBlurSlider',
                    fieldLabel: 'Vertical',
                    value: 0,
                    increment: 10,
                    minValue: 0,
                    maxValue: 100,
                    width: 250
                }
            ]
        },

        {
            xtype: 'fieldset',
            title : 'RGB Values',
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