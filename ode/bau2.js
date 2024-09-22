
function generateGridPoints(n,w,h){
	const points = [];
  let [x,y]=[0,0]; 
  //space n points evenly within rectangle w x h
  let [cols,rows]=[Math.ceil(Math.sqrt(n)),Math.floor(Math.sqrt(n))];
  let [xSpacing,ySpacing]=[w/(cols-1),h/(rows-1)];
  for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
      x=j*xSpacing;
      y=i*ySpacing;
      points.push({x:Math.round(x),y:Math.round(y)});
    }
  }
  return points;
}
function lacunaGenerateFenPoints(n, nColors, w = 1000, h = 1000, rand = .8) {
  let pts = generateGridPoints(n,w,h); //generateRandomPointsRound(n, w, h, rand);
  return pts.map(p => `${p.x}_${p.y}_${rChoose(range(nColors))}`); //.join(' ');
}




