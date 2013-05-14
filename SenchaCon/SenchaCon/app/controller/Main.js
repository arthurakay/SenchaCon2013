Ext.define('SenchaCon.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'image',
            selector: '#OriginalPhoto'
        },

        {
            ref: 'canvas',
            selector: '#ModifiedPhoto'
        }
    ],

    init: function () {
        this.control({
            'button#TakePhoto': {
                'click' : this.takePhoto
            },

            'button#SharePhoto': {
                'click': this.sharePhoto
            },

            //TODO: handlers to resize the canvas element
            '#ModifiedPhoto': {
                'resize': this.resizeCanvas
            }
        });
    },

    takePhoto: function (button, e, opts) {
        var img = this.getImage();

        try {
            //WinRT Camera API
            var dialog = new Windows.Media.Capture.CameraCaptureUI();
            var aspectRatio = {
                width: 16,
                height: 9
            };

            dialog.photoSettings.croppedAspectRatio = aspectRatio;
            dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(
                function (file) {
                    if (file) {
                        var imgUrl = URL.createObjectURL(file, { oneTimeOnly: true }),
                            imgDom = img.el.dom;

                        imgDom.onload = function () {
                            img.fireEvent('imageready');
                            imgDom.onload = null;
                        };

                        img.setSrc(imgUrl);
                    }
                    else {
                        //No Photo captured
                    }
                },
                function (err) {
                    console.log('async error');
                }
            );
        }
        catch (err) {
            console.log('Error caught: ' + err);
        }
    },

    sharePhoto: function (button, e, opts) {
        var canvas = this.getCanvas().el.down('canvas').dom,
            img = this.getImage();

        //TODO: this needs to be an actual file?
        SenchaCon.file = img.el.src;

        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    },

    resizeCanvas : function(thisComp, width, height, oldWidth, oldHeight, eOpts) {
        var canvas = thisComp.el.down('canvas').dom;

        canvas.width = width;
        canvas.height = height;
    }
});