
function lacunaStartMove() {
	lockForLengthyProcess();
	let t = getNow();
	h = { meeples: B.meeples, dParent: B.dParent, points: B.points, sz: B.sz };

	let [points, dParent, sz] = [B.points, B.dParent, B.sz];
	let result = findIsolatedPairs(points, sz*1.2); //console.log(result);

	//console.log('isolated', showPairs(result.isolatedPairs), result.isolatedPairs.length);
	let isolated = B.isolatedPairs = filterIsolatedPairs(result.isolatedPairs, B.meeples, 15);
	//console.log('isolated', showPairs(isolated), isolated.length);

	t = showTimeSince(t, 'vor generateHotspots')

	let [hotspots, linesByPair] = generateHotspots(dParent, isolated, sz, 'transparent');

	B.hotspots=hotspots;
	B.linesByPair = linesByPair;
	B.pairs = linesByPair; //console.log(B.pairs)
	B.hotspotList = hotspots;
	B.hotspotDict = list2dict(hotspots, 'id');

	dParent.onmousemove = highlightHotspots;
	dParent.onclick = placeYourMeepleME;
	t = showTimeSince(t, 'move');
	unlock();
}



