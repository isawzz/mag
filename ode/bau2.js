
function cloneImage(img, targetDiv, x, y, w, h) {
  const clonedImage = img.cloneNode();
  clonedImage.style.position = 'absolute';
  clonedImage.style.left = `${x}px`;
  clonedImage.style.top = `${y}px`;
  clonedImage.style.width = `${w}px`;
  clonedImage.style.height = `${h}px`;

  targetDiv.appendChild(clonedImage);
}
function cropImage(imageUrl,d) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    d.appendChild(canvas);
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let isCropping = false;
    let startX, startY, endX, endY;

    canvas.addEventListener('mousedown', (e) => {
      isCropping = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isCropping) {
        endX = e.offsetX;
        endY = e.offsetY;
        drawCropRect();
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (isCropping) {
        isCropping = false;
        cropImage();
      }
    });

    function drawCropRect() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }

    function cropImage() {
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = endX - startX;
      croppedCanvas.height = endY - startY;
      const croppedCtx = croppedCanvas.getContext('2d');
      croppedCtx.drawImage(img, startX, startY, endX - startX, endY - startY, 0, 0, endX - startX, endY - startY);

      const link = document.createElement('a');
      link.download = 'cropped_image.png';
      link.href = croppedCanvas.toDataURL('image/png');
      link.click();
    }
  };
  img.src = imageUrl;
}
function drawPointType(dParent, p, addLabel = true) {
  let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : '';
  addKeys({ sz: 20, bg: rColor(), id:getUID() }, p);
  let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
  d1.style.cursor = 'default';
  if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
  let rect = getRect(d1);
  p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
  p.xPage = rect.x; p.yPage = rect.y;
  p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
	return p;
}
function loadAndDivideImage(imageUrl,dParent) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgWidthThird = img.width / 3;
    const imgHeightThird = img.height / 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subCanvas = document.createElement('canvas');
        subCanvas.width = imgWidthThird;
        subCanvas.height = imgHeightThird;
        const subCtx = subCanvas.getContext('2d');
        subCtx.drawImage(img, i * imgWidthThird, j * imgHeightThird, imgWidthThird, imgHeightThird, 0, 0, imgWidthThird, imgHeightThird);

        // Do something with the subCanvas, e.g., add it to the DOM:
        dParent.appendChild(subCanvas);
      }
    }
  };
  img.src = imageUrl;
}
async function preloadImages(imageUrls) {
  const promises = imageUrls.map(async (url) => {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  });

  return await Promise.all(promises);
}


