WinJS.Namespace.define('SenchaCon', {
    file: null
});

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

var shareData = function () {
    var canvas = document.getElementById('imageCanvas'),
        img = canvas.toDataURL("image/png");

    SenchaCon.file = img;

    Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
};

//WinRT Camera API
var capturePhoto = function () {
    var canvas = document.getElementById('imageCanvas'),
        ctx = canvas.getContext('2d'),
        img = document.getElementById('imageImg');

    try {
        var dialog = new Windows.Media.Capture.CameraCaptureUI();
        var aspectRatio = {
            width: 16,
            height: 9
        };

        dialog.photoSettings.croppedAspectRatio = aspectRatio;
        dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(
            function (file) {
                if (file) {
                    var imgUrl = URL.createObjectURL(file, { oneTimeOnly: true });
                    img.src = imgUrl;
                    
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        img.onload = null;
                    };

                    img.src = imgUrl;

                } else {
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
};