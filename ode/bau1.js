
async function lacunaOnclick(ev) {
  //console.log('lacunaOnclick',B.counter++);//,ev.target);
  let linesActivated = B.linesActivated = getActivatedLines(B.lines);
  console.log('linesActivated', linesActivated);
  B.selectedPoints = [];

  if (linesActivated.length == 1) {
    //grab these points and finish move
    B.selectedPoints.push(linesActivated[0].p1.id);
    B.selectedPoints.push(linesActivated[0].p2.id);
		let res = await lacunaMoveComplete(B.selectedPoints); console.log('res',res);
  }
  animateEndpointsOfActivatedLines(linesActivated)


}















