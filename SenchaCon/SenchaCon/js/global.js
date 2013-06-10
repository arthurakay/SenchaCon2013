var shareDataHandler = function (e) {
    console.log('shareDataHandler...');

    var request = e.request;
    var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
    var deferral = request.getDeferral();

    // create an html fragment
    var safeHtml = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(
        "<div><img src='shareImage.png' /></div>"
    );

    var imgData = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(
        getImageDataFromCanvas()
    );

    var memoryStream = new Windows.Storage.Streams.InMemoryRandomAccessStream();
    var dataWriter = new Windows.Storage.Streams.DataWriter(memoryStream);
    dataWriter.writeBuffer(imgData);

    dataWriter.storeAsync().done(function () {
        console.log('storeAsync...');

        dataWriter.flushAsync().done(function () {
            console.log('flushAsync...');

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

};

var getImageDataFromCanvas = function () {
    console.log('getImageDataFromCanvas');

    var canvas = document.getElementsByTagName("canvas")[0];
    var img = canvas.toDataURL("image/png");      // Get the data as an image.
    return img.substr(22);
};

if (Windows.ApplicationModel) {
    console.log('Setting datarequested event handler...');
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    dtm.addEventListener("datarequested", shareDataHandler);
}