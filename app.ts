const imagesButtons = document.getElementsByClassName('themeButton')

const flip = document.getElementById('flip') as HTMLElement

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const c = canvas?.getContext("2d") as CanvasRenderingContext2D

const field1 = document.getElementById('textField1') as HTMLInputElement;
const field2 = document.getElementById('textField2') as HTMLInputElement;

const canvasContainer = document.querySelector('.canvas-container') as HTMLDivElement;

const IMG_PATH = "./img/canvas-bg/"

const IMAGES: {
  eating: any;
  train: any;
  water: any;
  run: any;
} = {
  eating: {},
  train: {},
  water: {},
  run: {}
}

function confImages() {
  for (let item in IMAGES) {
    IMAGES[item] = {
      setup: new Image(),
      end: new Image()
    }
    IMAGES[item].setup.src = IMG_PATH + item + "/setup.png"
    IMAGES[item].end.src = IMG_PATH + item + "/end.png"
  }
}

confImages()

IMAGES.eating.setup.onload = () => {
  // c!.filter = "blur(.5px)"
  // c?.drawImage(IMAGES?.eating?.setup, 0, 0, canvas.width, canvas.height/2)
  c.fillStyle = "black"
  c.fillRect(0, canvas.height / 2 - 1, canvas.width, 2)
}

type Meme = {
  setup: string;
  end: string;
}

field1.addEventListener('input', () => {
  canvasContainer.children[0].innerHTML = field1.value
})

field2.addEventListener('input', () => {
  canvasContainer.children[1].innerHTML = field2.value
})

function changeTheme(value: string | undefined) {
  let canvasCont = canvasContainer as HTMLElement

  if (typeof value === "string") {
    // console.log(canvasContainer.style.backgroundImage = `url("${IMAGES[value].setup.src}"), url("${IMAGES[value].end.src}")`)
    let url1 = `url("${IMAGES[value].setup.src}")`
    let url2 = `url("${IMAGES[value].end.src}")`
    let result = canvasCont.dataset.flip === "true" ? url2.concat(","+url1) : url1.concat(","+url2)
    canvasContainer.style.backgroundImage = result
    return true
  }
  return false
}

function removeActives(exception: number) {
  for (let i = 0; i < imagesButtons.length; i++) {
    if (i !== exception) {
      let item = imagesButtons[i] as HTMLElement
      item.classList.remove('active')
    }
  }
}

function getActive(): string | undefined {
  for (let i = 0; i < imagesButtons.length; i++) {
    let item = imagesButtons[i] as HTMLElement
    if (item.classList.contains('active')) return item.dataset.value
    continue
  }
  return
}

for (let i = 0; i < imagesButtons.length; i++) {
  let item = imagesButtons[i] as HTMLElement
  item.addEventListener('click', () => {
    if (changeTheme(item.dataset.value)) {
      item.classList.add('active')
      removeActives(i)
    }
  })
}

flip.addEventListener('click', () => {
  let item = canvasContainer as HTMLElement
  (item.dataset.flip === "true") ? item.dataset.flip = "false" : item.dataset.flip = "true"
  changeTheme(getActive())
})