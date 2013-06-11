(function () {
    "use strict";

    var page = WinJS.UI.Pages.define("/default.html", {
        ready: function (element, options) {
            console.log('page control ready, loading dataTransfer object...');
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", dataRequested);
        },
        unload: function () {
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.removeEventListener("datarequested", dataRequested);
        }
    });

    var getImageDataFromCanvas = function () {
        console.log('getImageDataFromCanvas');

        var canvas = document.getElementsByTagName("canvas")[0];
        var img = canvas.toDataURL("image/png");
        return img.substr(22);
    };

    function dataRequested(e) {
        console.log('in dataRequested...');

        var request = e.request;
        var deferral = request.getDeferral();

        var imgData = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(
            getImageDataFromCanvas()
        );

        Windows.Storage.KnownFolders.picturesLibrary.createFileAsync("tranfer.png", Windows.Storage.CreationCollisionOption.replaceExisting).done(
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
    };

})();