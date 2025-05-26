let video;
let poseNet;
let poses = [];
let circleX = 200;
let circleY = 200;

function setup() {
  createCanvas(400, 400);

  // 啟用視訊鏡頭
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 啟用 PoseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function modelLoaded() {
  console.log('PoseNet 已載入');
}

function draw() {
  background(220);

  // 顯示視訊
  image(video, 0, 0, width, height);

  // 繪製紅色圓圈
  fill(255, 0, 0);
  noStroke();
  ellipse(circleX, circleY, 50);

  // 偵測手勢並移動圓圈
  detectGesture();
}

function detectGesture() {
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // 偵測鼻子的位置
    let nose = pose.nose;

    // 如果鼻子的信心度高於 0.5，讓圓圈跟著鼻子移動
    if (nose.confidence > 0.5) {
      circleX = nose.x;
      circleY = nose.y;
    }
  }
}
