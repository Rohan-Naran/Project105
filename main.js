Webcam.set({
    width:250,
    height:250,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById('camera');
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("selfie").innerHTML = '<img id="captured_image" style="height:100%; width:100%;" src="'+data_uri+'"/>';
    });
};

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dFuQAbCrD/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!');
}

function identify_img(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    } else {
        console.log(results );
        if(results[0].label == "Class 1"){
            document.getElementById('myBar').style.width = (results[0].confidence*100) + '%';
            document.getElementById('myBar2').style.width = (results[1].confidence*100) + '%';
        } else if(results[0].label == "Class 2"){
            document.getElementById('myBar2').style.width = (results[0].confidence*100) + '%';
            document.getElementById('myBar1').style.width = (results[1].confidence*100) + '%';
        }
    }
}