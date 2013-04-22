var shareDataHandler = function (e) {
    var request = e.request;
    request.data.properties.title = "SenchaCon wants to share...";
    request.data.properties.description = "Art's really cool SenchaCon session!";

    var reference = Windows.Storage.Streams.RandomAccessStreamReference.createFromFile(SenchaCon.file);
    request.data.properties.thumbnail = reference;

    request.data.setBitmap(reference);
    //request.data.setText("Hello world!"); //TODO: does this do anything?
};

if (Windows.ApplicationModel) {
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    dtm.addEventListener("datarequested", shareDataHandler);
}