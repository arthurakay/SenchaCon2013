Ext.define('SenchaCon.controller.Filter', {
    extend: 'Ext.app.Controller',

    refs: [
        { ref: 'shareButton', selector: 'button#SharePhoto' },

        { ref: 'BrightnessSlider', selector: 'slider#BrightnessSlider' },
        { ref: 'ContrastSlider', selector: 'slider#ContrastSlider' },
        { ref: 'HueSlider', selector: 'slider#HueSlider' },
        { ref: 'SaturationSlider', selector: 'slider#SaturationSlider' },

        { ref: 'HorizontalBlurSlider', selector: 'slider#HorizontalBlurSlider' },
        { ref: 'VerticalBlurSlider', selector: 'slider#VerticalBlurSlider' },

        { ref: 'RedSlider', selector: 'slider#RedSlider' },
        { ref: 'GreenSlider', selector: 'slider#GreenSlider' },
        { ref: 'BlueSlider', selector: 'slider#BlueSlider' },

        { ref: 'image', selector: '#OriginalPhoto' },
        { ref: 'canvas', selector: '#ModifiedPhoto' }
    ],

    init: function () {
        this.stage = null;
        this.bmp = null;
        this.colorMatrix = null;
        this.imageFilters = {};

        this.control({
            'slider#BrightnessSlider': { change : this.onSliderChange },
            'slider#ContrastSlider': { change: this.onSliderChange },
            'slider#HueSlider': { change: this.onSliderChange },
            'slider#SaturationSlider': { change: this.onSliderChange },

            'slider#HorizontalBlurSlider': { change: this.onSliderChange },
            'slider#VerticalBlurSlider': { change: this.onSliderChange },

            'slider#RedSlider': { change: this.onSliderChange },
            'slider#GreenSlider': { change: this.onSliderChange },
            'slider#BlueSlider': { change: this.onSliderChange },

            '#OriginalPhoto': { imageready: this.imageReady } //custom event
        });
    },

    imageReady: function () {
        var canvas = this.getCanvas().el.down('canvas').dom;
        var img = this.getImage().el.dom;

        this.stage = new createjs.Stage(canvas);
        this.bmp = new createjs.Bitmap(img);

        this.bmp.scaleX = this.bmp.scaleY = 1;
        this.bmp.cache(0, 0, canvas.width, canvas.height, 0.5); //50% of the original resolution... speeds up the processing

        this.stage.addChild(this.bmp);

        this.applyEffect();

        this.getShareButton().enable();
    },

    onSliderChange: function (slider, newValue, thumb, eOpts) {
        //prevent the sliders from functioning until the image is present
        if (!this.stage || !this.bmp) { return false; }

        this.applyEffect();
    },

    applyEffect : function () {
        var brightnessValue = this.getBrightnessSlider().getValue();
        var contrastValue =  this.getContrastSlider().getValue();
        var saturationValue =  this.getSaturationSlider().getValue();
        var hueValue = this.getHueSlider().getValue();

        //var blurXValue = this.getHorizontalBlurSlider().getValue();
        //var blurYValue = this.getVerticalBlurSlider().getValue();

        var redChannelvalue = this.getRedSlider().getValue();
        var greenChannelValue = this.getGreenSlider().getValue();
        var blueChannelValue = this.getBlueSlider().getValue();

        this.colorMatrix = new createjs.ColorMatrix();
        this.colorMatrix.adjustColor(brightnessValue, contrastValue, saturationValue, hueValue);

        this.imageFilters = [
            new createjs.ColorMatrixFilter(this.colorMatrix),
            //new createjs.BoxBlurFilter(blurXValue, blurYValue, 2),
            new createjs.ColorFilter(redChannelvalue / 255, 1, 1, 1),
            new createjs.ColorFilter(1, greenChannelValue / 255, 1, 1),
            new createjs.ColorFilter(1, 1, blueChannelValue / 255, 1)
        ];

        this.updateImage();
    },

    updateImage : function () {
        this.bmp.filters = this.imageFilters;
        this.bmp.updateCache();
        this.stage.update();
    }
});