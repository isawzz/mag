
function lacunaGenerateFenPoints(n, nColors, w = 1000, h = 1000, rand = .8) {
  let pts = generateGridPoints(n,w,h,rand); //generateRandomPointsRound(n, w, h, rand);
  return pts.map(p => `${p.x}_${p.y}_${rChoose(range(nColors))}`); //.join(' ');
}
function generateGridPoints(n,w,h,rand){
	return generateRandomPointsRect(n,w,h,0);
}