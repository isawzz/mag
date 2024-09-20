
function clearDiv(dParent, styles = {}, opts = {}) {
  if (nundef(dParent)) dParent = document.body;
  addKeys({ className: 'h100', hline: 0 }, styles);
  addKeys({ html: '&nbsp;' }, opts);
  dParent.innerHTML = '';
  return mDom(dParent, styles, opts);
}
function mColFlex(dParent, chflex = [1, 5, 1], bgs) {
  let styles = { opacity: 1, display: 'flex', aitems: 'stretch', 'flex-flow': 'nowrap' };
  mStyle(dParent, styles);
  let res = [];
  for (let i = 0; i < chflex.length; i++) {
    let bg = isdef(bgs) ? bgs[i] : null;
    let d1 = mDiv(dParent, { flex: chflex[i], bg: bg });
    res.push(d1);
  }
  return res;
}



