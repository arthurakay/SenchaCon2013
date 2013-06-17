Ext.define('SenchaCon.controller.Share', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.listen({
            global: {
                'datarequested': this.shareCanvasImage
            }
        });
    },

    getImageDataFromCanvas : function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        var img = canvas.toDataURL("image/png");      // Get the data as an image.
        return img.substr(22);
    },

    shareCanvasImage : function (e) {
        var request = e.request;
        var deferral = request.getDeferral();

        var imgData = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(
            this.getImageDataFromCanvas()
        );

        Windows.Storage.KnownFolders.picturesLibrary.createFileAsync("transfer.png", Windows.Storage.CreationCollisionOption.replaceExisting).done(
            function (file) {
                Windows.Storage.FileIO.writeBufferAsync(file, imgData).done(function () {
                    var streamReference = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(file);

                    request.data.properties.title = "SenchaCon wants to share...";
                    request.data.properties.description = "Art's really cool SenchaCon session!";
                    request.data.properties.thumbnail = streamReference;

                    request.data.setStorageItems([file]);
                    request.data.setBitmap(streamReference);

                    deferral.complete();
                });
            }
        );
    }
});