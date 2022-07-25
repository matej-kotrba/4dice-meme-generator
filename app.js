var imagesButtons = document.getElementsByClassName('themeButton');
var flip = document.getElementById('flip');
var canvas = document.getElementById('canvas');
var c = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var field1 = document.getElementById('textField1');
var field2 = document.getElementById('textField2');
var canvasContainer = document.querySelector('.canvas-container');
var IMG_PATH = "./img/canvas-bg/";
var IMAGES = {
    eating: {},
    train: {},
    water: {},
    run: {}
};
function confImages() {
    for (var item in IMAGES) {
        IMAGES[item] = {
            setup: new Image(),
            end: new Image()
        };
        IMAGES[item].setup.src = IMG_PATH + item + "/setup.png";
        IMAGES[item].end.src = IMG_PATH + item + "/end.png";
    }
}
confImages();
IMAGES.eating.setup.onload = function () {
    // c!.filter = "blur(.5px)"
    // c?.drawImage(IMAGES?.eating?.setup, 0, 0, canvas.width, canvas.height/2)
    c.fillStyle = "black";
    c.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);
};
field1.addEventListener('input', function () {
    canvasContainer.children[0].innerHTML = field1.value;
});
field2.addEventListener('input', function () {
    canvasContainer.children[1].innerHTML = field2.value;
});
function changeTheme(value) {
    var canvasCont = canvasContainer;
    if (typeof value === "string") {
        // console.log(canvasContainer.style.backgroundImage = `url("${IMAGES[value].setup.src}"), url("${IMAGES[value].end.src}")`)
        var url1 = "url(\"".concat(IMAGES[value].setup.src, "\")");
        var url2 = "url(\"".concat(IMAGES[value].end.src, "\")");
        var result = canvasCont.dataset.flip === "true" ? url2.concat("," + url1) : url1.concat("," + url2);
        canvasContainer.style.backgroundImage = result;
        return true;
    }
    return false;
}
function removeActives(exception) {
    for (var i = 0; i < imagesButtons.length; i++) {
        if (i !== exception) {
            var item = imagesButtons[i];
            item.classList.remove('active');
        }
    }
}
function getActive() {
    for (var i = 0; i < imagesButtons.length; i++) {
        var item = imagesButtons[i];
        if (item.classList.contains('active'))
            return item.dataset.value;
        continue;
    }
    return;
}
var _loop_1 = function (i) {
    var item = imagesButtons[i];
    item.addEventListener('click', function () {
        if (changeTheme(item.dataset.value)) {
            item.classList.add('active');
            removeActives(i);
        }
    });
};
for (var i = 0; i < imagesButtons.length; i++) {
    _loop_1(i);
}
flip.addEventListener('click', function () {
    var item = canvasContainer;
    (item.dataset.flip === "true") ? item.dataset.flip = "false" : item.dataset.flip = "true";
    changeTheme(getActive());
});
