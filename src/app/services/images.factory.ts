
export const ImageProcessor = () => {
function scaleImageData(imageData, origW, origH, scale) {
    let newW = Math.round(scale*origW);
    let newH = Math.round(scale*origH);
    let scaled = new Uint8ClampedArray(newW*newH*4);
  
    for(let row = 0; row < origH; row++) {
      for(let col = 0; col < origW; col++) {
        let sourcePixel = [
          imageData[(row * origW + col) * 4 + 0],
          imageData[(row * origW + col) * 4 + 1],
          imageData[(row * origW + col) * 4 + 2],
          imageData[(row * origW + col) * 4 + 3]
        ];
        for(let y = 0; y < scale; y++) {
          let destRow = row * scale + y;
          for(let x = 0; x < scale; x++) {
            let destCol = col * scale + x;
            for(let i = 0; i < 4; i++) {
              scaled[(destRow * newW + destCol) * 4 + i] =
                sourcePixel[i];
            }
          }
        }
      }
    }
    return scaled;
  }


 function getImageData(element) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage( element, 0, 0 );
  
    const w = element.width;
    const h=element.height;
    const imgdata = ctx.getImageData(0,0,w,h);
    return imgdata;
  }
  
  let data = getImageData(document.getElementById("image"));
  
  const scale = 3;
  const newWidth = Math.round(data.width*scale);
  const newHeight = Math.round(data.height*scale);
  const scaled = scaleImageData(data.data, data.width, data.height, scale);
  
  const canvas = document.getElementById("scaled");
  (<any>canvas).width = newWidth;
  (<any>canvas).height = newHeight;
  const ctx = (<any>canvas).getContext('2d');
  
  ctx.putImageData(
      new ImageData(scaled, newWidth, newHeight ),
      0,0
  );
}