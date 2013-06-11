Ext.define('SenchaCon.controller.Share', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.listen({
            global: {
                'datarequested' : this.shareCanvasImage
            }
        });
    },

    getImageDataFromCanvas : function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        var img = canvas.toDataURL("image/png");      // Get the data as an image.
        return img.substr(22);
    },

    shareStaticFile : function (e) {
        var request = e.request;
        request.data.properties.title = "SenchaCon wants to share...";
        request.data.properties.description = "Art's really cool SenchaCon session!";

        var reference = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(SenchaCon.app.photo);
        request.data.properties.thumbnail = reference;
        request.data.setBitmap(reference);
    },

    shareCanvasImage : function (e) {
        var request = e.request;
        var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
        var deferral = request.getDeferral();

        // create an html fragment
        var safeHtml = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(
            "<div><img src='shareImage.png' /></div>"
        );

        var imgData = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(
            this.getImageDataFromCanvas()
        );

        var memoryStream = new Windows.Storage.Streams.InMemoryRandomAccessStream();
        var dataWriter = new Windows.Storage.Streams.DataWriter(memoryStream);
        dataWriter.writeBuffer(imgData);

        dataWriter.storeAsync().done(function () {

            dataWriter.flushAsync().done(function () {
                var imgStream = dataWriter.detachStream();
                imgStream.seek(0);
                var streamReference = Windows.Storage.Streams.RandomAccessStreamReference.createFromStream(imgStream);

                dataPackage.resourceMap["shareImage.png"] = streamReference;

                dataPackage.setHtmlFormat(safeHtml);

                request.data = dataPackage;
                request.data.properties.title = "SenchaCon wants to share...";
                request.data.properties.description = "Art's really cool SenchaCon session!";

                deferral.complete();
            });
        });

    }
});