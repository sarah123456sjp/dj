music=""
function preload()
 {
 music=loadSound("music.mp3")
 music2=loadSound("shenzhen.mp3")
}
var wristright=0
var wristleft=0
var wristXright=0
var wristYright=0
var wristXleft=0
var wristYleft=0
var music_status=""
var music2_status=""
function setup() {
 canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on("pose",gotposes)
}
function modelLoaded() {
console.log("Modelo Carregado"); 
}
function gotposes(results) {
if (results.length>0) {
wristright=results[0].pose.keypoints[10].score
wristleft=results[0].pose.keypoints[9].score
wristXright=results[0].pose.rightWrist.x
wristXleft=results[0].pose.leftWrist.x
wristYright=results[0].pose.rightWrist.y
wristYleft=results[0].pose.leftWrist.y
    }
}
function draw() {
image(video,0,0,600,500) 
music_status=music.isPlaying()
music2_status=music2.isPlaying()
fill("blue")
stroke("black")
if (wristright>0.2) {
circle(wristXright,wristYright,20)
music2.stop()
if (music_status==false) {
music.play()
document.getElementById("song").innerHTML="fur elise"
}
if (wristYright>0 && wristYright<100) {
    document.getElementById("speed").innerHTML="Velocidade= 0.5"
    music.rate(0.5)
}else if (wristYright>100 && wristYright<200) {
    document.getElementById("speed").innerHTML="Velocidade=1.0"
    music.rate(1.0)
}
}
if (wristleft>0.2) {
    circle(wristXleft,wristYleft,20)
    music.stop()
if (music2_status==false) {
music2.play()
document.getElementById("song").innerHTML="shenzhen"
}
    numero= Number(wristYleft)
    becy=floor(numero)
    volume=numero/500
    document.getElementById("volume").innerHTML="volume= "+volume
    music.setVolume(volume)
    }
}
function play() {
music.play()
music.setVolume(1)
music.rate()
}