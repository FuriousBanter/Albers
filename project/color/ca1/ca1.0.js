let colorLeft = [];
let colorRight = [];
let colorPick = [];
let boxes = []; //array of box arrays
let box = []; //array of boxes in a row 
let numCol = 8;
let numRow = 1;
let optionsMenu = {
  color: [255, 0, 0, 255],
  color2: [255, 0, 0, 255],
  move: 80
};
let gui;
let folder;

class ColorBox {
  constructor(name, height, width, x, y, color) {
    this.name = name;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;

  }
}

function setup() {
  colorMode(RGB, 100);
  createCanvas(1000, 1000);
  rect(0, 200, 600, 600);
  noStroke();
  shakeColors();

  gui = new dat.GUI();
  let folder1 = gui.addFolder('Color Changer')
  folder1.addColor(optionsMenu, "color");
  folder1.addColor(optionsMenu, "color2");
  let folder2 = gui.addFolder('Rect move')
  folder2.add(optionsMenu, "move", 0, 400, 1);


}

function draw() {
  background(100, 100, 100);


  for (let i = 0; i < 2; i++) { //leftright rows
    for (let j = 0; j < 8; j++) { //updown cols
      let squareColor = lerpColor(color(optionsMenu.color), color(optionsMenu.color2), map(j, 0, 7, 0, 1));
      // let squareColor = color(i+3.98, i+3.98, i+3.98, map(j, 0, 7, 0, 1));
      let square = new ColorBox("colorbox " + j + "," + i, 50, 50, j * 50, i * 50, squareColor);
      box[j] = square;

      fill(squareColor);
      // console.log(boxes);
      rect(j * 50, i * 50, 50, 50);

    }
    boxes[i] = box;
    boxes[i][i].color = color(255);
  }

  //test rect 1
  fill(color(optionsMenu.color));
  rect(40, (200 + 60), 60, 200);
  rect(40 + 80, (200 + 80), 60, 200);
  rect(40 + 160, (200 + 60), 60, 200);
  rect(40 + 240, (200 + 80), 60, 200);

  //test rect 2
  blendMode(MULTIPLY);
  fill(color(optionsMenu.color2));

  rect(optionsMenu.move, (200 + 120), 200, 20);
  blendMode(BLEND);

}

function mousePressed() {

}

function colorPickFunction() {
  colorPick = 0;
}

function shakeColors() {

  let k = mouseX / (width / 2);
  for (let k = 0; k <= numRow; k++) {
    colorLeft[k] = color(random(k, random(255), random(255)));
    colorRight[k] = color(random(k), random(255), random(255));
  }
}