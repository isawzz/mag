
async function lacunaPresent() {
	//this is prelims
  await loadStarImages();

	//this is setup
  let [n, nTypes] = [14, 1]; //types soll < 9 sein
  let fenPoints = lacunaGenerateFenPoints(n, nTypes, 1000, 1000, 0); logMinMax(fenPoints);

	//this is present
  B = {};
  let d1 = mDom(document.body,{hline:0,margin:0},{html:'&nbsp;'});
  let [w, h, margin, padding, border] = [500, 500, 20, 30, 8]; //25;
  // let d=mDom(d1, {border:`${border}px solid #555`,wbox:true, position:'relative', w,h, bg: '#242430', margin, padding, round:true, className:'lensBorder'}, { id: 'dCanvas' });
  let d=mDom(d1, {border:`${border}px solid #555`,wbox:true, position:'relative', w,h, bg: '#242430', margin, padding}, { id: 'dCanvas' });

  let sz = 30;
  let points = [];
  for (const p of fenPoints) {
    let p1 = pointFromFenRaw(p); // console.log(p1);
    p1.x = mapRange(p1.x, 0, 1000, 0, w);
    p1.y = mapRange(p1.y, 0, 1000, 0, h);
    p1 = pointAddMargin(p1, padding);
    drawPointStar(p1,d,sz);
    points.push(p1);
    //p1 = drawPoint(dParent, p1);
  }
  B.diPoints = list2dict(points, 'id');
  console.log(points[0], getSetOfDifferentTypesOfPoints(points));
  B.obstacleThreshold = 10; B.triggerThreshold = 8;
  let result = findIsolatedPairs(points, 'type', B.obstacleThreshold); //je groesser threshold umso mehr obstacles werden detected!
  let pairs = result.isolatedPairs;

  let pair = pairs[0]; //console.log(pairs)

  //drawInteractiveLine(pair[0],pair[1],'white',1); return;

  let lines = []; B.lines = lines;
  pairs.map(pair => lines.push({ p1: pair[0], p2: pair[1], div: drawInteractiveLine(d, pair[0], pair[1], 'lightblue', 1) })); //rColor(), 1)));
  d.onmousemove = onMouseMoveLine;

  B.counter = 0;
  B.meeples = [];
  //d.onclick = lacunaOnclick;
  //for some reason geht das onclick  auf d nicht immer!
  document.onclick = placeYourMeeple; // ()=>console.log('click',B.counter++)


  //console.log(lines[0]);


}















