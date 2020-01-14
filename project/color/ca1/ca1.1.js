let colorLeft = [];
let colorRight = [];
let colorPick = [];
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
    movex: 156,
    movey: 180,
    moveflagx: 38,
    moveflagy: 65,
    blendmode: 'source-over'
};

let gui;
let folder;
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



function setup() {
    colorMode(RGB, 100);
    createCanvas(2000, 2000);
    console.log('save');
    console.log(BLEND);
    miniCanvas = createGraphics(1240, 1754); // Grab an image of a 100x200 rectangle at (20,30).

    noStroke();
    miniCanvas.noStroke();


    //##################################
    //start//datgui//
    //##################################
    gui = new dat.GUI();
    let folder1 = gui.addFolder('Color Changer')
    folder1.addColor(optionsMenu, "color");
    folder1.addColor(optionsMenu, "color2");
    let folder2 = gui.addFolder('Rect move')
    folder2.add(optionsMenu, "movex", 0, 400, 1);
    folder2.add(optionsMenu, "movey", 0, 460, 1);
    folder2.add(optionsMenu, "moveflagx", 0, 300, 1);
    folder2.add(optionsMenu, "moveflagy", 0, 380, 1); //class, "name", min, max, step
    let folder3 = gui.addFolder('Blend Mode :)');
    folder3.add(optionsMenu, "blendmode", blendModes);
    //##################################
    //end//datgui//
    //##################################


}

function draw() {

    miniCanvas.background(backgroundCol);

    miniCanvas.fill(color(1, 1, 1, 5));

    miniCanvas.rect(0, 0, 1240, 1754);


    //##################################
    //start//COLOR GRADIENT BAR//
    //##################################
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
    //##################################
    //end//COLOR GRADIENT BAR//
    //##################################

    //##################################
    //start//DRAW SHAPES//
    //##################################
    //test rect 1
    miniCanvas.fill(color(optionsMenu.color));
    miniCanvas.rect(optionsMenu.moveflagx, (optionsMenu.moveflagy), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 80, (optionsMenu.moveflagy + 20), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 160, (optionsMenu.moveflagy), 60, 200);
    miniCanvas.rect(optionsMenu.moveflagx + 240, (optionsMenu.moveflagy + 20), 60, 200);


    //##################################
    //end//DRAW SHAPES//
    //##################################

    //##################################
    //start//blendmodes//
    //##################################
    //test rect 2
    miniCanvas.blendMode(optionsMenu.blendmode);
    miniCanvas.fill(color(optionsMenu.color2));

    miniCanvas.rect(optionsMenu.movex, (optionsMenu.movey), 200, 20);
    miniCanvas.blendMode(BLEND);

    //##################################
    //end//blendmodes//
    //##################################
    keepOpen();

    image(miniCanvas, 0, 200)
}

function keepOpen() {
    if (!!document.querySelector('.closed')) {
        document.querySelector('.closed').classList.remove('closed'); //keep menu open on load
    }
}


function mousePressed() {

}

function keyPressed() {
    if (key === 's' || key === 'S') {
        backgroundCol = [255, 255, 255];
        save(miniCanvas, "saved_name.png");
        backgroundCol = [250, 250, 250];
    }
}


function colorPickFunction() {
    colorPick = 0;
}