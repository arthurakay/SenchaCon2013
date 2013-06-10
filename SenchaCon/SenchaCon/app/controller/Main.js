Ext.define('SenchaCon.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        { ref: 'image', selector: '#OriginalPhoto' },
        { ref: 'canvas', selector: '#ModifiedPhoto' },
        { ref: 'shareButton', selector: 'button#SharePhoto' }
    ],

    init: function () {
        this.control({
            'button#TakePhoto': { 'click' : this.takePhoto },

            'button#SharePhoto': { 'click': this.sharePhoto },

            'button#PhotoLibrary' : { 'click' : this.getPhotoFromLibrary },

            //TODO: handlers to resize the canvas element
            '#ModifiedPhoto': { 'resize': this.resizeCanvas }
        });
    },

    takePhoto: function (button, e, opts) {
        //var img = this.getImage();
        //img.setSrc('/resources/flowers_small.jpg');
        //img.fireEvent('imageready');

        var me = this,
            img = me.getImage();

        try {
            //WinRT Camera API
            var dialog = new Windows.Media.Capture.CameraCaptureUI();
            var aspectRatio = {
                width: 16,
                height: 9
            };

            dialog.photoSettings.croppedAspectRatio = aspectRatio;
            dialog.photoSettings.maxResolution = Windows.Media.Capture.CameraCaptureUIMaxPhotoResolution.smallVga;

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

                        me.getShareButton().enable();
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
        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    },

    resizeCanvas : function(thisComp, width, height, oldWidth, oldHeight, eOpts) {
        var canvas = thisComp.el.down('canvas').dom;

        canvas.width = width;
        canvas.height = height;
    },

    getPhotoFromLibrary: function () {
        var me = this;
        var picker = Windows.Storage.Pickers.FileOpenPicker();

        // Which file types will we be showing?
        picker.fileTypeFilter.append(".jpg");
        picker.fileTypeFilter.append(".gif");
        picker.fileTypeFilter.append(".png");

        // Grab the selected folder, reference as 'folder'
        picker.pickSingleFileAsync().then(function (file) {
            var img = me.getImage(),
                imgDom = img.el.dom;

            imgDom.onload = function () {
                img.fireEvent('imageready');
                imgDom.onload = null;
            };

            img.setSrc(URL.createObjectURL(file, { oneTimeOnly: true }));

            me.getShareButton().enable();
        });
    }
});