
function getSetOfDifferentTypesOfPoints(points) {
  let types = new Set(); for (const p of points) types.add(p.type); return types;
}
function logMinMax(fenPoints){
	//output min x, max x, min y max y from points
	let xValues = fenPoints.map(p => parseInt(p.split('_')[0]));
	let yValues = fenPoints.map(p => parseInt(p.split('_')[1]));
	let minX = Math.min(...xValues);
	let maxX = Math.max(...xValues);
	let minY = Math.min(...yValues);
	let maxY = Math.max(...yValues);
	console.log('Min X:', minX);
	console.log('Max X:', maxX);
	console.log('Min Y:', minY);
	console.log('Max Y:', maxY);

}
function showBox(d, x, y) {
  let sz = rNumber(10, 50);
  mDom(d, { w: sz, h: sz, bg: 'red', position: 'absolute', left: x, top: y });
}















