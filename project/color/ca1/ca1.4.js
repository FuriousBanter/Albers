//tasks: clean up and bookcover production



let colorLeft = [];
let colorRight = [];

let colorPickFunction;
let colorPick;
let f1color1;
let f1color2;

let strokeLatch = 0;
let strokeLatch2 = 0; //stop repositioning x,y origin
//##################################
//start//draw vars//
//##################################
let drawShapeX1;
let drawShapeY1;
let drawShapeX2;
let drawShapeY2;
let drawShapeW;
let drawShapeH;
let shapes = [];
let shapesRedo = [];
let shapeColor;

let drawLock = 0;

let shapeOriginPosX;
let shapeOriginPosY;
let lastShapePoint;

let lastShape = [];
let lastColor;

//shapes
let selectShape = ["square", "ellipse"];
let currentShape;
// let lastShape;
let NextShape;
//##################################
//end//draw vars//
//##################################

let boxes = []; //array of box arrays
let box = []; //array of boxes in a row 
let numCol = 8;
let miniCanvas;
let numRow = 1;
let blendModes = ["source-over", "lighter", "darken", "lighten", "difference", "exclusion", "multiply", "overlay"] //let user flick between different modes for the color blending of shapes.
//add = lighter, darkest = darken, lightest = lighten, difference = difference, exclusion = exclusion, multiply ==, overlay ==.
let optionsMenu = {
    color: [255, 0, 0, 255],
    color2: [255, 0, 0, 255],
    blendmode: 'source-over',

    png: function () {

        //shape

        backgroundCol = [255, 255, 255];
        //##################################
        //start//ALBERS//
        //##################################
        push();
        miniCanvas.fill(0);
        miniCanvas.textSize(70);
        textFont('Aerial');
        miniCanvas.text("Josef Albers: Colors", 310, 700);

        miniCanvas.fill(0, 0, 0, 20);
        miniCanvas.rect(0, 540, 1244, 300);
        pop();
        //##################################
        //end//ALBERS//
        //##################################

        save(miniCanvas, "image", "png");


        backgroundCol = [250, 250, 250];

    },

    jpg: function () {


        //shape
        backgroundCol = [255, 255, 255];
        //##################################
        //start//ALBERS//
        //##################################
        push();
        miniCanvas.fill(0);
        miniCanvas.textSize(70);
        textFont('Aerial');
        miniCanvas.text("Josef Albers: Colors", 310, 700);

        miniCanvas.fill(0, 0, 0, 20);
        miniCanvas.rect(0, 540, 1244, 300);
        pop();
        //##################################
        //end//ALBERS//
        //##################################

        save(miniCanvas, "image", "jpeg");


        backgroundCol = [250, 250, 250];

    },

    rawPng: function () {


        //shape
        backgroundCol = [255, 255, 255];
        save(miniCanvas, "image", "png");
        backgroundCol = [250, 250, 250];

    }

};

let gui;
let folder;
let picker1;
let picker2;


let backgroundCol = [250, 250, 250];

//##################################
//start//CLASS FOR GRADIENT BOX//
//##################################
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
//##################################
//end//CLASS FOR GRADIENT BOX//
//##################################

//##################################
//start//CLASS FOR SHAPE//
//##################################
class Shape {
    constructor(name, x, y, w, h, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color

    }
}
//##################################
//end//CLASS FOR SHAPE//
//##################################



function setup() {
    currentShape = "square";
    colorMode(RGB, 100);
    createCanvas(1240, 1954);
    miniCanvas = createGraphics(1240, 1754); // Grab an image of a 100x200 rectangle at (20,30).
    noStroke();
    miniCanvas.noStroke();


    //##################################
    //start//datgui//
    //##################################
    gui = new dat.GUI();
    let folder1 = gui.addFolder('Color Changer')
    picker1 = folder1.addColor(optionsMenu, "color").listen();
    picker2 = folder1.addColor(optionsMenu, "color2").listen();
    let folder3 = gui.addFolder('Blend Mode');
    folder3.add(optionsMenu, "blendmode", blendModes);
    let folder4 = gui.addFolder('Save: ');
    folder4.add(optionsMenu, "png").name('png');
    folder4.add(optionsMenu, "jpg").name('jpeg');
    folder4.add(optionsMenu, "rawPng").name('Raw Png');
    //##################################
    //end//datgui//
    //##################################


}

if (strokeLatch == 1) {

    strokeWeight(4);
    stroke(0);
    noFill();
    miniCanvas.rect(shapeOriginPosX, shapeOriginPosY, Math.floor(mouseX), Math.floor(mouseY - 200));


}

function draw() {
    background(255, 255, 255);
    if (mouseX < 1240 && (mouseY < 1754) && (mouseY > 200)) {
        cursor(CROSS);
    } else {
        cursor(ARROW)
    }
    push();
    miniCanvas.strokeWeight(2);
    miniCanvas.stroke(240);
    miniCanvas.fill(backgroundCol);
    miniCanvas.rect(0, 0, 1240, 1754);
    pop();
    miniCanvas.noStroke();

    //##################################
    //start//COLOR GRADIENT BAR//
    //##################################
    for (let i = 0; i < 2; i++) { //leftright rows
        for (let j = 0; j < 8; j++) { //updown cols
            let squareColor = lerpColor(color(optionsMenu.color), color(optionsMenu.color2), map(j, 0, 7, 0, 1));

            let square = new ColorBox("colorbox " + j + "," + i, 50, 50, j * 50, i * 50, squareColor);
            box[j] = square;

            fill(squareColor);
            rect(j * 50, i * 50, 50, 50);

        }
        boxes[i] = box;
        boxes[i][i].color = color(255);
    }
    //##################################
    //start//INSTRUCTIONS//
    //##################################
    textSize(18);
    fill(0, 0, 0);
    text('<= Color Picker', 410, 30);
    text("Mode:", 600, 30);
    fill(0);
    text('Instructions:\nq: stop drawing\ne: start drawing\n[: Square Mode\n]: Ellipse Mode', 410, 60);
    rect(670, 30, 100, 100);
    ellipse(770, 130, 100, 100);
    if (currentShape == "square") {
        push();
        strokeWeight(2);
        stroke(0);
        fill(200, 200, 200);
        rect(670, 30, 100, 100);
        pop();
    }
    if (currentShape == "ellipse") {
        push();
        strokeWeight(2);
        stroke(0);
        fill(200, 200, 200);
        ellipse(770, 130, 100, 100);
        pop();
    }
    textSize(12);
    text('To change the color, select a color in the GUI on the right.\nColor 1 = Left click, Color 2 = Right click\n\nTo select a color inbetween colors 1 and 2, click a color in the color picker\nbox with left or right click respectivly\n\nSelect Blend mode type from GUI\n\nTo save: Select your image type in the GUI', 850, 30);
    //##################################
    //end//INSTRUCTIONS//
    //##################################



    mouseClicked = (mouse) => {

    }


    //##################################
    //end//COLOR GRADIENT BAR//
    //##################################
    textSize(18);
    fill(0, 0, 0);
    text("current xPos: ", 10, 140);
    text("current yPos: ", 200, 140);
    if (drawLock == 1) {
        text("Drawing: off", 10, 180);
    }
    if (drawLock == 0) {
        text("Drawing: on", 10, 180);
    }

    if ((Math.floor(mouseY) > 200) && (Math.floor(mouseX) > 0) && (Math.floor(mouseX) <= 1240)) {
        text('current xPos: ' + Math.floor(mouseX), 10, 140);
        text('current yPos: ' + (Math.floor(mouseY) - 200), 200, 140);
    }


    //##################################
    //start//DRAW SHAPES//
    //##################################


    for (let s = 0; s < shapes.length; s++) { //draw shape arrays
        push();
        miniCanvas.blendMode(optionsMenu.blendmode);
        miniCanvas.fill(color(shapes[s].color));
        if (currentShape == "square") {
            miniCanvas.rect(shapes[s].x, shapes[s].y, shapes[s].w, shapes[s].h);
        }

        if (currentShape == "ellipse") {

            miniCanvas.ellipse(shapes[s].x + (shapes[s].w / 2), shapes[s].y + (shapes[s].h / 2), shapes[s].w, shapes[s].h);
        }
        miniCanvas.blendMode(BLEND);
        pop();

    }

    //##################################
    //start//DRAW SHAPE GUIDE//
    //##################################
    push();
    if ((strokeLatch == 1) && ((mouseX < 1240) && (mouseX > 0) && (mouseY < 1954) && (mouseY > 200))) { //1240, 1954

        miniCanvas.strokeWeight(4);
        miniCanvas.stroke(0);
        miniCanvas.noFill();

        if (currentShape == "ellipse") {
            miniCanvas.ellipse(shapeOriginPosX + (((Math.floor(mouseX)) - shapeOriginPosX) / 2), shapeOriginPosY + ((((Math.floor(mouseY - 200))) - shapeOriginPosY) / 2), ((Math.floor(mouseX)) - shapeOriginPosX), ((Math.floor(mouseY - 200))) - shapeOriginPosY);

        }
        if (currentShape == "square") {
            miniCanvas.rect(shapeOriginPosX, shapeOriginPosY, ((Math.floor(mouseX)) - shapeOriginPosX), ((Math.floor(mouseY - 200))) - shapeOriginPosY);
        }




    }
    pop();
    //##################################
    //end//DRAW SHAPE GUIDE//
    //##################################
    keepOpen();


    image(miniCanvas, 0, 200)
}

function keepOpen() {
    if (!!document.querySelector('.closed')) {
        document.querySelector('.closed').classList.remove('closed'); //keep menu open on load
    }
}

mousePressed = () => {
    shapeOriginPosX = Math.floor(mouseX);
    shapeOriginPosY = Math.floor(mouseY - 200);
    strokeLatch = 1;
    shapesRedo = [];
    drawShapeX1 = mouseX;
    drawShapeY1 = mouseY - 200;
    shapeOrigin = [mouseX, mouseY];
}


//##################################
//start//CREATE SHAPE OBJ//
//##################################
mouseReleased = (mous) => {



    if ((Math.floor(mouseY) < 200) && (Math.floor(mouseX) > 0) && (Math.floor(mouseX) < 500)) {
        if ((Math.floor(mouseX) < 50) && (Math.floor(mouseX) > 0)) {
            colorPick = boxes[0][0].color.levels;
        }
        if ((Math.floor(mouseX) < 100) && (Math.floor(mouseX) > 50)) {
            colorPick = [boxes[0][1].color.levels[0], boxes[0][1].color.levels[1], boxes[0][1].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 150) && (Math.floor(mouseX) > 100)) {
            colorPick = [boxes[0][2].color.levels[0], boxes[0][2].color.levels[1], boxes[0][2].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 200) && (Math.floor(mouseX) > 150)) {
            colorPick = [boxes[0][3].color.levels[0], boxes[0][3].color.levels[1], boxes[0][3].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 250) && (Math.floor(mouseX) > 200)) {
            colorPick = [boxes[0][4].color.levels[0], boxes[0][4].color.levels[1], boxes[0][4].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 300) && (Math.floor(mouseX) > 250)) {
            colorPick = [boxes[0][5].color.levels[0], boxes[0][5].color.levels[1], boxes[0][5].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 350) && (Math.floor(mouseX) > 300)) {
            colorPick = [boxes[0][6].color.levels[0], boxes[0][6].color.levels[1], boxes[0][6].color.levels[2]];
        }
        if ((Math.floor(mouseX) < 400) && (Math.floor(mouseX) > 350)) {
            colorPick = [boxes[0][7].color.levels[0], boxes[0][7].color.levels[1], boxes[0][7].color.levels[2]];
        }

        if (mous.which == 1) {
            picker1.setValue(colorPick);
            picker1.updateDisplay();


        } else if (mous.which == 3) {
            picker2.setValue(colorPick);
            picker2.updateDisplay();
        }
    }


    shapeOriginPosX = 0;
    shapeOriginPosY = 0;
    miniCanvas.noStroke();
    strokeLatch = 0;
    drawShapeX2 = mouseX;
    drawShapeY2 = (mouseY - 200);

    drawShapeW = drawShapeX2 - drawShapeX1;
    drawShapeH = drawShapeY2 - drawShapeY1;

    if (mous.which == 1) {
        shapeColor = color(optionsMenu.color);
    } else if (mous.which == 3) {
        shapeColor = color(optionsMenu.color2);
    }


    if (drawLock == 0) {

        let shape = new Shape(currentShape + "  " + "x1: " + drawShapeX1 + " x2: " + drawShapeX2 + ", y1: " + drawShapeY1 + " y2: ", drawShapeX1, drawShapeY1, drawShapeW, drawShapeH, shapeColor);
        shapes.push(shape);
    }
}

//##################################
//end//CREATE SHAPE OBJ//
//##################################


//##################################
//end//DRAW SHAPES//
//##################################

function keyTyped() {

    if (key === 'q') {
        drawLock = 1;
    }

    if (key === 'e') {
        drawLock = 0;
    }

    if ((key === 'u') && shapes.length !== 0) {
        shapesRedo.push(
            shapes.pop()
        );
        miniCanvas.background(255);
    }

    if ((key === 'r') && (shapesRedo.length !== 0)) {
        shapes.push(
            shapesRedo.pop()
        );
        miniCanvas.background(255);
    }

    if (keyCode === 91) {
        currentShape = "square";
    }

    if (keyCode === 93) {
        currentShape = "ellipse";
    }
}