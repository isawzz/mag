
function lacunaGenerateFenPoints(n,nColors,w=1000,h=1000,rand=.8){
	let pts=generateRandomPointsRound(n,w,h,rand);
	return pts.map(p=>`${p.x}_${p.y}_${rChoose(range(nColors))}`).join(' ');
}
function generateRandomPointsRound(n, w, h, rand = 0.8) {
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5));
	const points = [];
	for (let i = 1; i < n + 1; i++) {
		const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * rand / 4;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle);
		let y = rady + distance * rady * Math.sin(angle);
		points.push({ x: Math.round(x), y: Math.round(y) });
	}
	return points;
}



