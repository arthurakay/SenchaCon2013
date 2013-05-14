var shareDataHandler = function (e) {
    var request = e.request;
    request.data.properties.title = "SenchaCon wants to share...";
    request.data.properties.description = "Art's really cool SenchaCon session!";

    var reference = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(SenchaCon.file);
    request.data.properties.thumbnail = reference;

    //request.data.setBitmap(reference);
    //request.data.setText("Hello world!"); //TODO: does this do anything?

    var deferral = request.getDeferral();

    // create an html fragment
    var safeHtml = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(
        "<div><img src='shareImage.png' /></div>"
    );

    // You can uncomment this line (and comment the above) to see a whole flow of converting a canvas to an image.
    var imgData = Windows.Security.Cryptography.CryptographicBuffer.decodeFromBase64String(
        getImageDataFromCanvas()
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
            deferral.complete();
        });
    });

};

var getImageDataFromCanvas = function () {
    var canvas1 = document.getElementById("MyCanvas");
    var myImage = canvas1.toDataURL("image/png");      // Get the data as an image.
    return myImage.substr(22);
};

if (Windows.ApplicationModel) {
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    dtm.addEventListener("datarequested", shareDataHandler);
}