let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#faedcd');

  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始攝影機影像

  // 建立與攝影機畫面相同大小的圖形
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 設定背景顏色
  background('#faedcd');

  // 計算影像的顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色

  // 翻轉 graphics 的內容
  graphics.push();
  graphics.translate(graphics.width, 0); // 將原點移到右上角
  graphics.scale(-1, 1); // 水平翻轉 graphics 畫布

  for (let i = 0; i < capture.width; i += 20) {
    for (let j = 0; j < capture.height; j += 20) {
      // 從攝影機影像中取顏色
      let col = capture.get(i, j);
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓形
    }
  }

  graphics.pop(); // 恢復 graphics 的狀態

  // 翻轉畫布以水平翻轉影像
  push();
  translate(width, 0); // 將原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height);
  pop();

  // 在攝影機畫面上方顯示圖形
  image (graphics, (width - graphics.width) / 2, (height - graphics.height) / 2); // 將圖形顯示在攝影機畫面上方，並留 10px 間距
}

function windowResized() {
  // 當視窗大小改變時，調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}


