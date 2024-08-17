var Session = {};
var Clientdata = {};
const BLUE = '#4363d8';
const BRAUN = '#331606';
const BROWN = '#96613d';
const CORNERS = ['◢', '◣', '◤', '◥'];
const DEF_ORIENTATION = 'v';
const DEF_SPLIT = 0.5;
const FIREBRICK = '#800000';
const GREEN = '#3cb44b';
const BLUEGREEN = '#004054';
const GT = {};
const img = document.createElement('img')
const LIGHTBLUE = '#42d4f4';
const LIGHTGREEN = '#afff45';
const MyNames = ['amanda', 'angela', 'erin', 'holly', 'jan', 'karen', 'kelly', 'pam', 'phyllis', 'andy', 'creed', 'darryl', 'david', 'dwight', 'felix', 'gul', 'jim', 'kevin', 'luis', 'michael', 'nil', 'oscar', 'ryan', 'stanley', 'toby', 'wolfgang'];
const names = ['felix', 'amanda', 'sabine', 'tom', 'taka', 'microbe', 'dwight', 'jim', 'michael', 'pam', 'kevin', 'darryl', 'lauren', 'anuj', 'david', 'holly'];
const OLIVE = '#808000';
const ORANGE = '#f58231';
const NEONORANGE = '#ff6700';
const PURPLE = '#911eb4';
const RED = '#e6194B';
const stage = {
  width: 0,
  height: 0,
}
const ARI = {
  sz_hand: 7,
  stage: {
    1: 'journey',
    2: 'tax',
    3: 'auto market',
    4: 'stall selection',
    1004: 'TEST_starts_in_stall_selection_complete',
    5: 'action: command',
    6: 'action step 2',
    7: 'action 3',
    8: 'action 4',
    9: 'action 5',
    10: 'end game?',
    11: 'ball',
    12: 'auction: bid',
    13: 'auction: buy',
    14: 'complementing_market_after_church',
    15: 'commission',
    16: 'commission new',
    17: 'church',
    18: 'church_minplayer_tithe',
    19: 'church_newcards',
    20: 'payment action',
    21: 'church_minplayer_tithe_add',
    22: 'church_minplayer_tithe_downgrade',
    23: 'comm_weitergeben',
    24: 'rumors_weitergeben',
    25: 'rumor',
    26: 'blackmail',
    blackmail: 26,
    27: 'inspect',
    rumor: 25,
    28: 'buy rumor',
    'buy rumor': 28,
    29: 'rumor discard',
    30: 'pick luxury or journey cards',
    31: 'add new journey',
    32: 'rumor_both',
    33: 'blackmail_owner',
    34: 'accept_blackmail',
    35: 'blackmail_complete',
    36: 'reject_blackmail',
    37: 'commission_stall',
    38: 'pick_schwein',
    40: 'trade',
    41: 'build',
    42: 'visit',
    43: 'buy',
    44: 'upgrade',
    45: 'downgrade',
    46: 'visit destroy',
    build: 41,
    upgrade: 44,
    downgrade: 45,
    visit: 42,
    buy: 43,
    100: 'pickup end',
    101: 'build end',
    102: 'select building to upgrade',
    103: 'select downgrade cards',
    104: 'next_comm_setup_stage',
    105: 'next_rumor_setup_stage',
  }
};
const STYLE_PARAMS = {
  acontent: 'align-content',
  aitems: 'align-items',
  align: 'text-align',
  aspectRatio: 'aspect-ratio',
  bg: 'background-color',
  dir: 'flex-direction',
  family: 'font-family',
  fg: 'color',
  fontSize: 'font-size',
  fz: 'font-size',
  gridCols: 'grid-template-columns',
  gridRows: 'grid-template-rows',
  h: 'height',
  hgap: 'column-gap',
  hmin: 'min-height',
  hmax: 'max-height',
  hline: 'line-height',
  jcontent: 'justify-content',
  jitems: 'justify-items',
  justify: 'justify-content',
  matop: 'margin-top',
  maleft: 'margin-left',
  mabottom: 'margin-bottom',
  maright: 'margin-right',
  origin: 'transform-origin',
  overx: 'overflow-x',
  overy: 'overflow-y',
  patop: 'padding-top',
  paleft: 'padding-left',
  pabottom: 'padding-bottom',
  paright: 'padding-right',
  place: 'place-items',
  rounding: 'border-radius',
  valign: 'align-items',
  vgap: 'row-gap',
  w: 'width',
  wmin: 'min-width',
  wmax: 'max-width',
  weight: 'font-weight',
  x: 'left',
  xover: 'overflow-x',
  y: 'top',
  yover: 'overflow-y',
  z: 'z-index'
};
const TEAL = '#469990';
const YELLOW = '#ffe119';
const NEONYELLOW = '#efff04';
const YELLOW2 = '#fff620';
const levelColors = [LIGHTGREEN, LIGHTBLUE, YELLOW, 'orange', RED, GREEN, BLUE, PURPLE, YELLOW2, 'deepskyblue',
  'deeppink', TEAL, ORANGE, 'seagreen', FIREBRICK, OLIVE,
  '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000', 'gold', 'orangered', 'skyblue', 'pink', 'deeppink',
  'palegreen', '#e6194B'];
const YELLOW3 = '#ffed01';
const ColorDict = {
  black: { c: 'black', E: 'black', D: 'schwarz' },
  blue: { c: 'blue', E: 'blue', D: 'blau' },
  BLUE: { c: '#4363d8', E: 'blue', D: 'blau' },
  BLUEGREEN: { c: BLUEGREEN, E: 'bluegreen', D: 'blaugrün' },
  blue1: { c: BLUE, E: 'blue', D: 'blau' },
  BRAUN: { c: BRAUN, E: 'brown', D: 'braun' },
  BROWN: { c: BROWN, E: 'brown', D: 'braun' },
  brown: { c: BRAUN, E: 'brown', D: 'braun' },
  deepyellow: { c: YELLOW3, E: 'yellow', D: 'gelb' },
  FIREBRICK: { c: '#800000', E: 'darkred', D: 'rotbraun' },
  gold: { c: 'gold', E: 'gold', D: 'golden' },
  green: { c: 'green', E: 'green', D: 'grün' },
  GREEN: { c: '#3cb44b', E: 'green', D: 'grün' },
  green1: { c: GREEN, E: 'green', D: 'grün' },
  grey: { c: 'grey', E: 'grey', D: 'grau' },
  lightblue: { c: LIGHTBLUE, E: 'lightblue', D: 'hellblau' },
  LIGHTBLUE: { c: '#42d4f4', E: 'lightblue', D: 'hellblau' },
  lightgreen: { c: LIGHTGREEN, E: 'lightgreen', D: 'hellgrün' },
  LIGHTGREEN: { c: '#afff45', E: 'lightgreen', D: 'hellgrün' },
  lightyellow: { c: YELLOW2, E: 'lightyellow', D: 'gelb' },
  olive: { c: OLIVE, E: 'olive', D: 'oliv' },
  OLIVE: { c: '#808000', E: 'olive', D: 'oliv' },
  orange: { c: ORANGE, E: 'orange', D: 'orange' },
  ORANGE: { c: '#f58231', E: 'orange', D: 'orange' },
  pink: { c: 'deeppink', E: 'pink', D: 'rosa' },
  purple: { c: PURPLE, E: 'purple', D: 'lila' },
  PURPLE: { c: '#911eb4', E: 'purple', D: 'lila' },
  red: { c: 'red', E: 'red', D: 'rot' },
  RED: { c: '#e6194B', E: 'red', D: 'rot' },
  red1: { c: RED, E: 'red', D: 'rot' },
  skyblue: { c: 'deepskyblue', E: 'skyblue', D: 'himmelblau' },
  teal: { c: TEAL, E: 'teal', D: 'blaugrün' },
  TEAL: { c: '#469990', E: 'teal', D: 'blaugrün' },
  violet: { c: 'indigo', E: 'violet', D: 'violett' },
  white: { c: 'white', E: 'white', D: 'weiss' },
  yellow: { c: 'yellow', E: 'yellow', D: 'gelb' },
  YELLOW: { c: '#ffe119', E: 'yellow', D: 'gelb' },
  YELLOW2: { c: YELLOW2, E: 'yellow', D: 'gelb' },
  YELLOW3: { c: YELLOW3, E: 'yellow', D: 'gelb' },
};
var _audioSources = {
  incorrect1: '../base/assets/sounds/incorrect1.wav',
  incorrect3: '../base/assets/sounds/incorrect3.mp3',
  goodBye: "../base/assets/sounds/level1.wav",
  down: "../base/assets/sounds/down.mp3",
  levelComplete: "../base/assets/sounds/sound1.wav",
  rubberBand: "../base/assets/sounds/sound2.wav",
  hit: "../base/assets/sounds/hit.wav",
  mozart: "../base/assets/music/mozart_s39_4.mp3",
};
var _idleSound = true;
var _qSound;
var _sndPlayer;
var A;
var activatedTests = [];
var aiActivated;
var Animation1;
var AREAS = {};
var auxOpen;
var Badges = [];
var BlockServerSend1 = false;
var ByGroupSubgroup;
var C = null;
var c52;
var C52;
var C52Cards;
var Categories;
var Cinno;
var ColorDi;
var Config;
var Counter = { server: 0 };
var CURRENT_CHAT_USER = "";
var CURRENT_GAME = "";
var C = null;
var DA = {};
var dActions;
var DB;
var dButtons;
var dContent;
var DELAY = 1000;
var dError;
var dFleetingMessage;
var dGameTitle;
var Dictionary;
var dInstruction;
var dLeiste;
var dLevel;
var dMenu;
var dMiddle;
var dOben;
var dParent;
var draggedElement;
var dragStartOffset;
var dRechts;
var dropPosition = 'none';
var dTable;
var dTitle;
var FenPositionList;
var FORCE_REDRAW = false;
var FRUIDCounter = -1;
var G = null;
var GAME = 'ttt';
var Info;
var Items = {};
var KeySets;
var levelKeys = ['island', 'justice star', 'materials science', 'mayan pyramid', 'medieval gate', 'great pyramid', 'meeple', 'smart', 'stone tower', 'trophy cup', 'viking helmet',
  'flower star', 'island', 'justice star', 'materials science', 'mayan pyramid',];
var M = {};
var Markers = [];
var nMissing;
var OnTimeOver = null;
var Options = {};
var P;
var percentageCorrect;
var Pictures = [];
var PL;
var Q;
var QContextCounter = 0;
var S = {};
var Sayings;
var Score;
var Selected;
var SERVER = 'localhost';
var Serverdata = {};
var Settings;
var STOPAUS = false;
var symbolDict;
var SymKeys;
var Syms;
var T;
var TESTING = false;
var TimeElapsed;
var TimeElem;
var TimeLeft;
var TimestampStarted;
var TO = {};
var TOFleetingMessage;
var TOList;
var TOMain;
var TOMan;
var TOSound;
var TOTicker;
var TOTrial;
var trialNumber;
var U = null;
var UI = {};
var uiActivated = false;
var UID = 0;
var UIDCounter = 0;
var USELIVESERVER = false;
var Username;
var WhichCorner = 0;
var WordP;
var Z;
var Zones = {};
class SimpleTimer {
  constructor(elem, msTick, onTick, msTotal, onElapsed) {
    this.elem = elem;
    this.msTotal = this.msLeft = msTotal;
    this.onTick = onTick;
    this.onElapsed = onElapsed;
    this.interval = msTick;
    this.running = false;
    this.paused = false;
    this.TO = null;
  }
  clear() { let elapsed = this.stop(); clearElement(this.elem); return elapsed; }
  continue() {
    if (!this.running) this.start();
    else if (!this.paused) return;
    else { this.paused = false; this.TO = setInterval(this.tickHandler.bind(this), this.interval); }
  }
  output() {
    this.elem.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'msh');
  }
  pause() {
    if (this.paused || !this.running) return;
    clearInterval(this.TO);
    this.paused = true;
  }
  tickHandler() {
    this.msLeft -= this.interval;
    this.msElapsed = this.msTotal - this.msLeft;
    this.output();
    if (isdef(this.onTick)) this.onTick();
    if (this.msLeft <= 0) {
      this.stop();
      this.msLeft = 0;
      if (isdef(this.onElapsed)) {
        this.onElapsed(0);
      }
    }
  }
  togglePause() { if (this.paused) this.continue(); else this.pause(); }
  start() {
    if (this.running) this.stop();
    this.started = new Date().now;
    this.msLeft = this.msTotal;
    this.msElapsed = 0;
    this.running = true;
    this.output();
    this.TO = setInterval(this.tickHandler.bind(this), this.interval);
  }
  stop() {
    if (!this.running) return;
    clearInterval(this.TO);
    this.TO = null;
    this.running = false;
    return this.msLeft;
  }
}
function _calc_hex_col_array(rows, cols) {
  let colarr = [];
  let even = rows % 2 == 0;
  for (let i = 0; i < rows; i++) {
    colarr[i] = cols;
    if (even && i < (rows / 2) - 1) cols += 1;
    else if (even && i > rows / 2) cols -= 1;
    else if (!even && i < (rows - 1) / 2) cols += 1;
    else if (!even || i >= (rows - 1) / 2) cols -= 1;
  }
  return colarr;
}
function _cloneIfNecessary(value, optionsArgument) {
  var clone = optionsArgument && optionsArgument.clone === true
  return (clone && _isMergeableObject(value)) ? deepmerge(_emptyTarget(value), value, optionsArgument) : value
}
function _deepMerge(target, source, optionsArgument) {
  var array = Array.isArray(source);
  var options = optionsArgument || { arrayMerge: _defaultArrayMerge }
  var arrayMerge = options.arrayMerge || _defaultArrayMerge
  if (array) {
    return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : _cloneIfNecessary(source, optionsArgument)
  } else {
    return _mergeObject(target, source, optionsArgument)
  }
}
function _defaultArrayMerge(target, source, optionsArgument) {
  var destination = target.slice()
  source.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = _cloneIfNecessary(e, optionsArgument)
    } else if (_isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(_cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}
function _deqSound() {
  let key = _qSound.shift();
  let url = _audioSources[key];
  _sndPlayer = new Audio(url);
  _sndPlayer.onended = _whenSoundPaused;
  _sndPlayer.onloadeddata = () => { _loaded = true; _sndPlayer.play(); };
  _sndPlayer.load();
}
function _emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}
function _isMergeableObject(val) {
  var nonNullObject = val && typeof val === 'object'
  return nonNullObject
    && Object.prototype.toString.call(val) !== '[object RegExp]'
    && Object.prototype.toString.call(val) !== '[object Date]'
}
function _mergeObject(target, source, optionsArgument) {
  var destination = {}
  if (_isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = _cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach(function (key) {
    if (!_isMergeableObject(source[key]) || !target[key]) {
      destination[key] = _cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = _deepMerge(target[key], source[key], optionsArgument)
    }
  })
  return destination;
}
function _overwriteMerge(destinationArray, sourceArray, options) { return sourceArray }
function _poll() {
  if (nundef(U) || nundef(Z) || nundef(Z.friendly)) { console.log('poll without U or Z!!!', U, Z); return; }
  show_polling_signal();
  if (nundef(DA.pollCounter)) DA.pollCounter = 0; DA.pollCounter++; console.log('polling');
  if (Z.game == 'feedback' && i_am_host()) {
    send_or_sim({ friendly: Z.friendly, uname: Z.uplayer, fen: Z.fen, write_fen: true, auto: true }, 'table');
  } else send_or_sim({ friendly: Z.friendly, uname: Z.uplayer, auto: true }, 'table');
}
function _simpleOptions(options = {}, defsOuter = {}) {
  options.showPic = valf(options.showPic, isdef(options.fzPic));
  options.showLabels = isdef(options.fz);
  options.szPic = { w: options.w, h: options.h };
  options.fzText = options.fz;
  if (nundef(options.rounding)) options.rounding = 4;
  if (nundef(options.margin)) options.margin = 4;
  if (nundef(options.padding)) options.padding = 0;
  if (nundef(options.labelStyles)) options.labelStyles = {};
  if (options.showLabels) { if (nundef(options.labelPos)) options.labelBottom = true; options.labelStyles.fz = options.fzText; }
  options.picStyles = { fz: options.fzPic };
  let [w, h] = [options.szPic.w, options.szPic.h];
  options.outerStyles = {
    w: w, h: h, bg: options.bg, fg: options.fg,
    display: 'inline-flex', 'flex-direction': 'column',
    'justify-content': 'center', 'align-items': 'center', 'vertical-align': 'top',
    padding: 0, box: true, margin: options.margin, rounding: options.rounding,
  };
  if (isdef(defsOuter)) addKeys(defsOuter, options.outerStyles);
  return options;
}
function _start_game(gamename, players, options) { }
function _whenSoundPaused() {
  _sndPlayer = null;
  _sndPlayerIdle = true;
  _loaded = false;
  if (!isEmpty(_qSound)) { _deqSound(); } else { _idleSound = true; }
}
function a_game() {
  function state_info(dParent) { dParent.innerHTML = `turn: ${Z.turn}, stage:${Z.stage}`; }
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [] };
    shuffle(fen.plorder);
    let starter = fen.starter = fen.plorder[0];
    let cards_needed = players.length * options.handsize * 1.4;
    fen.num_decks = Math.ceil(cards_needed / 52);
    fen.deck = create_fen_deck('n', fen.num_decks, 0);
    shuffle(fen.deck);
    let [i, n, diff] = [0, players.length, get_slot_diff(fen)];
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(fen.deck, options.handsize),
        score: 0,
        name: plname,
        color: get_user_color(plname),
        slot: diff * i,
      };
      i++;
    }
    [fen.phase, fen.stage, fen.step, fen.turn] = ['', 'click', 0, [starter]];
    return fen;
  }
  function present() { present_a_game(); }
  function check_gameover() { return false; }
  function activate_ui() {
    activate_a_game();
  }
  function post_collect() { agmove_resolve(); }
  return { post_collect, state_info, setup, present, check_gameover, activate_ui };
}
function activate_a_game() {
  if (Z.stage == 'click') {
    show_MMM('back to normal!!!!');
    mButton('single turn move', agmove_single, dTable, { margin: 20 });
    mButton('clear players', agmove_clear_all, dTable, { margin: 20 });
    mButton('clear first', agmove_clear_first, dTable, { margin: 20 });
  } else if (Z.stage == 'clear') {
    agmove_startmulti();
  } else {
    mButton('indiv move', agmove_indiv, dTable, { margin: 20 });
  }
}
function activate_playerstats(items) {
  let fen = Z.fen;
  for (const plname in fen.players) {
    let ui = items[plname];
    let d = iDiv(ui);
    d.onclick = () => { switch_uname(plname); onclick_reload(); }
  }
}
function activate_ui() {
  if (uiActivated) { DA.ai_is_moving = false; return; }
  uiActivated = true; DA.ai_is_moving = false;
}
function add_card_to_group(card, oldgroup, oldindex, targetcard, targetgroup) {
  card.groupid = targetgroup.id;
  if (card.source == 'hand') {
    let hand = UI.players[Z.uplayer].hand;
    removeInPlace(hand.items, card);
  }
  card.source = 'group';
  mDroppable(iDiv(card), drop_card_fritz, dragover_fritz);
  if (nundef(targetcard)) {
    targetgroup.ids.push(card.id);
    mAppend(iDiv(targetgroup), iDiv(card));
  } else {
    let index = targetgroup.ids.indexOf(targetcard.id) + 1;
    targetgroup.ids.splice(index, 0, card.id);
    mClear(iDiv(targetgroup));
    for (let i = 0; i < targetgroup.ids.length; i++) {
      let c = Items[targetgroup.ids[i]];
      mAppend(iDiv(targetgroup), iDiv(c));
    }
  }
  resplay_container(targetgroup);
}
function add_new_user(udata, save = true) {
  console.log('WILL NOT ADD NEW USERS AT THIS TIME!!!', udata); return;
  console.assert(isDict(udata) && isdef(udata.name) && isString(udata.name) && udata.name.length < 50, 'CANNOT ADD THIS WEIRED USER ' + udata.name);
  DB.users[udata.name] = udata;
  if (save) db_save();
  return udata;
}
function add_transaction(cmd) {
  if (!DA.simulate) start_transaction();
  DA.transactionlist.push(cmd);
}
async function add_users_to_sql_db(not_in_sql_db) { to_server(not_in_sql_db, 'add_users'); }
function addAREA(id, o) {
  if (AREAS[id]) {
    error('AREAS ' + id + ' exists already!!! ');
    error(o);
    return;
  }
  AREAS[id] = o;
}
function addBadge(dParent, level, clickHandler, animateRubberband = false) {
  let fg = '#00000080';
  let textColor = 'white';
  let isText = true; let isOmoji = false;
  let i = level - 1;
  let key = levelKeys[i];
  let k = replaceAll(key, ' ', '-');
  let item = getItem(k);
  let label = item.label = "level " + i;
  let h = window.innerHeight;
  let sz = h / 14;
  let options = _simpleOptions({ w: sz, h: sz, fz: sz / 4, fzPic: sz / 2, bg: levelColors[i], fg: textColor });
  options.handler = clickHandler;
  let d = makeItemDiv(item, options);
  mAppend(dParent, d);
  item.index = i;
  badges.push(item);
  return arrLast(badges);
}
function addIf(arr, el) { if (!arr.includes(el)) arr.push(el); }
function addKeys(ofrom, oto) { for (const k in ofrom) if (nundef(oto[k])) oto[k] = ofrom[k]; return oto; }
function aggregate_elements(list_of_object, propname) {
  let result = [];
  for (let i = 0; i < list_of_object.length; i++) {
    let obj = list_of_object[i];
    let arr = obj[propname];
    for (let j = 0; j < arr.length; j++) {
      result.push(arr[j]);
    }
  }
  return result;
}
function aggregate_player_hands_by_rank(fen) {
  let di_ranks = {};
  let akku = [];
  for (const uname in fen.players) {
    let pl = fen.players[uname];
    let hand = pl.hand;
    for (const c of hand) {
      akku.push(c);
      let r = c[0];
      if (isdef(di_ranks[r])) di_ranks[r] += 1; else di_ranks[r] = 1;
    }
  }
  fen.akku = akku;
  return di_ranks;
}
function agmove_clear_all() { Z.stage = 'clear'; Z.fen.endcond = 'all'; Z.fen.acting_host = Z.uplayer; Z.turn = [Z.uplayer]; take_turn_clear(); }
function agmove_clear_first() { Z.stage = 'clear'; Z.fen.endcond = 'first'; Z.fen.acting_host = Z.uplayer; Z.turn = [Z.uplayer]; take_turn_clear(); }
function agmove_indiv(plname, slot) {
  if (isDict(plname) && Z.uplayer != 'mimi') return;
  if (isString(plname)) Z.uplayer = plname;
  console.log('sender:', Z.uplayer);
  let pl = Z.fen.players[Z.uplayer];
  Z.state = { val: pl.hand[0] };
  if (nundef(slot)) slot = busy_wait_until_slot(pl.slot);
  console.log('time sending:', slot, Date.now());
  take_turn_collect_open();
  if (plname != 'felix') agmove_indiv('felix', pl.slot);
}
function agmove_resolve() {
  console.log('---------------------- RESOLVE ----------------------');
  assertion(isdef(Z.playerdata), 'no playerdata');
  assertion(Z.uplayer == Z.fen.acting_host, 'wrong player resolves!!!!', Z.uplayer);
  let [fen, uplayer, pl, pldata] = [Z.fen, Z.uplayer, Z.pl, Z.playerdata];
  fen.collection = [];
  for (const data of pldata) {
    fen.collection.push({ name: data.name, state: data.state });
  }
  console.log('players selected the following cards:', fen.collection);
  [Z.stage, Z.turn] = [Z.fen.stage_after_multi, Z.fen.turn_after_multi];
  take_turn_resolve('single');
}
function agmove_single() {
  if (Z.pl.hand.length > 2) removeInPlace(Z.pl.hand, Z.pl.hand[0]);
  Z.turn = [get_next_player(Z, Z.uplayer)];
  take_turn_fen();
}
function agmove_startmulti() { Z.stage = 'multi'; Z.turn = Z.plorder;[Z.fen.stage_after_multi, Z.fen.turn_after_multi] = ['click', [rChoose(Z.plorder)]]; take_turn_fen(); }
function ai_move(ms = 100) {
  DA.ai_is_moving = true;
  let [A, fen] = [valf(Z.A, {}), Z.fen];
  let selitems;
  if (Z.game == 'ferro') {
    if (Z.stage == 'card_selection') {
      let uplayer = Z.uplayer;
      let i1 = firstCond(A.items, x => x.path.includes(`${uplayer}.hand`));
      let i2 = firstCond(A.items, x => x.key == 'discard');
      selitems = [i1, i2];
    } else if (Z.stage == 'buy_or_pass') {
      selitems = [A.items[1]];
    } else selitems = [A.items[0]];
  } else if (Z.game == 'bluff') {
    let [newbid, handler] = bluff_ai();
    if (newbid) { fen.newbid = newbid; UI.dAnzeige.innerHTML = bid_to_string(newbid); }
    else if (handler != handle_gehtHoch) { bluff_generate_random_bid(); }
    A.callback = handler;
    selitems = [];
  } else if (A.command == 'trade') {
    selitems = ai_pick_legal_trade();
  } else if (A.command == 'exchange') {
    selitems = ai_pick_legal_exchange();
  } else if (A.command == 'upgrade') {
    selitems = [rChoose(A.items)];
  } else if (A.command == 'rumor') {
    selitems = [];
    let buildings = A.items.filter(x => x.path.includes('building'));
    let rumors = A.items.filter(x => !x.path.includes('building'));
    selitems = [rChoose(buildings), rChoose(rumors)];
  } else if (ARI.stage[Z.stage] == 'rumors_weitergeben') {
    let players = A.items.filter(x => Z.plorder.includes(x.key))
    let rumors = A.items.filter(x => !Z.plorder.includes(x.key))
    selitems = [rChoose(players), rChoose(rumors)];
  } else if (ARI.stage[Z.stage] == 'journey') {
    selitems = [];
  } else {
    let items = A.items;
    let nmin = A.minselected;
    let nmax = Math.min(A.maxselected, items.length);
    let nselect = rNumber(nmin, nmax);
    selitems = rChoose(items, nselect); if (!isList(selitems)) selitems = [selitems];
  }
  for (const item of selitems) {
    select_last(item, select_toggle);
    if (isdef(item.submit_on_click)) A.selected.pop();
  }
  clearTimeout(TO.ai);
  loader_on();
  TO.ai = setTimeout(() => { if (isdef(A.callback)) A.callback(); loader_off(); }, ms);
}
function ai_pick_legal_exchange() {
  let [A, fen, uplayer, items] = [Z.A, Z.fen, Z.uplayer, Z.A.items];
  let firstPick = rChoose(items, 1, x => x.path.includes('building'));
  let secondPick = rChoose(items, 1, x => !x.path.includes('building'));
  return [firstPick, secondPick];
}
function ai_pick_legal_trade() {
  let [A, fen, uplayer, items] = [Z.A, Z.fen, Z.uplayer, Z.A.items];
  let stall = fen.players[uplayer].stall;
  let firstPick = rChoose(items, 1, x => x.path.includes(uplayer));
  let secondPick = rChoose(items, 1, x => !x.path.includes(uplayer));
  return [firstPick, secondPick];
}
function allNumbers(s) {
  let m = s.match(/\-.\d+|\-\d+|\.\d+|\d+\.\d+|\d+\b|\d+(?=\w)/g);
  if (m) return m.map(v => +v); else return null;
}
function allow_polling() { IS_POLLING_ALLOWED = true; if (isdef(DA.poll)) poll(); }
function alphaToHex(zero1) {
  zero1 = Math.round(zero1 * 100) / 100;
  var alpha = Math.round(zero1 * 255);
  var hex = (alpha + 0x10000)
    .toString(16)
    .slice(-2)
    .toUpperCase();
  var perc = Math.round(zero1 * 100);
  return hex;
}
function animate(elem, aniclass, timeoutms) {
  mClass(elem, aniclass);
  TOMan.TO.anim = setTimeout(() => mRemoveClass(elem, aniclass), timeoutms);
}
function animatedTitle(msg = 'DU BIST DRAN!!!!!') {
  TO.titleInterval = setInterval(() => {
    let corner = CORNERS[WhichCorner++ % CORNERS.length];
    document.title = `${corner} ${msg}`;
  }, 1000);
}
function apiphp(o, saveFromZ = false) {
  let [data, cmd] = [o.data, o.cmd];
  let result = {}, friendly, uname, state, player_status, fen;
  if (saveFromZ && isdef(data.friendly) && !db_table_exists(data.friendly)) {
    let res = db_new_table(data.friendly, Z.game, Z.host, jsCopy(Z.playerlist), jsCopy(Z.fen), jsCopy(Z.options));
    if (isdef(Z.playerdata)) res.playerdata = jsCopy(Z.playerdata);
  }
  if (cmd == 'table') {
    if (isdef(data.auto)) result.auto = data.auto;
    friendly = data.friendly;
    uname = data.uname;
    result.status = "table";
    if (isdef(data.clear_players)) {
      result.playerdata = db_clear_players(friendly);
      result.status = "clear_players";
    } else if (isdef(data.write_player) && isdef(data.state)) {
      player_status = isdef(data.player_status) ? data.player_status : '';
      result.playerdata = db_write_player(friendly, uname, data.state, player_status);
      result.status = "write_player";
    } else {
      result.playerdata = db_read_playerdata(friendly);
    }
    if (isdef(data.write_fen)) {
      result.table = db_write_fen(friendly, data.fen);
      result.status += " write_fen";
    } else {
      result.table = db_read_table(friendly);
    }
  } else if (cmd == 'startgame') {
    let res = db_new_table(data.friendly, data.game, data.host, data.players, data.fen, data.options);
    result.table = res.table;
    result.playerdata = res.playerdata;
    result.status = `startgame ${data.friendly}`;
  } else if (cmd == 'tables') {
    result.tables = dict2list(GT, 'friendly').map(x => x.table);
    result.status = "tables";
  } else if (cmd == 'gameover') {
    result.table = db_write_fen(data.friendly, data.fen, data.scoring);
    result.status = `scored table ${data.friendly}`;
  }
  return result;
}
function apply_skin3(item) {
  let d = item.container; mCenterCenterFlex(d); mStyle(d, { position: 'relative', w: 400 });
  let h = 24;
  let top = `calc( 50% - ${h / 2}px )`
  mText(item.label + ':', d, { position: 'absolute', left: 0, top: top, h: h });
  let panel = UI.dAnzeige = item.panel = mDiv(d, { bg: '#ffffff80', padding: '4px 12px', w: 200, align: 'center', rounding: 8 });
  let words = toWords(item.content)
  let panelitems = UI.panelItems = item.panelitems = [];
  for (let i = 0; i < 4; i++) {
    let text = valf(words[i], '');
    let dw = mDiv(panel, { hpadding: 4, display: 'inline', fz: 22, weight: 'bold', fg: 'red' }, `dbid_${i}`, text);
    panelitems.push({ div: dw, index: i, initial: text, state: 'unselected' })
  }
  let b = item.buttonX = mDiv(panel, { fz: 10, hpadding: 4, bg: 'white' }, null, 'CLR', 'enabled'); mPlace(b, 'tr', 2)
  b.onclick = bluff_clear_panel;
  item.button = mButton(item.caption, item.handler, d, { position: 'absolute', right: 0, top: top, h: h, w: 80 }, ['selectbutton', 'enabled']);
}
function applyColorkey(item) {
  let l = item.live;
  let sShade = '0 0 0 ' + item.textShadowColor;
  item.shadeStyles = { 'text-shadow': sShade, fg: colorFrom('black', l.options.contrast) };
  let ui = l.options.showPic ? l.dPic : l.dLabel;
  mStyleX(ui, item.shadeStyles);
}
function ari_get_card(ckey, h, w, ov = .3) {
  let type = ckey[2];
  let sz = { largecard: 100, smallcard: 50 };
  let info = type == 'n' ? to_aristocard(ckey, sz.largecard) : type == 'l' ? to_luxurycard(ckey, sz.largecard) : type == 'r' ? to_rumorcard(ckey, sz.smallcard) : to_commissioncard(ckey, sz.smallcard);
  let card = cardFromInfo(info, h, w, ov);
  if (type == 'l') luxury_card_deco(card);
  return card;
}
function ari_history_list(lines, title = '', fen) {
  if (nundef(fen)) fen = Z.fen;
  if (nundef(fen.history)) fen.history = [];
  fen.history.push({ title: title, lines: lines });
}
function ari_make_selectable(item, dParent, dInstruction) {
  let A = Z.A;
  switch (item.itemtype) {
    case 'card': make_card_selectable(item); break;
    case 'container': make_container_selectable(item); break;
    case 'string': make_string_selectable(item); break;
  }
}
function ari_make_selected(item) {
  let A = Z.A;
  switch (item.itemtype) {
    case 'card': make_card_selected(item); break;
    case 'container': make_container_selected(item); break;
    case 'string': make_string_selected(item); break;
  }
}
function ari_make_unselectable(item) {
  let A = Z.A;
  switch (item.itemtype) {
    case 'card': make_card_unselectable(item); break;
    case 'container': make_container_unselectable(item); break;
    case 'string': make_string_unselectable(item); break;
  }
}
function ari_make_unselected(item) {
  let A = Z.A;
  switch (item.itemtype) {
    case 'card': make_card_unselected(item); break;
    case 'container': make_container_unselected(item); break;
    case 'string': make_string_unselected(item); break;
  }
}
function arrBuckets(arr, func, sortbystr) {
  let di = {};
  for (const a of arr) {
    let val = func(a);
    if (nundef(di[val])) di[val] = { val: val, list: [] };
    di[val].list.push(a);
  }
  let res = []
  let keys = get_keys(di);
  if (isdef(sortbystr)) {
    keys.sort((a, b) => sortbystr.indexOf(a) - sortbystr.indexOf(b));
  }
  return keys.map(x => di[x]);
}
function arrChildren(elem) { return [...toElem(elem).children]; }
function arrClear(arr) { arr.length = 0; }
function arrCycle(arr, count) { return arrRotate(arr, count); }
function arrFlatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      res.push(arr[i][j]);
    }
  }
  return res;
}
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrMinus(arr, b) { if (isList(b)) return arr.filter(x => !b.includes(x)); else return arr.filter(x => x != b); }
function arrNext(list, el) {
  let iturn = list.indexOf(el);
  let nextplayer = list[(iturn + 1) % list.length];
  return nextplayer;
}
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemovip(arr, el) {
  let i = arr.indexOf(el);
  if (i > -1) arr.splice(i, 1);
  return i;
}
function arrRepeat(n, el) { let res = []; for (let i = 0; i < n; i++) res.push(el); return res; }
function arrReplace1(arr, elweg, eldazu) {
  let i = arr.indexOf(elweg);
  arr[i] = eldazu;
  return arr;
}
function arrReverse(arr) { return jsCopy(arr).reverse(); }
function arrRotate(arr, count) {
  var unshift = Array.prototype.unshift,
    splice = Array.prototype.splice;
  var len = arr.length >>> 0, count = count >> 0;
  let arr1 = jsCopy(arr);
  unshift.apply(arr1, splice.call(arr1, count % len, len));
  return arr1;
}
function arrShuffle(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function arrSplitAtIndex(arr, i) {
  return [arr.slice(0, i), arr.slice(i)];
}
function arrSum(arr, props) {
  if (nundef(props)) return arr.reduce((a, b) => a + b);
  if (!isList(props)) props = [props];
  return arr.reduce((a, b) => a + (lookup(b, props) || 0), 0);
}
function arrWithout(arr, b) { return arrMinus(arr, b); }
function assertion(cond) {
  if (!cond) {
    let args = [...arguments];
    for (const a of args) {
      console.log('\n', a);
    }
    throw new Error('TERMINATING!!!')
  }
}
function assets_parse(o) {
  where(o);
  for (const k in o) {
    let text = o[k];
    if (k == 'allSyms') {
      symbolDict = Syms = jsyaml.load(text);
      SymKeys = Object.keys(Syms);
    } else if (k == 'symGSG') {
      ByGroupSubgroup = jsyaml.load(text);
    } else if (k == 'allWP') {
      WordP = jsyaml.load(text);
    } else if (k == 'fens') {
      FenPositionList = csv2list(text);
    } else if (k.startsWith('db_')) {
      let okey = stringAfter(k, '_');
      DB[okey] = jsyaml.load(text);
    } else {
      window[capitalize(k)] = jsyaml.load(text);
    }
  }
  if (nundef(KeySets) && isdef(o.symGSG)) { KeySets = getKeySets(); }
}
function autopoll(ms) { TO.poll = setTimeout(_poll, valf(ms, valf(Z.options.poll, 2000))); }
function badges_off() {
  hide('dLeftSide');
  delete Session.is_badges;
  Badges = [];
}
function beautify_history(lines, title, fen, uplayer) {
  let html = `<div class="history"><span style="color:red;font-weight:bold;">${title}: </span>`;
  for (const l of lines) {
    let words = toWords(l);
    for (const w1 of words) {
      if (is_card_key(w1)) {
        html += mCardText(w1);
        continue;
      }
      w = w1.toLowerCase();
      if (isdef(fen.players[w])) {
        html += `<span style="color:${get_user_color(w)};font-weight:bold"> ${w} </span>`;
      } else html += ` ${w} `;
    }
  }
  html += "</div>";
  return html;
}
function bid_to_string(bid) { return bid.join(' '); }
function bluff() {
  const rankstr = '3456789TJQKA2';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: {}, stage: 'move', phase: '' };
    let num_cards_needed = players.length * options.max_handsize;
    let num_decks_needed = fen.num_decks = Math.ceil(num_cards_needed / 52);
    let deck = fen.deck = create_fen_deck('n', num_decks_needed);
    shuffle(deck);
    shuffle(fen.plorder);
    fen.turn = [fen.plorder[0]];
    for (const plname of fen.plorder) {
      let handsize = options.min_handsize;
      fen.players[plname] = {
        hand: deck_deal(deck, handsize),
        handsize: handsize,
        name: plname,
        color: get_user_color(plname),
      };
    }
    fen.stage = 0;
    return fen;
  }
  function clear_ack() { if (Z.stage == 1) { bluff_change_to_turn_round(); take_turn_fen(); } }
  function check_gameover(Z) { let pls = get_keys(Z.fen.players); if (pls.length < 2) Z.fen.winners = pls; return valf(Z.fen.winners, false); }
  function activate_ui() { bluff_activate_new(); }
  function present(dParent) { bluff_present(dParent); }
  function stats(dParent) { bluff_stats(dParent); }
  function state_info(dParent) { bluff_state(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, clear_ack, present, state_info, stats };
}
function bluff_activate_new() {
  let [z, A, fen, stage, uplayer, ui, dt] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI, UI.dOpenTable];
  if (stage == 1) bluff_activate_stage1(); else { bluff_activate_stage0(); if (is_ai_player()) ai_move(1000); }
}
function bluff_activate_stage0() {
  let [z, A, fen, stage, uplayer, ui, dt] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI, UI.dOpenTable];
  if (isdef(fen.lastbid)) show(ui.currentBidItem.button);
  bluff_show_new_bid(dt);
  mLinebreak(dt, 10);
  bluff_button_panel1(dt, fen.newbid, 50);
}
function bluff_activate_stage1() {
  let [z, A, fen, stage, uplayer, ui, dt] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI, UI.dOpenTable];
  if (isdef(DA.ack) && isdef(DA.ack[uplayer])) { console.log('DA.ack', DA.ack); mText('...waiting for ack', dt); return; }
  if (isdef(ui.dHandsize)) mPulse(ui.dHandsize, 2000);
}
function bluff_ai() {
  let [A, fen, uplayer, pl] = [Z.A, Z.fen, Z.uplayer, Z.pl];
  const torank = { _: '_', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' };
  const toword = { _: '_', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' };
  let words = get_keys(torank).slice(1);
  let all_hand_cards = aggregate_elements(dict2list(fen.players, 'name'), 'hand');
  let no_twos = all_hand_cards.filter(x => x[0] != '2');
  let rankstr = '3456789TJQKA2';
  sortByRank(all_hand_cards, rankstr);
  let byrank = aggregate_player_hands_by_rank(fen);
  let rank_list = dict2list(byrank, 'rank');
  let unique_ranks = sortByRank(get_keys(byrank));
  let myranks = sortByRank(pl.hand.map(x => x[0]));
  let my_unique = unique_ranks.filter(x => myranks.includes(x));
  rank_list.map(x => { x.mine = myranks.includes(x.rank); x.irank = rankstr.indexOf(x.rank); x.i = x.irank + 100 * x.value; });
  rank_list = rank_list.filter(x => x.rank != '2');
  sortByDescending(rank_list, 'i');
  let maxcount = rank_list[0].value;
  let mymaxcount = rank_list.filter(x => x.mine)[0].value;
  let expected = all_hand_cards.length / 13;
  let nreason = Math.max(1, Math.round(expected * 2));
  let n_twos = all_hand_cards.filter(x => x[0] == '2').length;
  let have2 = firstCond(rank_list, x => x.rank == '2' && x.mine);
  return botbest(rank_list, maxcount, mymaxcount, expected, nreason, n_twos, have2, words, fen);
}
function bluff_button_panel1(dt, bid, sz) {
  let n = bid[0] == '_' ? 1 : Number(bid[0]);
  let arr1 = arrRange(n, n + 5);
  let arr2 = toLetters('3456789TJQKA');
  let arr3 = arrRange(0, 5);
  let arr4 = toLetters('3456789TJQKA');
  let dPanel = mDiv(dt, { gap: 5 });
  [d1, d2, d3, d4] = mColFlex(dPanel, [1, 2, 1, 2]);
  UI.dn1 = create_bluff_input1(d1, arr1, 1, sz, 0); d1.onmouseenter = () => iHigh(UI.panelItems[0]); d1.onmouseleave = () => iUnhigh(UI.panelItems[0]);
  UI.dr1 = create_bluff_input1(d2, arr2, 2, sz, 1); d2.onmouseenter = () => iHigh(UI.panelItems[1]); d2.onmouseleave = () => iUnhigh(UI.panelItems[1]);
  UI.dn2 = create_bluff_input1(d3, arr3, 1, sz, 2); d3.onmouseenter = () => iHigh(UI.panelItems[2]); d3.onmouseleave = () => iUnhigh(UI.panelItems[2]);
  UI.dr2 = create_bluff_input1(d4, arr4, 2, sz, 3); d4.onmouseenter = () => iHigh(UI.panelItems[3]); d4.onmouseleave = () => iUnhigh(UI.panelItems[3]);
}
function bluff_change_to_ack_round(fen, nextplayer) {
  [Z.stage, Z.turn] = [1, [get_admin_player(fen.plorder)]];
  fen.keeppolling = true;
  fen.nextturn = [nextplayer];
}
function bluff_change_to_turn_round() {
  let [fen, stage] = [Z.fen, Z.stage];
  assertion(stage == 1, "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");
  Z.stage = 0;
  Z.turn = fen.nextturn;
  Z.round += 1;
  for (const k of ['bidder', 'loser', 'aufheber', 'lastbid', 'lastbidder']) delete fen[k];
  for (const k of ['nextturn', 'keeppolling']) delete fen[k];
  for (const plname of fen.plorder) { delete fen.players[plname].lastbid; }
}
function bluff_clear_panel() {
  for (const item of UI.panelItems) {
    let d = iDiv(item);
    d.innerHTML = '_';
  }
  Z.fen.newbid = ['_', '_', '_', '_'];
}
function bluff_generate_random_bid() {
  let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
  const di2 = { _: '_', three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' };
  let words = get_keys(di2).slice(1);
  let b = isdef(fen.lastbid) ? jsCopy(fen.lastbid) : null;
  if (isdef(b)) {
    assertion(b[0] >= (b[2] == '_' ? 0 : b[2]), 'bluff_generate_random_bid: bid not formatted correctly!!!!!!!', b)
    let nmax = calc_reasonable_max(fen);
    let n = b[0] == '_' ? 1 : Number(b[0]);
    let done = false;
    if (n > nmax + 1) {
      const di = { '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' };
      let rankstr = '3456789TJQKA';
      let w1 = di2[b[1]];
      let idx = isdef(w1) ? rankstr.indexOf(w1) : -1;
      if (idx >= 0 && idx < rankstr.length - 2) {
        let r = rankstr[idx + 1];
        b[1] = di[r];
        done = true;
      }
    }
    if (!done) {
      if (b[3] == '_') { b[2] = 1; b[3] = rChoose(words, 1, x => x != b[1]); }
      else if (b[0] > b[2]) { b[2] += 1; }
      else { b[0] += coin(80) ? 1 : 2; if (coin()) b[2] = b[3] = '_'; }
    }
  } else {
    let nmax = calc_reasonable_max(fen);
    let nmin = Math.max(nmax - 1, 1);
    let arr_nmax = arrRange(1, nmax);
    let arr_nmin = arrRange(1, nmin);
    b = [rChoose(arr_nmax), rChoose(words), rChoose(arr_nmin), rChoose(words)];
    if (b[1] == b[3]) b[3] = rChoose(words, 1, x => x != b[1]);
    if (coin()) b[2] = b[3] = '_';
  }
  fen.newbid = b;
  UI.dAnzeige.innerHTML = bid_to_string(b);
}
function bluff_present(fen, dParent, plname) {
  console.log('fen', fen);
}
function bluff_show_new_bid(dt) {
  let fen = Z.fen;
  let bid = fen.oldbid = valf(fen.lastbid, ['_', '_', '_', '_']);
  fen.newbid = jsCopy(bid);
  let d = mDiv(dt);
  let content = `${bid_to_string(bid)}`;
  let item = { container: d, label: 'YOUR bid', content: content, caption: 'BID', handler: handle_bid };
  apply_skin3(item);
}
function bluff_state(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  dParent.innerHTML = `Round ${Z.round}:&nbsp;player: ${user_html} `;
}
function bluff_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent, {}, { 'border-width': 1, margin: 10, wmax: 180 });
  let fen = Z.fen;
  for (const plname of fen.plorder) {
    let pl = fen.players[plname];
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mLinebreak(d);
    if (fen.turn.includes(plname)) {
      let dh = show_hourglass(plname, d, 20, { left: -4, top: 0 });
    }
    let dhz = mDiv(d, { fg: pl.handsize == Z.options.max_handsize ? 'yellow' : 'white' }, null, `hand: ${pl.handsize}`); mLinebreak(d);
    if (plname == fen.loser) UI.dHandsize = dhz;
    let elem = mDiv(d, { fg: plname == fen.lastbidder ? 'red' : 'white' }, null, `${valf(pl.lastbid, ['_']).join(' ')}`);
    let szhand = getSizeNeeded(dhz);
    let sz = getSizeNeeded(elem);
    let w = Math.max(szhand.w + 20, sz.w + 20, 80);
    mStyle(d, { w: w });
    mLinebreak(d);
  }
  return player_stat_items[Z.uplayer];
}
function botbest(list, max, mmax, exp, nreas, n2, have2, words, fen) {
  if (nundef(DA.ctrandom)) DA.ctrandom = 1; console.log(`${DA.ctrandom++}: ${Z.uplayer} using strategy`, Z.strategy)
  let bot = window[`bot_${Z.strategy}`];
  let [b, f] = bot(list, max, mmax, exp, nreas, n2, have2, words, fen);
  assertion(!b || b[2] != 0, 'bot returned bid with n2==0');
  return [b, f];
}
function busy_wait_until_slot(slot) {
  let diff = get_slot_diff(Z.fen);
  let dd;
  do {
    dd = last_n_digits(Date.now(), 2);
    if (dd >= slot && dd <= slot + diff) { break; }
  } while (true);
  return dd;
}
function cal_num_syms_adaptive() {
  let [uplayer, fen] = [Z.uplayer, Z.fen];
  let pl = fen.players[uplayer];
  pl.score = get_player_score(pl.name);
  let by_score = dict2list(fen.players);
  for (const pl of by_score) { pl.score = get_player_score(pl.name); }
  let avg_score = 0;
  for (const pl of by_score) { avg_score += pl.score; }
  avg_score /= by_score.length;
  let di = { nasi: -3, gul: -3, sheeba: -2, mimi: -1, annabel: 1 };
  let baseline = valf(di[uplayer], 0);
  let dn = baseline + Math.floor(pl.score - avg_score);
  let n = Z.options.num_symbols;
  let nfinal = Math.max(4, Math.min(14, dn + n));
  return nfinal;
}
function calc_bid_minus_cards(fen, bid) {
  let di2 = { _: '_', three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' };
  let di_ranks = aggregate_player_hands_by_rank(fen);
  let [brauch1, r1, brauch2, r2] = bid;
  [r1, r2] = [di2[r1], di2[r2]];
  if (brauch1 == '_') brauch1 = 0;
  if (brauch2 == '_') brauch2 = 0;
  let hab1 = valf(di_ranks[r1], 0);
  let hab2 = valf(di_ranks[r2], 0);
  let wildcards = valf(di_ranks['2'], 0);
  let diff1 = Math.max(0, brauch1 - hab1);
  let diff2 = Math.max(0, brauch2 - hab2);
  return diff1 + diff2 - wildcards;
}
function calc_ferro_highest_goal_achieved(pl) {
  let jsorted = jsCopy(pl.journeys).sort((a, b) => b.length - a.length);
  let di = {
    '3': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 3,
    '33': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 3
      && is_group(jsorted[1]) && jsorted[1].length >= 3,
    '4': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 4,
    '44': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 4
      && is_group(jsorted[1]) && jsorted[1].length >= 4,
    '5': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 5,
    '55': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 5
      && is_group(jsorted[1]) && jsorted[1].length >= 5,
    '7R': jsorted.length > 0 && is_sequence(jsorted[0]) && jsorted[0].length >= 7,
  };
  for (const k of Z.fen.availableGoals) {
    if (pl.goals[k]) {
      console.log('player', pl.name, 'already achieved goal', k);
      continue;
    }
    let achieved = di[k];
    if (achieved) {
      return k;
    }
  }
  return null;
}
function calc_ferro_score(roundwinner) {
  let [round, plorder, stage, A, fen, uplayer] = [Z.round, Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  assertion(roundwinner == uplayer, '_calc_ferro_score: roundwinner != uplayer');
  for (const plname of plorder) {
    let pl = fen.players[plname];
    pl.newcards = [];
    if (nundef(pl.score)) pl.score = 0;
    if (uplayer == plname) pl.score -= round * 5;
    else pl.score += calc_hand_value(pl.hand);
  }
}
function calc_fritz_score() {
  let [round, plorder, stage, A, fen, uplayer] = [Z.round, Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  for (const plname of fen.roundorder) {
    let pl = fen.players[plname];
    if (nundef(pl.score)) pl.score = 0;
    else pl.score += calc_hand_value(pl.hand.concat(pl.loosecards), fritz_get_card);
  }
}
function calc_hand_value(hand, card_func = ferro_get_card) {
  let vals = hand.map(x => card_func(x).val);
  let sum = vals.reduce((a, b) => a + b, 0);
  return sum;
}
function calc_reasonable_max(fen) {
  let allcards = [];
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    allcards = allcards.concat(pl.hand);
  }
  let ncards = allcards.length;
  let nmax = Math.floor(ncards / 13) + 1;
  return nmax;
}
function calc_syms(numSyms) {
  let n = numSyms, rows, realrows, colarr;
  if (n == 3) { rows = 2; realrows = 1; colarr = [1, 2]; }
  else if (n == 4) { rows = 2; realrows = 2; colarr = [2, 2]; }
  else if (n == 5) { rows = 3; realrows = 3; colarr = [1, 3, 1]; }
  else if (n == 6) { rows = 3.3; realrows = 3; colarr = [2, 3, 1]; }
  else if (n == 7) { rows = 3; realrows = 3; colarr = [2, 3, 2]; }
  else if (n == 8) { rows = 3.8; realrows = 4; colarr = [1, 3, 3, 1]; }
  else if (n == 9) { rows = 4; realrows = 4; colarr = [2, 3, 3, 1]; }
  else if (n == 10) { rows = 4; realrows = 4; colarr = [2, 3, 3, 2]; }
  else if (n == 11) { rows = 4.5; realrows = 4; colarr = [2, 3, 4, 2]; }
  else if (n == 12) { rows = 5; realrows = 5; colarr = [1, 3, 4, 3, 1]; }
  else if (n == 13) { rows = 5; realrows = 5; colarr = [2, 3, 4, 3, 1]; }
  else if (n == 14) { rows = 5; realrows = 5; colarr = [2, 3, 4, 3, 2]; }
  else if (n == 15) { rows = 5.5; realrows = 5; colarr = [2, 3, 5, 3, 2]; }
  else if (n == 16) { rows = 5.5; realrows = 5; colarr = [2, 3, 5, 4, 2]; }
  else if (n == 17) { rows = 5.5; realrows = 5; colarr = [2, 4, 5, 4, 2]; }
  else if (n == 18) { rows = 5.8; realrows = 5; colarr = [2, 4, 5, 4, 3]; }
  return [rows, realrows, colarr];
}
function cancel_game() { iClear('dMenu'); }
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function cardFromInfo(info, h, w, ov) {
  let svgCode = C52[info.c52key];
  svgCode = '<div>' + svgCode + '</div>';
  let el = mCreateFrom(svgCode);
  h = valf(h, valf(info.h, 100));
  w = valf(w, h * .7);
  mSize(el, w, h);
  let res = {};
  copyKeys(info, res);
  copyKeys({ w: w, h: h, faceUp: true, div: el }, res);
  if (isdef(ov)) res.ov = ov;
  return res;
}
function cBlank(dParent, styles = {}, id) {
  if (nundef(styles.h)) styles.h = Card.sz;
  if (nundef(styles.w)) styles.w = styles.h * .7;
  if (nundef(styles.bg)) styles.bg = 'white';
  styles.position = 'relative';
  let [w, h, sz] = [styles.w, styles.h, Math.min(styles.w, styles.h)];
  if (nundef(styles.rounding)) styles.rounding = sz * .05;
  let d = mDiv(dParent, styles, id, null, 'card');
  let item = mItem(null, { div: d }, { type: 'card', sz: sz, rounding: styles.rounding });
  copyKeys(styles, item);
  return item;
}
function check_poll_table_seen(obj) {
  console.assert(isdef(obj.table), 'check_poll_table_seen NO TABLE!!!!');
  let t = obj.table;
  if (t.status == 'seen' || t.status == 'past') {
    DA.poll.onsuccess(obj);
  } else {
    TOTicker = setTimeout(poll, DA.poll.ms);
  }
}
function check_poll_table_show(obj) {
  if (isdef(obj) && !isEmpty(obj.table) && obj.table.status == 'show') {
    DA.poll.onsuccess(obj);
  } else {
    TOTicker = setTimeout(poll, DA.poll.ms);
  }
}
function check_poll_table_started(obj) {
  if (isdef(obj) && !isEmpty(obj.tables)) {
    DA.poll.onsuccess(obj);
  } else {
    let dcheck = document.getElementById('ddd_logout');
    if (!dcheck) {
      present_non_admin_waiting_screen();
    }
    TOTicker = setTimeout(poll, DA.poll.ms);
  }
}
function check_resolve() {
  let can_resolve = true;
  for (const plname of Z.plorder) {
    let data1 = firstCond(Z.playerdata, x => x.name == plname && !isEmpty(x.state));
    if (nundef(data1)) { can_resolve = false; break; }
  }
  return can_resolve;
}
function choose(arr, n, excepti) { return rChoose(arr, n, null, excepti); }
function chooseRandom(arr) { return rChoose(arr); }
function cleanup_or_resplay(oldgroup) {
  if (isdef(oldgroup) && isEmpty(oldgroup.ids)) {
    let oldgroupid = oldgroup.id;
    mRemove(iDiv(oldgroup));
    removeInPlace(DA.TJ, oldgroup);
    delete Items[oldgroupid];
  } else if (isdef(oldgroup)) { oldgroup.ov = .3222; resplay_container(oldgroup, .3222) }
}
function clear_quick_buttons() {
  if (isdef(DA.bQuick)) { DA.bQuick.remove(); delete DA.bQuick; }
}
function clear_screen() { mShieldsOff(); clear_status(); clear_title(); for (const ch of arrChildren('dScreen')) mClear(ch); mClassRemove('dTexture', 'wood'); mStyle(document.body, { bg: 'white', fg: 'black' }); }
function clear_selection() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  if (nundef(Z.A) || isEmpty(A.selected)) return;
  let selitems = A.selected.map(x => A.items[x]);
  for (const item of selitems) { ari_make_unselected(item); }
  A.selected = [];
}
function clear_status() { if (nundef(mBy('dStatus'))) return; clearTimeout(TO.fleeting); mRemove("dStatus"); }
function clear_table_all() {
  clear_table_events();
  if (isdef(mBy('table'))) clearEvents();
  resetUIDs();
  Items = {};
}
function clear_table_events() {
  clear_timeouts();
  STOPAUS = true;
  pauseSound();
  DELAY = 1000;
  uiActivated = aiActivated = false;
  onclick = null;
  clearMarkers();
}
function clear_timeouts() {
  for (const k in TO) clearTimeout(TO[k]);
  stop_simple_timer();
}
function clear_title() { mClear('dTitleMiddle'); mClear('dTitleLeft'); mClear('dTitleRight'); }
function clear_transaction() { DA.simulate = false; DA.transactionlist = []; }
function clearElement(elem) {
  if (isString(elem)) elem = document.getElementById(elem);
  if (window.jQuery == undefined) { elem.innerHTML = ''; return elem; }
  while (elem.firstChild) {
    $(elem.firstChild).remove();
  }
  return elem;
}
function clearEvents() {
  clearElement('dTable');
  clearElement('dHistory');
  show_title();
  clearElement('dMessage');
  clearElement('dInstruction');
  clearElement('dTitleRight');
  hide('bPauseContinue');
}
function clearFleetingMessage() {
  if (isdef(dFleetingMessage)) {
    dFleetingMessage.remove();
    dFleetingMessage = null;
  }
}
function clearMarkers() {
  for (const m of Markers) {
    mRemove(m);
  }
  Markers = [];
}
function clearTimeouts() {
  onclick = null;
  clearTimeout(TOMain);
  clearTimeout(TOFleetingMessage);
  clearTimeout(TOTrial);
  if (isdef(TOList)) { for (const k in TOList) { TOList[k].map(x => clearTimeout(x)); } }
}
function clearZones() {
  for (const k in Zones) {
    clearElement(Zones[k].dData);
  }
}
function cloneIfNecessary(value, optionsArgument) {
  var clone = optionsArgument && optionsArgument.clone === true
  return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}
function close_sidebar() {
  let d = mBy('left_panel'); d.style.flex = 0;
  DA.left_panel = 'closed';
}
function coin(percent = 50) { return Math.random() * 100 < percent; }
function collect_game_specific_options(game) {
  let poss = Config.games[game].options;
  if (nundef(poss)) return;
  let di = {};
  for (const p in poss) {
    let fs = mBy(`d_${p}`);
    let val = get_checked_radios(fs)[0];
    di[p] = isNumber(val) ? Number(val) : val;
  }
  return di;
}
function colorFrom(cAny, a, allowHsl = false) {
  if (isString(cAny)) {
    if (cAny[0] == '#') {
      if (a == undefined) return cAny;
      cAny = cAny.substring(0, 7);
      return cAny + (a == 1 ? '' : alphaToHex(a));
    } else if (isdef(ColorDi) && lookup(ColorDi, [cAny])) {
      let c = ColorDi[cAny].c;
      if (a == undefined) return c;
      c = c.substring(0, 7);
      return c + (a == 1 ? '' : alphaToHex(a));
    } else if (cAny.startsWith('rand')) {
      let spec = capitalize(cAny.substring(4));
      if (isdef(window['color' + spec])) {
        c = window['color' + spec]();
      } else c = rColor();
      if (a == undefined) return c;
      return c + (a == 1 ? '' : alphaToHex(a));
    } else if (cAny.startsWith('linear')) {
      return cAny;
    } else if (cAny[0] == 'r' && cAny[1] == 'g') {
      if (a == undefined) return cAny;
      if (cAny[3] == 'a') {
        if (a < 1) {
          return stringBeforeLast(cAny, ',') + ',' + a + ')';
        } else {
          let parts = cAny.split(',');
          let r = firstNumber(parts[0]);
          return 'rgb(' + r + ',' + parts[1] + ',' + parts[2] + ')';
        }
      } else {
        if (a < 1) {
          return 'rgba' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
        } else {
          return cAny;
        }
      }
    } else if (cAny[0] == 'h' && cAny[1] == 's') {
      if (allowHsl) {
        if (a == undefined) return cAny;
        if (cAny[3] == 'a') {
          if (a < 1) {
            return stringBeforeLast(cAny, ',') + ',' + a + ')';
          } else {
            let parts = cAny.split(',');
            let r = firstNumber(parts[0]);
            return 'hsl(' + r + ',' + parts[1] + ',' + parts[2] + ')';
          }
        } else {
          return a == 1 ? cAny : 'hsla' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
        }
      } else {
        if (cAny[3] == 'a') {
          cAny = HSLAToRGBA(cAny);
        } else {
          cAny = HSLToRGB(cAny);
        }
        return colorFrom(cAny, a, false);
      }
    } else {
      ensureColorDict();
      let c = ColorDi[cAny];
      if (nundef(c)) {
        if (cAny.startsWith('rand')) {
          let spec = cAny.substring(4);
          if (isdef(window['color' + spec])) {
            c = window['color' + spec](res);
          } else c = rColor();
        } else {
          console.log('color not available:', cAny);
          throw new Error('color not found: ' + cAny)
          return '#00000000';
        }
      } else c = c.c;
      if (a == undefined) return c;
      c = c.substring(0, 7);
      return c + (a == 1 ? '' : alphaToHex(a));
    }
  } else if (Array.isArray(cAny)) {
    if (cAny.length == 3 && isNumber(cAny[0])) {
      let r = cAny[0];
      let g = cAny[1];
      let b = cAny[2];
      return a == undefined || a == 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
    } else {
      return rChoose(cAny);
    }
  } else if (typeof cAny == 'object') {
    if ('h' in cAny) {
      let hslString = '';
      if (a == undefined || a == 1) {
        hslString = `hsl(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%)`;
      } else {
        hslString = `hsla(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%,${a})`;
      }
      if (allowHsl) {
        return hslString;
      } else {
        return colorFrom(hslString, a, allowHsl);
      }
    } else if ('r' in cAny) {
      if (a !== undefined && a < 1) {
        return `rgba(${cAny.r},${cAny.g},${cAny.b},${a})`;
      } else {
        return `rgb(${cAny.r},${cAny.g},${cAny.b})`;
      }
    }
  }
}
function colorFromHSL(hue, sat = 100, lum = 50) {
  return hslToHex(valf(hue, rHue()), sat, lum);
}
function colorHex(cAny) {
  let c = colorFrom(cAny);
  if (c[0] == '#') {
    return c;
  } else {
    let res = pSBC(0, c, 'c');
    return res;
  }
}
function colorIdealText(bg, grayPreferred = false) {
  let rgb = colorRGB(bg, true);
  const nThreshold = 105;
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  var bgDelta = r * 0.299 + g * 0.587 + b * 0.114;
  var foreColor = 255 - bgDelta < nThreshold ? 'black' : 'white';
  if (grayPreferred) foreColor = 255 - bgDelta < nThreshold ? 'dimgray' : 'snow';
  return foreColor;
}
function colorLight(c, percent = 20, log = true) {
  if (nundef(c)) {
    return colorFromHSL(rHue(), 100, 85);
  } else c = colorFrom(c);
  let zero1 = percent / 100;
  return pSBC(zero1, c, undefined, !log);
}
function colorRGB(cAny, asObject = false) {
  let res = colorFrom(cAny);
  let srgb = res;
  if (res[0] == '#') {
    srgb = pSBC(0, res, 'c');
  }
  let n = allNumbers(srgb);
  if (asObject) {
    return { r: n[0], g: n[1], b: n[2], a: n.length > 3 ? n[3] : 1 };
  } else {
    return srgb;
  }
}
function colorsFromBFA(bg, fg, alpha) {
  if (fg == 'contrast') {
    if (bg != 'inherit') bg = colorFrom(bg, alpha);
    fg = colorIdealText(bg);
  } else if (bg == 'contrast') {
    fg = colorFrom(fg);
    bg = colorIdealText(fg);
  } else {
    if (isdef(bg) && bg != 'inherit') bg = colorFrom(bg, alpha);
    if (isdef(fg) && fg != 'inherit') fg = colorFrom(fg);
  }
  return [bg, fg];
}
function colorTrans(cAny, alpha = 0.5) {
  return colorFrom(cAny, alpha);
}
function compute_hidden(plname) {
  let [fen, uplayer] = [Z.fen, Z.uplayer];
  let pl = fen.players[plname];
  let hidden;
  if (isdef(fen.winners)) hidden = false;
  else if (Z.role == 'spectator') hidden = plname != uplayer;
  else if (Z.mode == 'hotseat') hidden = (pl.playmode == 'bot' || plname != uplayer);
  else hidden = plname != Z.uname;
  return hidden;
}
function computeColor(c) { return (c == 'random') ? randomColor() : c; }
function convert_from_row(row) {
  for (const k in row) {
    let val = row[k];
    if (isNumber(val)) row[k] = Number(val);
    if (isString(val) && val[0] == '{') { row[k] = JSON.parse(val); }
    if (val == 'null') row[k] = null;
    if (k == 'players' && isString(row[k])) row[k] = val.split(',');
  }
}
function convert_from_server(obj) {
  if (isdef(obj.table)) convert_from_row(obj.table);
  if (isdef(obj.playerdata)) {
    for (const row of obj.playerdata) {
      convert_from_row(row);
    }
  }
  if (isdef(obj.moves)) {
    for (const row of obj.moves) {
      convert_from_row(row);
    }
  }
}
function copyKeys(ofrom, oto, except = {}, only = null) {
  let keys = isdef(only) ? only : Object.keys(ofrom);
  for (const k of keys) {
    if (isdef(except[k])) continue;
    oto[k] = ofrom[k];
  }
  return oto;
}
function correct_handsorting(hand, plname) {
  let pl = Z.fen.players[plname];
  let [cs, pls, locs] = [Clientdata.handsorting, pl.handsorting, localStorage.getItem('handsorting')];
  let s = cs ?? pls ?? locs ?? Config.games[Z.game].defaulthandsorting;
  hand = sort_cards(hand, s == 'suit', 'CDSH', true, Z.func.rankstr);
  return hand;
}
function correctFuncName(specType) {
  switch (specType) {
    case 'list': specType = 'liste'; break;
    case 'dict': specType = 'dicti'; break;
    case undefined: specType = 'panel'; break;
  }
  return specType;
}
function create_bluff_input1(dParent, arr, units = 1, sz, index) {
  let d = mDiv(dParent, { gap: 5, w: units * sz * 1.35 }); mCenterFlex(d);
  for (const a of arr) {
    let da = mDiv(d, { align: 'center', wmin: 20, padding: 4, cursor: 'pointer', rounding: 4, bg: units == 1 ? '#e4914b' : 'sienna', fg: 'contrast' }, null, a == 'T' ? '10' : a);
    da.onclick = () => input_to_anzeige1(a, index);
  }
  return d;
}
function create_card_assets_c52() {
  let ranknames = { A: 'Ace', K: 'King', T: '10', J: 'Jack', Q: 'Queen' };
  let suitnames = { S: 'Spades', H: 'Hearts', C: 'Clubs', D: 'Diamonds' };
  let rankstr = '23456789TJQKA';
  let suitstr = 'SHDC';
  sz = 100;
  let di = {};
  for (const r of toLetters(rankstr)) {
    for (const s of toLetters(suitstr)) {
      let k = r + s;
      let info = di[k] = { key: k, val: 1, irank: rankstr.indexOf(r), isuit: suitstr.indexOf(s), rank: r, suit: s, color: RED, c52key: 'card_' + r + s, w: sz * .7, h: sz, sz: sz, ov: .25, friendly: `${isNumber(r) ? r : ranknames[r]} of ${suitnames[s]}`, short: `${r}${s}` };
      info.isort = info.isuit * 13 + info.irank;
    }
  }
  C52Cards = di;
  return di;
}
function create_fen_deck(cardtype, num_decks = 1, num_jokers = 0) {
  let arr = get_keys(C52Cards).map(x => x + cardtype);
  let newarr = [];
  while (num_decks > 0) { newarr = newarr.concat(arr); num_decks--; }
  while (num_jokers > 0) { newarr.push('*H' + cardtype); num_jokers--; }
  return newarr;
}
function create_random_players(n = 1) {
  let colors = rWheel(n);
  let res = [{ name: myname, playmode: 'human', color: colors[0] }];
  let names = rChoose(MyNames, n - 1);
  if (!isList(names)) names = [names];
  for (let i = 1; i < n; i++) {
    let pl = { name: names[i - 1], playmode: 'bot', color: colors[i], strategy: 'random' };
    res.push(pl);
  }
  return res;
}
function createContactsContent(myusers, msgs) {
  let mydata = uiGetContactStylesAndStart();
  mydata += uiGetContacts(myusers, msgs);
  return mydata;
}
function createDebugButton() {
  debug_button.innerHTML = DEBUG ? 'DEBUG ON' : 'DEBUG OFF';
  debug_button.style.position = 'fixed';
  debug_button.style.top = '10px';
  debug_button.style.left = '10px';
  debug_button.style.zIndex = '9999';
  debug_button.style.padding = '10px';
  debug_button.style.backgroundColor = DEBUG ? '#0f0' : '#f00';
  debug_button.style.color = '#fff';
  debug_button.style.border = 'none';
  debug_button.style.cursor = 'pointer';
  debug_button.addEventListener('click', toggleDebug);
  if (SHOW_DEBUG_BUTTON) {
      document.body.appendChild(debug_button);
  }
}
function cRound(dParent, styles = {}, id) {
  styles.w = valf(styles.w, Card.sz);
  styles.h = valf(styles.h, Card.sz);
  styles.rounding = '50%';
  return cBlank(dParent, styles, id);
}
function csv2list(allText, hasHeadings = true) {
  var numHeadings = 11;
  var allTextLines = allText.split(/\r\n|\n/);
  var headings = allTextLines[0].split(',');
  numHeadings = headings.length;
  let entries = allTextLines.splice(1);
  var records = [];
  for (const e of entries) {
    let o = {};
    let values = e.split(',');
    for (let i = 0; i < numHeadings; i++) {
      let k = headings[i];
      o[k] = values[i];
    }
    records.push(o);
  }
  return records;
}
function cycle(x, min, max) { let d = max - min; return (x - min) % d + min; }
function danext() { if (isdef(DA.next)) { let f = DA.next; DA.next = null; f(); } }
function data_from_client(raw) {
  assertion(is_stringified(raw), 'data should be stringified json!!!!!!!!!!!!!!!', raw);
  let js = JSON.parse(raw);
  return js;
}
function db_clear_players(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  for (const pldata of t.playerdata) { pldata.state = null; pldata.player_status = null; }
  return t.playerdata;
}
function db_new_table(friendly, game, host, players, fen, options) {
  let table = { friendly, game, host, players, fen, options };
  table.modified = Date.now();
  let playerdata = [];
  for (const plname of players) {
    playerdata.push({ name: `${plname}`, state: null, player_status: null });
  }
  let res = { table, playerdata };
  GT[friendly] = res;
  return res;
}
function db_read_playerdata(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  return GT[friendly].playerdata;
}
function db_read_table(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  return GT[friendly].table;
}
function db_save() {
  if (!is_online()) { console.log('not saving! (no internet)'); return; }
  let txt = jsyaml.dump(DB);
  to_server({ db: txt }, 'dbsave');
}
function db_table_exists(friendly) { return isdef(GT[friendly]); }
function db_write_fen(friendly, fen, scoring = null) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  let table = t.table;
  table.fen = fen; table.scoring = scoring; table.phase = isdef(scoring) ? 'over' : '';
  table.modified = Date.now();
  return table;
}
function db_write_player(friendly, uname, state, player_status) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  let pldata = firstCond(t.playerdata, x => x.name == uname);
  pldata.state = state;
  pldata.player_status = player_status;
  pldata.checked = Date.now();
  return t.playerdata;
}
async function dbSaveX(callback) {
  if (USELIVESERVER) {
    return;
  }
  if (BlockServerSend1) { setTimeout(() => dbSaveX(callback), 1000); }
  else {
    let path = './MZZ/DB.yaml';
    let resp = await postData('http://localhost:3000/db', { obj: DB, path: path });
    BlockServerSend1 = false;
    if (callback) callback();
  }
}
function deactivate_ui() { uiActivated = false; DA.ai_is_moving = true; }
function deck_deal(deck, n) { return deck.splice(0, n); }
function deck_deal_safe_ferro(fen, plname, n) {
  if (fen.deck.length < n) {
    fen.deck = fen.deck.concat(fen.deck_discard.reverse());
    fen.deck_discard = [];
  }
  let new_cards = deck_deal(fen.deck, n);
  fen.players[plname].hand.push(...new_cards);
  new_cards.map(x => lookupAddToList(fen.players[plname], ['newcards'], x));
  return new_cards;
}
function deck_deal_safe_fritz(fen, plname, n = 1) {
  if (fen.deck.length < n) {
    fen.deck = create_fen_deck('n', fen.num_decks, 0);
    fen.loosecards.push('*Hn');
  }
  let new_cards = deck_deal(fen.deck, n);
  fen.players[plname].hand.push(...new_cards);
  new_cards.map(x => lookupAddToList(fen.players[plname], ['newcards'], x));
  return new_cards;
}
function decrease_handicap_if_winstreak(winners, game) {
  for (const w of winners) {
    let o = lookupSet(DB.users, [w, 'games', game], {});
    o.winstreak = DB.users[w].games[game].winstreak = isdef(o.winstreak) ? o.winstreak + 1 : 1;
    if (o.winstreak >= 3) {
      lookupSetOverride(DB.users, [w, 'games', game, 'startlevel'], Math.min(o.startlevel + 1, Session.maxlevel));
      delete o.winstreak;
      console.log('...startlevel of', w, 'is increased to', get_startlevel(w, game));
    }
    console.log('user', w, 'db entry', o);
  }
}
function deepmerge(target, source, optionsArgument) {
  var array = Array.isArray(source);
  var options = optionsArgument || { arrayMerge: defaultArrayMerge }
  var arrayMerge = options.arrayMerge || defaultArrayMerge
  if (array) {
    return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
  } else {
    return mergeObject(target, source, optionsArgument)
  }
}
function default_allowDrop(ev) { ev.preventDefault(); }
function defaultArrayMerge(target, source, optionsArgument) {
  var destination = target.slice()
  source.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument)
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}
function dict2list(d, keyName = 'id') {
  let res = [];
  for (const key in d) {
    let val = d[key];
    let o;
    if (isDict(val)) { o = jsCopy(val); } else { o = { value: val }; }
    o[keyName] = key;
    res.push(o);
  }
  return res;
}
function download(jsonObject, fname) {
  json_str = JSON.stringify(jsonObject);
  saveFile(fname + '.json', 'data:application/json', new Blob([json_str], { type: '' }));
}
function downloadAsText(s, filename, ext = 'txt') {
  saveFileAtClient(
    filename + "." + ext,
    "data:application/text",
    new Blob([s], { type: "" }));
}
function drag(ev) {
  let elem = ev.target;
  dragStartOffset = getRelCoords(ev, $(elem));
  draggedElement = elem;
}
function dragover_fritz(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  let target_id = evToClosestId(ev);
  let d = mBy(target_id);
  mStyle(d, { bg: 'red' });
  if (target_id == 'dOpenTable') {
  } else if (isdef(Items[target_id])) {
    let targetcard = Items[target_id];
    let targetgroup = Items[targetcard.groupid];
  } else {
  }
}
function drop(ev) {
  ev.preventDefault();
  let targetElem = findDragTarget(ev);
  targetElem.appendChild(draggedElement);
  setDropPosition(ev, draggedElement, targetElem, isdef(draggedElement.dropPosition) ? draggedElement.dropPosition : dropPosition);
}
function drop_card_fritz(ev) {
  ev.preventDefault();
  evNoBubble(ev);
  if (isdef(mBy('ddhint'))) mRemove(mBy('ddhint'));
  var data = ev.dataTransfer.getData("text");
  let card = Items[data];
  let target_id = evToClosestId(ev);
  if (card.source == 'discard') {
    let [discard, loose] = arrSplitAtIndex(UI.deck_discard.items, card.index);
    c = loose[0];
    loose = loose.slice(1);
    assertion(c == card, 'NEEEEEEEE');
    for (const c of loose) {
      console.log('card', c.key, 'source', c.source)
      if (c.source == 'discard') frnew(c, { target: 'dummy' });
    }
  }
  if (target_id == 'dOpenTable') {
    frnew(card, ev);
  } else if (isdef(Items[target_id])) {
    let targetcard = Items[target_id];
    let targetgroup = Items[targetcard.groupid];
    fradd(card, targetgroup, targetcard);
  } else {
  }
}
function dump(...arr) {
  for (const a of arr) {
  }
}
function dynamicArea(areaName, oSpec, oid, o) {
  func = correctFuncName(oSpec.type);
  oSpec.ui = window[func](areaName, oSpec, oid, o);
}
function elem_from_to(el, arr1, arr2) { removeInPlace(arr1, el); arr2.push(el); }
function elem_from_to_top(el, arr1, arr2) { removeInPlace(arr1, el); arr2.unshift(el); }
function empty(arr) {
  let result = arr === undefined || !arr || (isString(arr) && (arr == 'undefined' || arr == '')) || (Array.isArray(arr) && arr.length == 0) || emptyDict(arr);
  testHelpers(typeof arr, result ? 'EMPTY' : arr);
  return result;
}
function emptyDict(obj) {
  let test = Object.entries(obj).length === 0 && obj.constructor === Object;
  return test;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}
function end_of_round_ferro() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  calc_ferro_score(uplayer);
  if (Z.options.phase_order == 'anti') {
    for (const plname of plorder) {
      let pl = fen.players[plname];
      if (!pl.roundgoal) pl.goals[get_round_goal()] = true;
    }
  }
  ari_history_list([`${uplayer} wins the round`], 'round');
  fen.round_winner = uplayer;
  [Z.stage, Z.turn] = ['round_end', [Z.host]];
  take_turn_fen();
}
function end_of_round_fritz(plname) {
  let [A, fen, uplayer, plorder] = [Z.A, Z.fen, Z.uplayer, Z.plorder];
  let pl = fen.players[uplayer];
  calc_fritz_score();
  ari_history_list([`${plname} wins the round`], 'round over');
  fen.round_winner = plname;
  plorder = fen.plorder = jsCopy(fen.roundorder);
  if (Z.round >= fen.maxrounds) {
    fen.winners = find_players_with_min_score();
    ari_history_list([`game over: ${fen.winners.join(', ')} win${fen.winners.length == 1 ? 's' : ''}`], 'game over');
    Z.stage = 'game_over';
    console.log('end of game: stage', Z.stage, '\nplorder', fen.plorder, '\nturn', Z.turn);
  } else {
    let starter = fen.starter = get_next_in_list(fen.starter, plorder);
    console.log('starter', starter);
    Z.turn = [starter];
    Z.round += 1;
    fritz_new_table(fen, Z.options);
    fritz_new_player_hands(fen, Z.turn[0], Z.options);
  }
}
function end_of_turn_fritz() {
  let [A, fen, uplayer, plorder] = [Z.A, Z.fen, Z.uplayer, Z.plorder];
  let pl = fen.players[uplayer];
  clear_quick_buttons();
  let ms = fen.players[uplayer].time_left = stop_timer();
  let ploose = {};
  fen.journeys = [];
  fen.loosecards = [];
  for (const plname in fen.players) { fen.players[plname].loosecards = []; }
  for (const group of DA.TJ) {
    let ch = arrChildren(iDiv(group));
    let cards = ch.map(x => Items[x.id]);
    let set = Z.options.overlapping == 'yes' ? is_overlapping_set(cards, Z.options.jokers_per_group, 3, false)
      : ferro_is_set(cards, Z.options.jokers_per_group, 3, false);
    if (!set) {
      for (const card of cards) {
        if (is_joker(card)) {
          fen.loosecards.push(card.key);
          continue;
        }
        let owner = valf(card.owner, uplayer);
        lookupAddToList(ploose, [owner], card.key);
      }
    } else {
      let j = set;
      fen.journeys.push(j);
    }
  }
  for (const plname in ploose) {
    fen.players[plname].loosecards = ploose[plname];
  }
  let discard = UI.deck_discard.items.filter(x => x.source == 'discard');
  fen.deck_discard = discard.map(x => x.key);
  if (!isEmpty(A.selected)) {
    let ui_discarded_card = A.selected.map(x => A.items[x].o)[0];
    removeInPlace(UI.players[uplayer].hand.items, ui_discarded_card);
    ckey = ui_discarded_card.key;
    elem_from_to(ckey, fen.players[uplayer].hand, fen.deck_discard);
    ari_history_list([`${uplayer} discards ${ckey}`], 'discard');
  }
  let uihand = UI.players[uplayer].hand.items;
  let fenhand_vorher = fen.players[uplayer].hand;
  let fenhand = fen.players[uplayer].hand = uihand.filter(x => x.source == 'hand').map(x => x.key);
  if (isEmpty(fenhand) && isEmpty(fen.players[uplayer].loosecards)) {
    end_of_round_fritz(uplayer);
  } else if (ms <= 100) {
    console.log(`time is up for ${uplayer}!!!`);
    ari_history_list([`${uplayer} runs out of time`], 'timeout');
    if (fen.plorder.length <= 1) { end_of_round_fritz(uplayer); }
    else { Z.turn = [get_next_player(Z, uplayer)]; deck_deal_safe_fritz(fen, Z.turn[0]); removeInPlace(fen.plorder, uplayer); }
  } else { Z.turn = [get_next_player(Z, uplayer)]; deck_deal_safe_fritz(fen, Z.turn[0]); }
  take_turn_fen();
}
function ensure_polling() { }
function ensure_score(plname) {
  let sc = 0;
  if (isdef(Z.playerdata)) {
    let pldata = valf(firstCond(Z.playerdata, x => x.name == plname), { name: plname, state: { score: 0 } });
    sc = isdef(pldata.state) ? pldata.state.score : 0;
  } else Z.playerdata = Z.plorder.map(x => [{ name: x, state: { score: 0 } }]);
  lookupSet(Z.fen, ['players', plname, 'score'], sc);
}
function ensureColorDict() {
  if (isdef(ColorDi)) return;
  ColorDi = {};
  let names = getColorNames();
  let hexes = getColorHexes();
  for (let i = 0; i < names.length; i++) {
    ColorDi[names[i].toLowerCase()] = { c: '#' + hexes[i] };
  }
  const newcolors = {
    black: { c: '#000000', D: 'schwarz' },
    blue: { c: '#0000ff', D: 'blau' },
    BLUE: { c: '#4363d8', E: 'blue', D: 'blau' },
    BLUEGREEN: { c: '#004054', E: 'bluegreen', D: 'blaugrün' },
    BROWN: { c: '#96613d', E: 'brown', D: 'braun' },
    deepyellow: { c: '#ffed01', E: 'yellow', D: 'gelb' },
    FIREBRICK: { c: '#800000', E: 'darkred', D: 'rotbraun' },
    gold: { c: 'gold', D: 'golden' },
    green: { c: 'green', D: 'grün' },
    GREEN: { c: '#3cb44b', E: 'green', D: 'grün' },
    grey: { c: 'grey', D: 'grau' },
    lightblue: { c: 'lightblue', D: 'hellblau' },
    LIGHTBLUE: { c: '#42d4f4', E: 'lightblue', D: 'hellblau' },
    lightgreen: { c: 'lightgreen', D: 'hellgrün' },
    LIGHTGREEN: { c: '#afff45', E: 'lightgreen', D: 'hellgrün' },
    lightyellow: { c: '#fff620', E: 'lightyellow', D: 'gelb' },
    NEONORANGE: { c: '#ff6700', E: 'neonorange', D: 'neonorange' },
    NEONYELLOW: { c: '#efff04', E: 'neonyellow', D: 'neongelb' },
    olive: { c: 'olive', D: 'oliv' },
    OLIVE: { c: '#808000', E: 'olive', D: 'oliv' },
    orange: { c: 'orange', D: 'orange' },
    ORANGE: { c: '#f58231', E: 'orange', D: 'orange' },
    PINK: { c: 'deeppink', D: 'rosa' },
    pink: { c: 'pink', D: 'rosa' },
    purple: { c: 'purple', D: 'lila' },
    PURPLE: { c: '#911eb4', E: 'purple', D: 'lila' },
    red: { c: 'red', D: 'rot' },
    RED: { c: '#e6194B', E: 'red', D: 'rot' },
    skyblue: { c: 'skyblue', D: 'himmelblau' },
    SKYBLUE: { c: 'deepskyblue', D: 'himmelblau' },
    teal: { c: '#469990', D: 'blaugrün' },
    TEAL: { c: '#469990', E: 'teal', D: 'blaugrün' },
    transparent: { c: '#00000000', E: 'transparent', D: 'transparent' },
    violet: { c: 'violet', E: 'violet', D: 'violett' },
    VIOLET: { c: 'indigo', E: 'violet', D: 'violett' },
    white: { c: 'white', D: 'weiss' },
    yellow: { c: 'yellow', D: 'gelb' },
    yelloworange: { c: '#ffc300', E: 'yellow', D: 'gelb' },
    YELLOW: { c: '#ffe119', E: 'yellow', D: 'gelb' },
  };
  for (const k in newcolors) {
    let cnew = newcolors[k];
    if (cnew.c[0] != '#' && isdef(ColorDi[cnew.c])) cnew.c = ColorDi[cnew.c].c;
    ColorDi[k] = cnew;
  }
}
function error(msg) {
  let fname = getFunctionsNameThatCalledThisFunction();
  console.log(fname, 'ERROR!!!!! ', msg);
}
function ev_to_gname(ev) { evNoBubble(ev); return evToTargetAttribute(ev, 'gamename'); }
function evNoBubble(ev) { ev.preventDefault(); ev.cancelBubble = true; }
function evToClosestId(ev) {
  let elem = findParentWithId(ev.target);
  return elem.id;
}
function evToId(ev) {
  let elem = findParentWithId(ev.target);
  return elem.id;
}
function evToItem(ev) {
  let id = evToId(ev);
  let item = Items[id];
  return item;
}
function evToProp(ev, prop) {
  let x = ev.target;
  while (isdef(x) && nundef(x.getAttribute(prop))) x = x.parentNode;
  return isdef(x) ? x.getAttribute(prop) : null;
}
function evToTargetAttribute(ev, attr) {
  let elem = ev.target;
  let val = null;
  while (nundef(val) && isdef(elem)) {
    val = elem.getAttribute(attr);
    elem = elem.parentNode;
  }
  return val;
}
function face_down(item, color, texture) {
  if (!item.faceUp) return;
  if (isdef(texture) || lookup(item, ['live', 'dCover'])) {
    face_down_alt(item, color, texture);
  } else {
    let svgCode = C52.card_2B;
    item.div.innerHTML = svgCode;
    if (nundef(color)) color = item.color;
    if (isdef(item.color)) item.div.children[0].children[1].setAttribute('fill', item.color);
  }
  item.faceUp = false;
}
function face_down_alt(item, bg, texture_name) {
  let dCover = item.live.dCover;
  if (nundef(dCover)) {
    let d = iDiv(item);
    dCover = item.live.dCover = mDiv(d, { background: bg, rounding: mGetStyle(d, 'rounding'), position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 });
    let t = get_texture(texture_name);
    dCover.style.backgroundImage = t;
    dCover.style.backgroundRepeat = 'repeat';
  } else mStyle(dCover, { display: 'block' });
}
function face_up(item) {
  if (item.faceUp) return;
  if (lookup(item, ['live', 'dCover'])) mStyle(item.live.dCover, { display: 'none' });
  else item.div.innerHTML = isdef(item.c52key) ? C52[item.c52key] : item.html;
  item.faceUp = true;
}
function ferro() {
  const rankstr = '23456789TJQKA*';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [] };
    options.jokers_per_group = 1;
    fen.allGoals = ['7R', '55', '5', '44', '4', '33', '3'];
    fen.availableGoals = options.maxrounds == 1 ? [rChoose(fen.allGoals)] : options.maxrounds < 7 ? rChoose(fen.allGoals, options.maxrounds) : fen.allGoals;
    fen.availableGoals.sort((a, b) => fen.allGoals.indexOf(a) - fen.allGoals.indexOf(b));
    fen.roundGoals = arrReverse(fen.availableGoals);
    let n = players.length;
    let num_decks = fen.num_decks = 2 + (n >= 9 ? 2 : n >= 7 ? 1 : 0);
    let deck = fen.deck = create_fen_deck('n', num_decks, 4 * num_decks);
    let deck_discard = fen.deck_discard = [];
    shuffle(deck);
    if (DA.TESTING != true) { shuffle(fen.plorder); shuffle(fen.plorder); }
    let starter = fen.plorder[0];
    let handsize = valf(Number(options.handsize), 11);
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(deck, plname == starter ? handsize + 1 : handsize),
        journeys: [],
        roundgoal: false,
        coins: options.coins,
        vps: 0,
        score: 0,
        name: plname,
        color: get_user_color(plname),
      };
      pl.goals = {};
      for (const g of fen.availableGoals) { pl.goals[g] = 0; }
    }
    fen.phase = '';
    [fen.stage, fen.turn] = ['card_selection', [starter]];
    return fen;
  }
  function activate_ui() { ferro_activate_ui(); }
  function check_gameover() { return isdef(Z.fen.winners) ? Z.fen.winners : false; }
  function clear_ack() {
    if (Z.stage == 'round_end') { start_new_round_ferro(); take_turn_fen(); }
    else if (Z.stage != 'card_selection') {
      for (const plname of Z.fen.canbuy) {
        let pldata = firstCond(Z.playerdata, x => x.name == plname);
        if (isdef(pldata) && lookup(pldata, ['state', 'buy']) == true) {
          Z.fen.buyer = plname;
          break;
        }
      }
      Z.stage = 'can_resolve';
      ferro_change_to_card_selection();
    }
  }
  function present(dParent) { ferro_present(dParent); }
  function stats(dParent) { ferro_stats(dParent); }
  function state_info(dParent) { ferro_state(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, clear_ack, present, state_info, stats };
}
function ferro_ack_uplayer() { if (Z.mode == 'multi') { ferro_ack_uplayer_multi(); } else { ferro_ack_uplayer_hotseat(); } }
function ferro_ack_uplayer_hotseat() {
  let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
  let buy = !isEmpty(A.selected) && A.selected[0] == 0;
  if (buy || uplayer == fen.lastplayer) { fen.buyer = uplayer;[Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve']; }
  else { Z.turn = [get_next_in_list(uplayer, fen.canbuy)]; }
  take_turn_fen();
}
function ferro_ack_uplayer_multi() {
  let [A, uplayer] = [Z.A, Z.uplayer];
  stopPolling();
  let o_pldata = Z.playerdata.find(x => x.name == uplayer);
  Z.state = o_pldata.state = { buy: !isEmpty(A.selected) && A.selected[0] == 0 };
  let can_resolve = ferro_check_resolve();
  if (can_resolve) {
    assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
    Z.stage = 'can_resolve';
    [Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
    take_turn_fen_write();
  } else { take_turn_multi(); }
}
function ferro_activate_ui() { ferro_pre_action(); }
function ferro_change_to_buy_pass() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let nextplayer = get_next_player(Z, uplayer);
  let newturn = jsCopy(plorder); while (newturn[0] != nextplayer) { newturn = arrCycle(newturn, 1); }
  fen.canbuy = newturn.filter(x => x != uplayer && fen.players[x].coins > 0);
  fen.trigger = uplayer;
  fen.buyer = null;
  fen.nextturn = [nextplayer];
  if (isEmpty(fen.canbuy)) { Z.stage = 'can_resolve'; ferro_change_to_card_selection(); return; }
  else if (Z.mode == 'multi') { [Z.stage, Z.turn] = ['buy_or_pass', fen.canbuy]; fen.keeppolling = true; take_turn_fen_clear(); }
  else {
    fen.canbuy.map(x => fen.players[x].buy = 'unset');
    fen.lastplayer = arrLast(fen.canbuy);
    [Z.stage, Z.turn] = ['buy_or_pass', [fen.canbuy[0]]];
    take_turn_fen();
  }
}
function ferro_change_to_card_selection() {
  let [fen, stage] = [Z.fen, Z.stage];
  assertion(stage != 'card_selection', "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");
  assertion(stage == 'can_resolve', "change to card_selection: NOT IN can_resolve stage!!!!!!!!!!!!!!!!!!!!!!");
  assertion(Z.uplayer == 'mimi' || Z.uplayer == fen.trigger, "mixup uplayer in change_to_card_selection!!!!!!!!!!!!!!!!!!!!!!");
  if (isdef(fen.buyer)) {
    let plname = fen.buyer;
    let pl = fen.players[plname];
    let card = fen.deck_discard.shift();
    pl.hand.push(card);
    lookupAddToList(pl, ['newcards'], card);
    deck_deal_safe_ferro(fen, plname, 1);
    pl.coins -= 1;
    ari_history_list([`${plname} bought ${card}`], 'buy');
  }
  let nextplayer = fen.nextturn[0];
  deck_deal_safe_ferro(fen, nextplayer, 1);
  Z.turn = fen.nextturn;
  Z.stage = 'card_selection';
  for (const k of ['buyer', 'canbuy', 'nextturn', 'trigger', 'lastplayer']) delete fen[k];
  delete fen.keeppolling;
  clear_transaction();
  take_turn_fen();
}
function ferro_check_resolve() {
  let [pldata, stage, A, fen, plorder, uplayer, deck, turn] = [Z.playerdata, Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck, Z.turn];
  let pl = fen.players[uplayer];
  assertion(stage == 'buy_or_pass', "check_resolve NOT IN buy_or_pass stage!!!!!!!!!");
  assertion(isdef(pldata), "no playerdata in buy_or_pass stage!!!!!!!!!!!!!!!!!!!!!!!");
  let done = true;
  for (const plname of turn) {
    let data = firstCond(pldata, x => x.name == plname);
    assertion(isdef(data), 'no pldata for', plname);
    let state = data.state;
    if (isEmpty(state)) done = false;
    else if (state.buy == true) fen.buyer = plname;
    else continue;
    break;
  }
  return done;
}
function ferro_get_card(ckey, h, w, ov = .25) {
  let type = ckey[2];
  let info = ckey[0] == '*' ? get_joker_info() : jsCopy(C52Cards[ckey.substring(0, 2)]);
  info.key = ckey;
  info.cardtype = ckey[2];
  let [r, s] = [info.rank, info.suit];
  info.val = r == '*' ? 50 : r == 'A' ? 20 : 'TJQK'.includes(r) ? 10 : Number(r);
  info.color = RED;
  info.sz = info.h = valf(h, Config.ui.card.h);
  info.w = valf(w, info.sz * .7);
  info.irank = '23456789TJQKA*'.indexOf(r);
  info.isuit = 'SHCDJ'.indexOf(s);
  info.isort = info.isuit * 14 + info.irank;
  let card = cardFromInfo(info, h, w, ov);
  return card;
}
function ferro_is_set(cards, max_jollies_allowed = 1, seqlen = 7, group_same_suit_allowed = true) {
  if (cards.length < 3) return false;
  let num_jollies_in_cards = cards.filter(x => is_joker(x)).length;
  if (num_jollies_in_cards > max_jollies_allowed) return false;
  cards = sortCardItemsByRank(cards.map(x => x), rankstr = '23456789TJQKA*');
  let rank = cards[0].rank;
  let isgroup = cards.every(x => x.rank == rank || is_joker(x));
  let suits = cards.filter(x => !is_joker(x)).map(x => x.suit);
  let num_duplicate_suits = suits.filter(x => suits.filter(y => y == x).length > 1).length;
  if (isgroup && !group_same_suit_allowed && num_duplicate_suits > 0) return false;
  else if (isgroup) return cards.map(x => x.key);
  let suit = cards[0].suit;
  if (!cards.every(x => is_jolly(x.key) || x.suit == suit)) return false;
  let keys = cards.map(x => x.key);
  if (keys.length != new Set(keys).size) return false;
  let at_most_jollies = Math.min(num_jollies_in_cards, max_jollies_allowed);
  let num_jolly = sortCardItemsToSequence(cards, rankstr = '23456789TJQKA', at_most_jollies);
  let cond1 = num_jolly <= at_most_jollies;
  let cond2 = cards.length >= seqlen;
  if (cond1 && cond2) return cards.map(x => x.key); else return false;
}
function ferro_pre_action() {
  let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
  switch (stage) {
    case 'can_resolve': if (Z.options.auto_weiter) ferro_change_to_card_selection(); else { select_add_items(ui_get_string_items(['weiter']), ferro_change_to_card_selection, 'may click to continue', 1, 1, Z.mode == 'multi'); select_timer(2000, ferro_change_to_card_selection); } break;
    case 'buy_or_pass': if (!is_playerdata_set(uplayer)) { select_add_items(ui_get_buy_or_pass_items(), ferro_ack_uplayer, 'may click discard pile to buy or pass', 1, 1); if (uplayer != 'nasi') select_timer(Z.options.thinking_time * 1000, ferro_ack_uplayer); } break;
    case 'card_selection': select_add_items(ui_get_ferro_items(uplayer), fp_card_selection, 'must select one or more cards', 1, 100); break;
    default: console.log('stage is', stage); break;
  }
}
function ferro_present(dParent) {
  if (DA.simulate == true) show('bRestartMove'); else hide('bRestartMove');
  let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent);
  ferro_stats(dRechts);
  show_history(fen, dRechts);
  let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', ferro_get_card);
  let deck_discard = ui.deck_discard = ui_type_deck(fen.deck_discard, dOpenTable, { maleft: 12 }, 'deck_discard', '', ferro_get_card);
  if (!isEmpty(deck_discard.items)) face_up(deck_discard.get_topcard());
  order = get_present_order();
  for (const plname of order) {
    let pl = fen.players[plname];
    let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 10, border: `2px ${get_user_color(plname)} solid` };
    let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(plname, 25));
    mFlexWrap(d);
    mLinebreak(d, 10);
    let hidden = compute_hidden(plname);
    ferro_present_player(plname, d, hidden);
  }
  Z.isWaiting = false;
  if (Z.stage == 'round_end') {
    show_waiting_for_ack_message();
    if (Z.role == 'active' || i_am_host()) {
      show('bClearAck');
    }
  } else if (Z.stage == 'buy_or_pass' && uplayer == fen.trigger && ferro_check_resolve()) {
    assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
    Z.stage = 'can_resolve';
    [Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
    take_turn_fen(); return;
  } else if (Z.stage == 'buy_or_pass' && (Z.role != 'active' || is_playerdata_set(uplayer))) {
    assertion(isdef(Z.playerdata), 'playerdata is not defined in buy_or_pass (present ferro)');
    let pl_not_done = Z.playerdata.filter(x => Z.turn.includes(x.name) && isEmpty(x.state)).map(x => x.name);
    show_waiting_message(`waiting for possible buy decision...`);
    Z.isWaiting = true;
  }
  show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname, { bottom: -2 });
  new_cards_animation();
}
function ferro_present_player(plname, d, ishidden = false) {
  let fen = Z.fen;
  let pl = fen.players[plname];
  let ui = UI.players[plname] = { div: d };
  Config.ui.card.h = ishidden ? 100 : 150;
  Config.ui.container.h = Config.ui.card.h + 30;
  if (!ishidden) pl.hand = correct_handsorting(pl.hand, plname);
  let hand = ui.hand = ui_type_hand(pl.hand, d, {}, `players.${plname}.hand`, 'hand', ferro_get_card);
  if (ishidden) { hand.items.map(x => face_down(x)); }
  ui.journeys = [];
  let i = 0;
  for (const j of pl.journeys) {
    let jui = ui_type_lead_hand(j, d, { maleft: 12, h: 130 }, `players.${plname}.journeys.${i}`, '', ferro_get_card);
    i += 1;
    ui.journeys.push(jui);
  }
}
function ferro_process_discard() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let pl = fen.players[uplayer];
  if (!isEmpty(pl.journeys) && !pl.roundgoal) {
    let goal = is_fixed_goal() ? get_round_goal() : calc_ferro_highest_goal_achieved(pl);
    pl.roundgoal = goal;
    pl.goals[goal] = true;
    ari_history_list([`${pl.name} achieved goal ${pl.roundgoal}`], 'achieve');
  }
  let c = A.selectedCards[0].key;
  elem_from_to_top(c, fen.players[uplayer].hand, fen.deck_discard);
  ari_history_list([`${uplayer} discards ${c}`], 'discard');
  if (fen.players[uplayer].hand.length == 0) { end_of_round_ferro(); } else ferro_change_to_buy_pass();
}
function ferro_process_jolly(key, j) {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let a = key;
  let b = j.find(x => x[0] == '*');
  arrReplace1(fen.players[uplayer].hand, a, b);
  replace_jolly(key, j);
  ari_history_list([`${uplayer} replaces for jolly`], 'jolly');
  Z.stage = 'card_selection';
}
function ferro_process_set(keys) {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  if (is_group(keys)) {
    keys = sort_cards(keys, true, 'CDSH', true, '23456789TJQKA*');
  }
  let j = [];
  keys.map(x => elem_from_to(x, fen.players[uplayer].hand, j));
  fen.players[uplayer].journeys.push(j);
  ari_history_list([`${uplayer} reveals ${j.join(', ')}`], 'auflegen');
  Z.stage = 'card_selection';
}
function ferro_state(dParent) {
  if (DA.TEST0 == true) {
    let html = `${Z.stage}`;
    if (isdef(Z.playerdata)) {
      let trigger = get_multi_trigger();
      if (trigger) html += ` trigger:${trigger}`;
      for (const data of Z.playerdata) {
        if (data.name == trigger) continue;
        let name = data.name;
        let state = data.state;
        let s_state = object2string(state);
        html += ` ${name}:'${s_state}'`;
      }
      dParent.innerHTML += ` ${Z.playerdata.map(x => x.name)}`;
    }
    dParent.innerHTML = html;
    return;
  }
  if (Z.stage == 'round_end') {
    dParent.innerHTML = `Round ${Z.round} ended by &nbsp;${get_user_pic_html(Z.fen.round_winner, 30)}`;
  } else if (is_fixed_goal()) {
    let goal = get_round_goal();
    console.log('goal', goal);
    let goal_html = `<div style="font-weight:bold;border-radius:50%;background:white;color:red;line-height:100%;padding:4px 8px">${goal}</div>`;
    dParent.innerHTML = `Round ${Z.round}:&nbsp;&nbsp;minimum:&nbsp;${goal_html}`;
  } else {
    let user_html = get_user_pic_html(Z.stage == 'buy_or_pass' ? Z.fen.nextturn[0] : Z.turn[0], 30);
    dParent.innerHTML = `Round ${Z.round}:&nbsp;${Z.stage == 'buy_or_pass' ? 'next ' : ''}turn: ${user_html} `;
  }
}
function ferro_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent);
  let fen = Z.fen;
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mStyle(d, { wmin: 150 }); mLinebreak(d);
    player_stat_count('coin', pl.coins, d);
    player_stat_count('pinching hand', pl.hand.length, d);
    if (!compute_hidden(plname)) player_stat_count('hand with fingers splayed', calc_hand_value(pl.hand), d);
    player_stat_count('star', pl.score, d);
    mLinebreak(d, 4);
    if (!is_fixed_goal()) {
      let d2 = mDiv(d, { padding: 4, display: 'flex' }, `d_${plname}_goals`);
      if (fen.availableGoals.length < 4) { mStyle(d2, { wmin: 120 }); mCenterFlex(d2); }
      let sz = 16;
      let styles_done = { h: sz, fz: sz, maleft: 6, fg: 'grey', 'text-decoration': 'line-through green', weight: 'bold' };
      let styles_todo = { h: sz, fz: sz, maleft: 6, border: 'red', weight: 'bold', padding: 4, 'line-height': sz };
      for (const k of fen.roundGoals) {
        mText(k, d2, pl.goals[k] ? styles_done : styles_todo);
      }
    }
    if (fen.turn.includes(plname)) { show_hourglass(plname, d, 30, { left: -3, top: 0 }); }
  }
}
function ferro_transaction_error() {
  let d = mDiv(dError, { padding: 10, align: 'center' }, null, `Illegal turn sequence - transaction cannot be completed!!!<br>press reload and try again!<br>`);
  mButton('RELOAD', onclick_reload, d, { margin: 10 });
  clear_transaction();
}
function fillColarr(colarr, items) {
  let i = 0;
  let result = [];
  for (const r of colarr) {
    let arr = [];
    for (let c = 0; c < r; c++) {
      arr.push(items[i]); i++;
    }
    result.push(arr);
  }
  return result;
}
function find_index_of_jolly(j) { return j.findIndex(x => is_jolly(x)); }
function find_jolly_rank(j, rankstr = 'A23456789TJQKA') {
  let jolly_idx = find_index_of_jolly(j);
  if (jolly_idx == -1) return false;
  if (jolly_idx > 0) {
    let rank_before_index = j[jolly_idx - 1][0];
    let rank_needed = rankstr[rankstr.indexOf(rank_before_index) + 1];
    return rank_needed;
  } else {
    let rank_after_index = j[jolly_idx + 1][0];
    let rank_needed = rank_after_index == 'A' ? 'K' : rankstr[rankstr.indexOf(rank_after_index) - 1];
    return rank_needed;
  }
}
function find_players_with_min_score() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let minscore = Infinity;
  let minscorepls = [];
  for (const plname of plorder) {
    let pl = fen.players[plname];
    if (pl.score < minscore) { minscore = pl.score; minscorepls = [plname]; }
    else if (pl.score == minscore) minscorepls.push(plname);
  }
  return minscorepls;
}
function find_shared_keys(keylist, keylists) {
  let shared = [];
  for (const keylist2 of keylists) {
    for (const key of keylist) {
      if (keylist2.includes(key)) {
        shared.push(key);
      }
    }
  }
  return shared;
}
function findDragTarget(ev) {
  let targetElem = ev.target;
  while (!targetElem.ondragover) targetElem = targetElem.parentNode;
  return targetElem;
}
function findParentWithId(elem) { while (elem && !(elem.id)) { elem = elem.parentNode; } return elem; }
function first(arr) {
  return arr.length > 0 ? arr[0] : null;
}
function firstCond(arr, func) {
  if (nundef(arr)) return null;
  for (const a of arr) {
    if (func(a)) return a;
  }
  return null;
}
function firstCondDictKeys(dict, func) {
  for (const k in dict) { if (func(k)) return k; }
  return null;
}
function firstNumber(s) {
  if (s) {
    let m = s.match(/-?\d+/);
    if (m) {
      let sh = m.shift();
      if (sh) { return Number(sh); }
    }
  }
  return null;
}
function fisherYates(arr) {
  if (arr.length == 2 && coin()) { return arr; }
  var rnd, temp;
  let last = arr[0];
  for (var i = arr.length - 1; i; i--) {
    rnd = Math.random() * i | 0;
    temp = arr[i];
    arr[i] = arr[rnd];
    arr[rnd] = temp;
  }
  return arr;
}
function fleetingMessage(msg, d, styles, ms, fade) {
  if (isString(msg)) {
    dFleetingMessage.innerHTML = msg;
    mStyle(dFleetingMessage, styles);
  } else {
    mAppend(dFleetingMessage, msg);
  }
  if (fade) Animation1 = mAnimate(dFleetingMessage, 'opacity', [1, .4, 0], null, ms, 'ease-in', 0, 'both');
  return dFleetingMessage;
}
function format2Digits(i) { return (i < 10) ? "0" + i : i; }
function fp_card_selection() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  let selitems = A.selectedCards = A.selected.map(x => A.items[x]);
  let cards = selitems.map(x => x.o);
  let cmd = A.last_selected.key;
  if (cmd == 'discard') {
    if (selitems.length != 1) { select_error('select exactly 1 hand card to discard!'); return; }
    let item = selitems[0];
    if (!item.path.includes(`${uplayer}.hand`)) { select_error('select a hand card to discard!', () => { ari_make_unselected(item); A.selected = []; }); return; }
    assertion(DA.transactionlist.length == 0 || DA.simulate, '!!!!!!!!!!!!!!!!transactionlist is not empty!');
    if (DA.transactionlist.length > 0) {
      console.log('VERIFYING TRANSACTION............')
      let legal = verify_min_req();
      clear_transaction();
      if (legal) {
        ferro_process_discard();
      } else {
        ferro_transaction_error();
      }
    } else {
      ferro_process_discard();
    }
  } else if (cmd == 'jolly') {
    if (selitems.length != 2) { select_error('select a hand card and the jolly you want!'); return; }
    let handcard = selitems.find(x => !is_joker(x.o) && x.path.includes(`${uplayer}.hand`));
    let jolly = selitems.find(x => is_joker(x.o) && !x.path.includes(`${uplayer}.hand`));
    if (!isdef(handcard) || !isdef(jolly)) { select_error('select a hand card and the jolly you want!'); return; }
    let key = handcard.key;
    let j = path2fen(fen, jolly.path);
    if (!jolly_matches(key, j)) { select_error('your card does not match jolly!'); return; }
    if (pl.journeys.length == 0) { add_transaction(cmd); }
    ferro_process_jolly(key, j);
    take_turn_fen();
  } else if (cmd == 'auflegen') {
    if (selitems.length < 3) { select_error('select cards to form a group!'); return; }
    else if (pl.hand.length == selitems.length) { select_error('you need to keep a card for discard!!', clear_selection); return; }
    let newset = ferro_is_set(cards, Z.options.jokers_per_group);
    if (!newset) { select_error('this is NOT a valid set!'); return; }
    let is_illegal = is_correct_group_illegal(cards);
    if (is_illegal) { select_error(is_illegal); return; }
    if (pl.journeys.length == 0) { add_transaction(cmd); }
    let keys = newset;
    ferro_process_set(keys);
    take_turn_fen();
  } else if (cmd == 'anlegen') {
    if (selitems.length < 1) { select_error('select at least 1 hand card and the first card of a group!'); return; }
    else if (pl.hand.length == selitems.length - 1) { select_error('you need to keep a card for discard!!', clear_selection); return; }
    let handcards = selitems.filter(x => !is_joker(x.o) && x.path.includes(`${uplayer}.hand`));
    let groupcard = selitems.find(x => !is_joker(x.o) && !x.path.includes(`${uplayer}.hand`));
    if (isEmpty(handcards) || !isdef(groupcard)) { select_error('select 1 or more hand cards and the first card of a group!'); return; }
    let hand_rank = handcards[0].key[0];
    let handcards_same_rank = handcards.every(x => x.key[0] == hand_rank);
    let j = path2fen(fen, groupcard.path);
    if (is_group(j)) {
      if (!handcards_same_rank) { select_error('all hand cards must have the same rank!'); return; }
      let group_rank = groupcard.key[0];
      if (group_rank == hand_rank) {
        for (const h of handcards) {
          elem_from_to(h.key, fen.players[uplayer].hand, j);
        }
        if (pl.journeys.length == 0) { add_transaction(cmd); }
        take_turn_fen();
        return;
      } else {
        select_error('hand cards do not match the group!');
        return;
      }
    } else {
      let suit = get_sequence_suit(j);
      let handkeys = handcards.map(x => x.key);
      if (firstCond(handkeys, x => x[1] != suit)) { select_error('hand card suit does not match the group!'); return; }
      let ij = j.findIndex(x => is_jolly(x));
      let j_has_jolly = ij > -1;
      let rank_to_be_relaced_by_jolly = j_has_jolly ? find_jolly_rank(j) : null;
      let r = rank_to_be_relaced_by_jolly;
      if (r) {
        j[ij] = r + suit + 'n';
      }
      keys = handkeys.concat(j);
      let allcards = keys.map(x => ferro_get_card(x));
      let jneeded = sortCardItemsToSequence(allcards, undefined, 0);
      if (jneeded == 0) {
        let seq = allcards.map(x => x.key);
        if (r) { arrReplace1(seq, r + suit + 'n', '*Hn'); }
        j.length = 0;
        j.push(...seq);
        for (const k of handkeys) { removeInPlace(fen.players[uplayer].hand, k); }
        if (pl.journeys.length == 0) { add_transaction(cmd); }
        take_turn_fen();
      } else {
        if (r != null) { j[ij] = '*Hn'; }
        select_error('hand cards cannot be added to sequence!');
        return;
      }
    }
  }
}
function fradd(card, targetgroup, targetcard) {
  let [oldgroup, oldindex] = untie_card(card);
  assertion(isdef(targetgroup.id), 'NO ID IN fradd!!!!!!!', targetgroup);
  add_card_to_group(card, oldgroup, oldindex, targetcard, targetgroup);
  if (targetgroup != oldgroup) cleanup_or_resplay(oldgroup);
}
function fritz() {
  const rankstr = 'A23456789TJQK*';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [], maxrounds: options.cycles * players.length };
    let n = players.length;
    fen.num_decks = 2 + (n >= 9 ? 2 : n >= 7 ? 1 : 0);
    fritz_new_table(fen, options);
    let deck = fen.deck;
    shuffle(fen.plorder);
    let starter = fen.starter = fen.plorder[0];
    fen.roundorder = jsCopy(fen.plorder);
    let handsize = valf(Number(options.handsize), 11);
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(deck, plname == starter ? handsize + 1 : handsize),
        loosecards: [],
        time_left: options.seconds_per_game * 1000,
        score: 0,
        name: plname,
        color: get_user_color(plname),
      };
    }
    [fen.phase, fen.stage, fen.turn] = ['', 'card_selection', [starter]];
    return fen;
  }
  function activate_ui() { fritz_activate_ui(); }
  function check_gameover() { return isdef(Z.fen.winners) ? Z.fen.winners : false; }
  function present(dParent) { fritz_present(dParent); }
  function stats(dParent) { fritz_stats(dParent); }
  function state_info(dParent) { fritz_state_info(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, present, state_info, stats };
}
function fritz_activate_ui() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  A.autosubmit = false;
  new_cards_animation(1);
  round_change_animation(1);
  select_add_items(ui_get_hand_items(uplayer), end_of_turn_fritz, 'must drag drop cards to assemble groups, then discard 1 hand card', 0, 1);
  A.items.map(x => iDiv(x).onclick = ev => {
    let card = Items[x.id];
    let item = x;
    clear_quick_buttons();
    select_last(item, select_toggle, ev);
    if (item.index == A.selected[0]) {
      let pos = get_mouse_pos(ev);
      let b = DA.bQuick = mButton('discard', ev => {
        b.remove();
        end_of_turn_fritz();
      }, document.body, { position: 'absolute', left: pos.x - 40, top: pos.y - 10 }, 'selectbutton');
    }
  });
  UI.timer = select_timer(fen.players[uplayer].time_left + Z.options.seconds_per_move * 1000, end_of_turn_fritz);
}
function fritz_card(ckey, h, w, ov, draggable) {
  let type = ckey[2];
  let info = ckey[0] == '*' ? get_joker_info() : jsCopy(C52Cards[ckey.substring(0, 2)]);
  info.key = ckey;
  info.cardtype = ckey[2];
  let [r, s] = [info.rank, info.suit];
  info.val = r == '*' ? 25 : r == 'A' ? 1 : 'TJQK'.includes(r) ? 10 : Number(r);
  info.color = RED;
  info.sz = info.h = valf(h, Config.ui.card.h);
  info.w = valf(w, info.sz * .7);
  info.irank = '23456789TJQKA*'.indexOf(r);
  info.isuit = 'SHCDJ'.indexOf(s);
  info.isort = info.isuit * 14 + info.irank;
  let card = cardFromInfo(info, h, w, ov);
  card.id = iDiv(card).id = getUID('c');
  Items[card.id] = card;
  if (draggable && Z.role == 'active') mDraggable(card);
  return card;
}
function fritz_get_card(ckey, h, w, ov = .25) { return fritz_card(ckey, h, w, ov, true); }
function fritz_get_hint_card(ckey) { return fritz_card(ckey, 50, 30, .25, false); }
function fritz_new_player_hands(fen, starter, options) {
  let handsize = options.handsize;
  let deck = fen.deck;
  for (const plname of fen.plorder) {
    let pl = fen.players[plname];
    pl.hand = deck_deal(deck, plname == starter ? handsize + 1 : handsize);
    pl.loosecards = [];
    pl.time_left = options.seconds_per_game * 1000;
    pl.roundchange = true;
    delete pl.handsorting;
    delete pl.newcards;
  }
}
function fritz_new_table(fen, options) {
  fen.deck = create_fen_deck('n', fen.num_decks, 0);
  fen.deck_discard = [];
  fen.journeys = [];
  fen.loosecards = arrRepeat(options.jokers, '*Hn');
  shuffle(fen.deck);
}
function fritz_present(dParent) {
  DA.hovergroup = null;
  let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent); mFlexWrap(dOpenTable)
  Config.ui.card.h = 130;
  Config.ui.container.h = Config.ui.card.h + 30;
  if (isEmpty(fen.deck_discard)) {
    mText('discard pile is empty!', dOpenTable);
    ui.deck_discard = { items: [] }
  } else {
    mText('discard pile:', dOpenTable); mLinebreak(dOpenTable);
    let deck_discard = ui.deck_discard = ui_type_hand(fen.deck_discard, dOpenTable, { maright: 25 }, 'deck_discard', null, fritz_get_card, true);
    let i = 0; deck_discard.items.map(x => { x.source = 'discard'; x.index = i++ });
  }
  mLinebreak(dOpenTable);
  mDiv(dOpenTable, { box: true, w: '100%' }, null, '<hr>');
  let ddarea = UI.ddarea = mDiv(dOpenTable, { border: 'dashed 1px black', bg: '#eeeeee80', box: true, hmin: 162, wmin: 245, padding: '5px 50px 5px 5px', margin: 5 });
  mDroppable(ddarea, drop_card_fritz, dragover_fritz); ddarea.id = 'dOpenTable'; Items[ddarea.id] = ddarea;
  mFlexWrap(ddarea)
  fritz_stats(dRechts);
  show_history(fen, dRechts);
  DA.TJ = [];
  for (const j of fen.journeys) {
    let cards = j.map(x => fritz_get_card(x));
    frnew(cards[0], { target: 'hallo' });
    for (let i = 1; i < cards.length; i++) { fradd(cards[i], Items[cards[0].groupid]); }
  }
  let loosecards = ui.loosecards = jsCopy(fen.loosecards).map(c => fritz_get_card(c));
  for (const plname of fen.plorder) {
    let cards = fen.players[plname].loosecards.map(c => fritz_get_card(c));
    cards.map(x => x.owner = plname);
    loosecards = loosecards.concat(cards);
  }
  for (const looseui of loosecards) {
    let card = looseui;
    frnew(card, { target: 'hallo' });
  }
  for (const group of DA.TJ) {
    assertion(isdef(group.id), 'no group id', group);
    let d = iDiv(group);
    let ch = arrChildren(iDiv(group));
    let cards = ch.map(x => Items[x.id]);
    cards.map(x => mDroppable(x, drop_card_fritz, dragover_fritz));
  }
  if (arrChildren(ddarea).length == 0) {
    let d = mDiv(ddarea, { 'pointer-events': 'none', maleft: 45, align: 'center', hmin: 40, w: '100%', fz: 12, fg: 'dimgray' }, 'ddhint', 'drag and drop cards here');
  }
  ui.players = {};
  let uname_plays = fen.plorder.includes(Z.uname);
  let plmain = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
  fritz_present_player(plmain, dMiddle);
  if (TESTING) {
    for (const plname of arrMinus(fen.plorder, plmain)) {
      fritz_present_player(plname, dMiddle);
    }
  }
  show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname, { left: 58, bottom: -1 });
}
function fritz_present_player(playername, dMiddle) {
  let [fen, ui, stage] = [Z.fen, UI, Z.stage];
  let pl = fen.players[playername];
  let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 10, border: `2px ${get_user_color(playername)} solid` };
  let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(playername, 25)); mFlexWrap(d); mLinebreak(d, 10);
  pl.hand = correct_handsorting(pl.hand, playername);
  let upl = ui.players[playername] = { div: d };
  upl.hand = ui_type_hand(pl.hand, d, {}, `players.${playername}.hand`, 'hand', fritz_get_card);
  upl.hand.items.map(x => x.source = 'hand');
  let ploose = pl.loosecards;
  if (!isEmpty(ploose)) {
    upl.loose = ui_type_market(ploose, d, {}, `players.${playername}.loose`, 'untouchables', fritz_get_hint_card);
    upl.loose.items.map(x => x.source = 'loose');
  } else {
  }
}
function fritz_state_info(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  dParent.innerHTML = `Round ${Z.round}:&nbsp;player: ${user_html} `;
}
function fritz_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent);
  let fen = Z.fen;
  console.log('players', get_keys(fen.players));
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    console.log('uname', plname);
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mLinebreak(d);
    player_stat_count('hand with fingers splayed', calc_hand_value(pl.hand.concat(pl.loosecards), fritz_get_card), d);
    player_stat_count('star', pl.score, d);
    if (fen.turn.includes(plname)) { show_hourglass(plname, d, 30, { left: -3, top: 0 }); }
    else if (!fen.plorder.includes(plname)) mStyle(d, { opacity: 0.5 });
  }
}
function frnew(card, ev) {
  let [oldgroup, oldindex] = untie_card(card);
  let id = getUID('g');
  let d = mDiv(Items.dOpenTable, { display: 'grid', margin: 10 }, id);
  let targetgroup = { div: d, id: id, ids: [], ov: .5222 };
  assertion(isdef(DA.TJ), 'DA.TJ undefined in frnew!!!');
  DA.TJ.push(targetgroup);
  Items[id] = targetgroup;
  assertion(isdef(targetgroup.id), 'NO ID IN frnew!!!!!!!', targetgroup);
  add_card_to_group(card, oldgroup, oldindex, null, targetgroup);
  if (targetgroup != oldgroup) cleanup_or_resplay(oldgroup);
}
function from_server(result, type) {
  if (type == "modify_table") { console.log('______from server:', type, '\nresult:', result); }
  if (result.trim() == "") return;
  var obj = JSON.parse(result);
  convert_from_server(obj);
  switch (type) {
    case "intro": got_intro(obj); break;
    case 'non_admin_reload': got_non_admin_reload(obj); break;
    case "games": got_games(obj); break;
    case "play_start": got_play_start(obj); break;
    case "play": got_play(obj); break;
    case 'modify_table': got_modify_table(obj); break;
    case 'create_table_and_start': got_create_table(obj); break;
    case 'send_move': got_send_move(obj); break;
    case 'seen': poll_for_table_seen_or_deleted(); break;
    case 'standard_assets':
    case 'assets': assets_parse(obj.response); break;
    case 'dictionary': got_dictionary(obj); break;
    case "get_tables": got_tables(obj); break;
    case "get_user_game_tables": got_user_game_tables(obj); break;
    case "poll_table_started": check_poll_table_started(obj); break;
    case "poll_table_show": check_poll_table_show(obj); break;
    case "poll_table_seen": check_poll_table_seen(obj); break;
    case "get_past_tables": test_user_endscreen(obj); break;
    case "contacts": present_contacts(obj); break;
    case "login": present_login(obj); break;
    case "dbsave": console.log('db has been saved to server:'); break;
    case 'delete_table': get_games(obj); break;
    case 'save_and_delete': alert(`${obj.message}, ranking:${obj.fen}`);
      console.assert(is_admin(), 'SAVE_AND_DELETE NOT SENT BEI ADMIN!!!!');
      get_games();
      break;
    case 'create_table':
      Session.cur_tid = obj.table.id;
      Session.cur_table = obj.table;
      break;
    case "join_table":
      status_message('You have joined the game! Wait for the host to start it!');
      update_cur_table(obj, 'red');
      break;
    case "toggle_join":
      let t = obj.table;
      let st = obj.player_status;
      update_cur_table(obj, st == 'joined' ? 'red' : 'orange');
      status_message(`You have ${st == 'joined' ? 'joined' : 'left'} the game! Wait for the host to start it!`);
      break;
    case "start_table":
      update_cur_table(obj, 'green');
      status_message('You have started the game! ', obj.table.status);
      break;
    default: break;
  }
  danext();
}
function gamestep() {
  show_admin_ui();
  DA.running = true; clear_screen(); dTable = mBy('dTable'); mClass('dTexture', 'wood');
  if (Z.game == 'aristo') { if (Z.role != Clientdata.role || Z.mode == 'multi' && Z.role != 'active') mFall(dTable); Clientdata.role = Z.role; }
  else mFall(dTable);
  shield_off();
  show_title();
  show_role();
  Z.func.present(dTable);
  if (isdef(Z.scoring.winners)) { show_winners(); animatedTitle('GAMEOVER!'); }
  else if (Z.func.check_gameover(Z)) {
    let winners = show_winners();
    Z.scoring = { winners: winners }
    sendgameover(winners[0], Z.friendly, Z.fen, Z.scoring);
  } else if (is_shield_mode()) {
    staticTitle();
    if (!DA.no_shield == true) { hide('bRestartMove'); shield_on(); }
    autopoll();
  } else {
    Z.A = { level: 0, di: {}, ll: [], items: [], selected: [], tree: null, breadcrumbs: [], sib: [], command: null, autosubmit: Config.autosubmit };
    copyKeys(jsCopy(Z.fen), Z);
    copyKeys(UI, Z);
    activate_ui(Z);
    Z.func.activate_ui();
    if (Z.isWaiting == true || Z.mode != 'multi') staticTitle(); else animatedTitle();
    if (Z.options.zen_mode != 'yes' && Z.mode != 'hotseat' && Z.fen.keeppolling && Z.uplayer_data.player_status != 'stop') {
      autopoll();
      console.log('gamestep autopoll');
    }
  }
  if (TESTING == true) landing();
}
function generate_table_name(n) {
  let existing = Serverdata.tables.map(x => x.friendly);
  while (true) {
    let cap = rChoose(Info.capital);
    let parts = cap.split(' ');
    if (parts.length == 2) cap = stringBefore(cap, ' '); else cap = stringBefore(cap, '-');
    cap = cap.trim();
    let s = (n == 2 ? 'duel of ' : rChoose(['battle of ', 'war of '])) + cap;
    if (!existing.includes(s)) return s;
  }
}
function generateChoices(){
  let choices=[];
  for(const cand of candidates){
    let o=            {
      value: cand.ID,
      imageLink: cand.thumbnail, //"https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
      text: cand.title, // `<span class="itemText">${cand.title}</span>`,
      imageWidth: 250,
      imageHeight: 150,
      imageFit: "cover"
};
    choices.push(o);
  }
  return choices;
}
function get_admin_player(list) {
  let res = valf(firstCond(list, x => x == 'mimi'), firstCond(list, x => ['felix', 'amanda', 'lauren'].includes(x)));
  return res ?? list[0];
}
function get_available_goals(plname) {
  return Z.fen.availableGoals.filter(x => !Z.fen.players[plname].goals[x]);
}
function get_chats(e) { get_data({ username: CURRENT_CHAT_USER }, "chats"); }
function get_checked_radios(rg) {
  let inputs = rg.getElementsByTagName('INPUT');
  let list = [];
  for (const ch of inputs) {
    if (ch.checked) list.push(ch.value);
  }
  return list;
}
function get_contacts(e) { get_data({}, "contacts"); }
function get_container_styles(styles = {}) { let defaults = valf(Config.ui.container, {}); defaults.position = 'relative'; addKeys(defaults, styles); return styles; }
function get_containertitle_styles(styles = {}) { let defaults = valf(Config.ui.containertitle, {}); defaults.position = 'absolute'; addKeys(defaults, styles); return styles; }
function get_data(find, type) {
  var xml = new XMLHttpRequest();
  var loader_holder = mBy("loader_holder");
  loader_holder.className = "loader_on";
  xml.onload = function () {
    if (xml.readyState == 4 || xml.status == 200) {
      loader_holder.className = "loader_off";
      handle_result(xml.responseText, type);
    }
  }
  var data = {};
  data.find = find;
  data.data_type = type;
  data = JSON.stringify(data);
  xml.open("POST", "test.php", true);
  xml.send(data);
}
function get_dictionary() {
  let u = DB.users[Session.cur_user];
  let lang = valf(u.lang, 'E');
  if (isdef(Dictionary) && isdef(Dictionary[lang])) return;
  to_server(lang, 'dictionary');
}
function get_game_option(g, key) {
  let set_option = lookup(Session, ['cur_table', 'options', key]);
  if (set_option) return set_option;
  let opts = g.options[key];
  let defval = opts.split(',')[0];
  return defval;
}
function get_games() {
  let d = mBy('inner_left_panel');
  d.innerHTML = "GAMES ARE DISPLAYED HERE!";
  get_data({ assets: nundef(Syms) }, 'games');
}
function get_group_rank(j) { let non_jolly_key = firstCond(j, x => !is_jolly(x)); return non_jolly_key[0]; }
function get_image_path(userdata) {
  let p = '../base/assets/images/';
  if (userdata.image) p += userdata.name; else p += 'unknown_user';
  p += '.jpg';
  if (is_online()) p += '?=' + Date.now();
  return p;
}
function get_joker_info() {
  return {
    c52key: `card_0J`,
    color: "#e6194B",
    friendly: "Joker",
    key: '*Hn',
    h: 100,
    irank: 14,
    isort: 100,
    isuit: 3,
    ov: 0.25,
    rank: "*",
    short: "J",
    suit: "H",
    sz: 100,
    val: 1,
    w: 70,
  };
}
function get_keys(o) { return Object.keys(o); }
function get_logout_button() {
  let html = `<a id="aLogout" href="javascript:onclick_logout()">logout</a>`;
  return mCreateFrom(html);
}
function get_mouse_pos(ev) {
  let x = ev.pageX - document.body.scrollLeft;
  let y = ev.pageY - document.body.scrollTop;
  return ({ x: x, y: y });
}
function get_multi_trigger() { return lookup(Z, ['fen', 'trigger']); }
function get_next_human_player(plname) {
  if (nundef(plname)) return null;
  let [prevturn, mode, turn, uname, plorder, fen, host] = [Z.prev.turn, Z.mode, Z.turn, Z.uname, Z.plorder, Z.fen, Z.host];
  let same = isString(plname) && isList(prevturn) && sameList(prevturn, turn);
  if (!same) return null;
  let plnew = get_next_player(Z, plname);
  while (fen.players[plnew].playmode == 'bot') {
    plnew = get_next_player(Z, plnew);
    if (plnew == plname) break;
  }
  return plnew;
}
function get_next_in_list(el, list) {
  let iturn = list.indexOf(el);
  let nextplayer = list[(iturn + 1) % list.length];
  return nextplayer;
}
function get_next_player(g, uname) {
  let plorder = g.fen.plorder;
  let iturn = plorder.indexOf(uname);
  let nextplayer = plorder[(iturn + 1) % plorder.length];
  return nextplayer;
}
function get_play(e) {
  get_data({ username: Username, gamename: CURRENT_GAME, assets: nundef(Syms) }, "play");
}
function get_play_start() { Session.cur_menu = 'play'; to_server({ uname: Session.cur_user, tid: Session.cur_tid }, 'play_start'); }
function get_player_score(plname) { ensure_score(plname); return Z.fen.players[plname].score; }
function get_playmode(uname) { return Z.fen.players[uname].playmode; }
function get_preferred_lang(uname) { return lookup(DB.users, [uname, 'lang']) ?? 'E'; }
function get_present_order() {
  let [fen, uplayer, uname] = [Z.fen, Z.uplayer, Z.uname];
  let uname_plays = fen.plorder.includes(Z.uname);
  let show_first = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
  return arrCycle(Z.fen.plorder, Z.fen.plorder.indexOf(show_first));
}
function get_round_goal() { return Z.fen.roundGoals[Z.round - 1]; }
function get_score_fen_from_cur_players() {
  let players = get_values(Session.cur_players);
  let sorted = sortByDescending(players, 'score');
  let list = sorted.map(x => `${x.name}:${x.score}`);
  let fen = list.join(',');
  return fen;
}
function get_screen_distance(child, newParent) {
  child = toElem(child);
  newParent = toElem(newParent);
  const parentOriginal = child.parentNode;
  let children = arrChildren(parentOriginal);
  let iChild = children.indexOf(child);
  let sibling = iChild == children.length - 1 ? null : children[iChild + 1];
  const x0 = child.getBoundingClientRect().left;
  const y0 = child.getBoundingClientRect().top;
  newParent.appendChild(child);
  const x1 = child.getBoundingClientRect().left;
  const y1 = child.getBoundingClientRect().top;
  if (sibling) parentOriginal.insertBefore(child, sibling); else parentOriginal.appendChild(child);
  return [x1 - x0, y1 - y0];
}
function get_sequence_suit(j) { let non_jolly_key = firstCond(j, x => !is_jolly(x)); return non_jolly_key[1]; }
function get_slot_diff(fen) { return Math.floor(100 / fen.plorder.length); }
function get_splay_number(wsplay) { return wsplay == 'none' ? 0 : wsplay == 'left' ? 1 : wsplay == 'right' ? 2 : wsplay == 'up' ? 3 : 4; }
function get_startlevel(user, game) { return lookup(DB.users, [user, 'games', game, 'startlevel']) ?? lookup(DB.games, [game, 'def_startlevel']) ?? 0; }
function get_texture(name) { return `url(../base/assets/textures/${name}.png)`; }
function get_timestamp() { return Date.now(); }
function get_user_color(uname) { let u = firstCond(Serverdata.users, x => x.name == uname); return colorFrom(u.color); }
function get_user_in_intro_screen(username) {
  load_user(username);
  get_dictionary();
  got_user_in_intro_screen();
}
function get_user_names() { return Object.keys(DB.users); }
function get_user_pic(uname, sz = 50, border = 'solid medium white') {
  let html = get_user_pic_html(uname, sz, border);
  return mCreateFrom(html);
}
function get_user_pic_and_name(uname, dParent, sz = 50, border = 'solid medium white') {
  let html = `
      <div username='${uname}' style='text-align:center;font-size:${sz / 2.8}px'>
        <img src='../base/assets/users/${uname}.jpg' width='${sz}' height='${sz}' class='img_person' style='margin:0;border:${border}'>
        <div style='margin-top:${-sz / 6}px'>${uname}</div>
      </div>`;
  let elem = mCreateFrom(html);
  mAppend(dParent, elem);
  return elem;
}
function get_user_pic_html(uname, sz = 50, border = 'solid medium white') {
  return `<img src='../base/assets/users/${uname}.jpg' width='${sz}' height='${sz}' class='img_person' style='margin:0px 4px;border:${border}'>`
}
function get_values(o) { return Object.values(o); }
function get_waiting_html(sz = 30) { return `<img src="../assets/icons/active_player.gif" height="${sz}" style="margin:0px ${sz / 3}px" />`; }
function get3ColLine(dParent, idleft, idmiddle, idright, styles = {}) {
  let dOuter = mDiv(dParent);
  let middleStyles = { fz: styles.fz, family: styles.family };
  delete styles.fz; delete styles.family;
  styles = mergeOverride({ wmin: '100%', hmin: 30, vpadding: 4, hpadding: 10, box: true }, styles);
  mStyleX(dOuter, styles);
  let dInner = mDiv(dOuter, { position: 'relative' });
  let l = mDiv(dInner, { family: 'arial', fz: 16, display: 'inline-block', position: 'absolute', wmin: 20 }, idleft)
  let m = mDiv(dInner, { fz: middleStyles.fz, family: middleStyles.family, w: '100%', align: 'center' }, idmiddle);
  let r = mDiv(dInner, { family: 'arial', fz: 16, display: 'inline-block', position: 'absolute', wmin: 20, top: 0, right: 0 }, idright);
  return dOuter;
}
function get3ColLineName(dParent, name, styles = {}) {
  name = 'd' + capitalize(name);
  let dLine = get3ColLine(dParent, name + 'Left', name, name + 'Right', styles);
  return dLine;
}
function getAnimals() {
  let gr = 'Animals & Nature';
  let result = [];
  for (const sg in ByGroupSubgroup[gr]) {
    if (startsWith(sg, 'anim')) result = result.concat(ByGroupSubgroup[gr][sg]);
  }
  return result;
}
function getColorDictColor(c) { return isdef(ColorDict[c]) ? ColorDict[c].c : c; }
function getColorHexes(x) {
  return [
    'f0f8ff',
    'faebd7',
    '00ffff',
    '7fffd4',
    'f0ffff',
    'f5f5dc',
    'ffe4c4',
    '000000',
    'ffebcd',
    '0000ff',
    '8a2be2',
    'a52a2a',
    'deb887',
    '5f9ea0',
    '7fff00',
    'd2691e',
    'ff7f50',
    '6495ed',
    'fff8dc',
    'dc143c',
    '00ffff',
    '00008b',
    '008b8b',
    'b8860b',
    'a9a9a9',
    'a9a9a9',
    '006400',
    'bdb76b',
    '8b008b',
    '556b2f',
    'ff8c00',
    '9932cc',
    '8b0000',
    'e9967a',
    '8fbc8f',
    '483d8b',
    '2f4f4f',
    '2f4f4f',
    '00ced1',
    '9400d3',
    'ff1493',
    '00bfff',
    '696969',
    '696969',
    '1e90ff',
    'b22222',
    'fffaf0',
    '228b22',
    'ff00ff',
    'dcdcdc',
    'f8f8ff',
    'ffd700',
    'daa520',
    '808080',
    '808080',
    '008000',
    'adff2f',
    'f0fff0',
    'ff69b4',
    'cd5c5c',
    '4b0082',
    'fffff0',
    'f0e68c',
    'e6e6fa',
    'fff0f5',
    '7cfc00',
    'fffacd',
    'add8e6',
    'f08080',
    'e0ffff',
    'fafad2',
    'd3d3d3',
    'd3d3d3',
    '90ee90',
    'ffb6c1',
    'ffa07a',
    '20b2aa',
    '87cefa',
    '778899',
    '778899',
    'b0c4de',
    'ffffe0',
    '00ff00',
    '32cd32',
    'faf0e6',
    'ff00ff',
    '800000',
    '66cdaa',
    '0000cd',
    'ba55d3',
    '9370db',
    '3cb371',
    '7b68ee',
    '00fa9a',
    '48d1cc',
    'c71585',
    '191970',
    'f5fffa',
    'ffe4e1',
    'ffe4b5',
    'ffdead',
    '000080',
    'fdf5e6',
    '808000',
    '6b8e23',
    'ffa500',
    'ff4500',
    'da70d6',
    'eee8aa',
    '98fb98',
    'afeeee',
    'db7093',
    'ffefd5',
    'ffdab9',
    'cd853f',
    'ffc0cb',
    'dda0dd',
    'b0e0e6',
    '800080',
    '663399',
    'ff0000',
    'bc8f8f',
    '4169e1',
    '8b4513',
    'fa8072',
    'f4a460',
    '2e8b57',
    'fff5ee',
    'a0522d',
    'c0c0c0',
    '87ceeb',
    '6a5acd',
    '708090',
    '708090',
    'fffafa',
    '00ff7f',
    '4682b4',
    'd2b48c',
    '008080',
    'd8bfd8',
    'ff6347',
    '40e0d0',
    'ee82ee',
    'f5deb3',
    'ffffff',
    'f5f5f5',
    'ffff00',
    '9acd32'
  ];
}
function getColorNames() {
  return [
    'AliceBlue',
    'AntiqueWhite',
    'Aqua',
    'Aquamarine',
    'Azure',
    'Beige',
    'Bisque',
    'Black',
    'BlanchedAlmond',
    'Blue',
    'BlueViolet',
    'Brown',
    'BurlyWood',
    'CadetBlue',
    'Chartreuse',
    'Chocolate',
    'Coral',
    'CornflowerBlue',
    'Cornsilk',
    'Crimson',
    'Cyan',
    'DarkBlue',
    'DarkCyan',
    'DarkGoldenRod',
    'DarkGray',
    'DarkGrey',
    'DarkGreen',
    'DarkKhaki',
    'DarkMagenta',
    'DarkOliveGreen',
    'DarkOrange',
    'DarkOrchid',
    'DarkRed',
    'DarkSalmon',
    'DarkSeaGreen',
    'DarkSlateBlue',
    'DarkSlateGray',
    'DarkSlateGrey',
    'DarkTurquoise',
    'DarkViolet',
    'DeepPink',
    'DeepSkyBlue',
    'DimGray',
    'DimGrey',
    'DodgerBlue',
    'FireBrick',
    'FloralWhite',
    'ForestGreen',
    'Fuchsia',
    'Gainsboro',
    'GhostWhite',
    'Gold',
    'GoldenRod',
    'Gray',
    'Grey',
    'Green',
    'GreenYellow',
    'HoneyDew',
    'HotPink',
    'IndianRed',
    'Indigo',
    'Ivory',
    'Khaki',
    'Lavender',
    'LavenderBlush',
    'LawnGreen',
    'LemonChiffon',
    'LightBlue',
    'LightCoral',
    'LightCyan',
    'LightGoldenRodYellow',
    'LightGray',
    'LightGrey',
    'LightGreen',
    'LightPink',
    'LightSalmon',
    'LightSeaGreen',
    'LightSkyBlue',
    'LightSlateGray',
    'LightSlateGrey',
    'LightSteelBlue',
    'LightYellow',
    'Lime',
    'LimeGreen',
    'Linen',
    'Magenta',
    'Maroon',
    'MediumAquaMarine',
    'MediumBlue',
    'MediumOrchid',
    'MediumPurple',
    'MediumSeaGreen',
    'MediumSlateBlue',
    'MediumSpringGreen',
    'MediumTurquoise',
    'MediumVioletRed',
    'MidnightBlue',
    'MintCream',
    'MistyRose',
    'Moccasin',
    'NavajoWhite',
    'Navy',
    'OldLace',
    'Olive',
    'OliveDrab',
    'Orange',
    'OrangeRed',
    'Orchid',
    'PaleGoldenRod',
    'PaleGreen',
    'PaleTurquoise',
    'PaleVioletRed',
    'PapayaWhip',
    'PeachPuff',
    'Peru',
    'Pink',
    'Plum',
    'PowderBlue',
    'Purple',
    'RebeccaPurple',
    'Red',
    'RosyBrown',
    'RoyalBlue',
    'SaddleBrown',
    'Salmon',
    'SandyBrown',
    'SeaGreen',
    'SeaShell',
    'Sienna',
    'Silver',
    'SkyBlue',
    'SlateBlue',
    'SlateGray',
    'SlateGrey',
    'Snow',
    'SpringGreen',
    'SteelBlue',
    'Tan',
    'Teal',
    'Thistle',
    'Tomato',
    'Turquoise',
    'Violet',
    'Wheat',
    'White',
    'WhiteSmoke',
    'Yellow',
    'YellowGreen'
  ];
}
function getCssVar(varname) { return getComputedStyle(document.body).getPropertyValue(varname); }
function getDynId(loc, oid) { return loc + '@' + oid; }
function getExtendedColors(bg, fg) {
  bg = computeColor(bg);
  fg = computeColor(fg);
  if (bg == 'inherit' && (nundef(fg) || fg == 'contrast')) {
    fg = 'inherit';
  } else if (fg == 'contrast' && isdef(bg) && bg != 'inherit') fg = colorIdealText(bg);
  else if (bg == 'contrast' && isdef(fg) && fg != 'inherit') { bg = colorIdealText(fg); }
  return [bg, fg];
}
function getFunctionsNameThatCalledThisFunction() {
  let c1 = getFunctionsNameThatCalledThisFunction.caller;
  if (nundef(c1)) return 'no caller!';
  let c2 = c1.caller;
  if (nundef(c2)) return 'no caller!';
  return c2.name;
}
function getGSGElements(gCond, sCond) {
  let keys = [];
  let byg = ByGroupSubgroup;
  for (const gKey in byg) {
    if (!gCond(gKey)) continue;
    for (const sKey in byg[gKey]) {
      if (!sCond(sKey)) continue;
      keys = keys.concat(byg[gKey][sKey]);
    }
  }
  return keys.sort();
}
function getItem(k) { return infoToItem(Syms[k]); }
function getKeySets() {
  makeCategories();
  let res = {};
  for (const k in Syms) {
    let info = Syms[k];
    if (nundef(info.cats)) continue;
    for (const ksk of info.cats) {
      lookupAddIfToList(res, [ksk], k);
    }
  }
  res.animals = getAnimals();
  res.nature = getNature();
  localStorage.setItem('KeySets', JSON.stringify(res));
  return res;
}
function getModel() {
  return {
    "logoFit": "none",
    "logoPosition": "right",
    "showPageTitles": true,
    "showPrevButton": false,
    "showCompletedPage": false,
    "showProgressBar": "none",
    "completeText": "Submit",
    "widthMode": "responsive",
    "showQuestionNumbers": "on",
    "showQuestionNumbers": "off",
  };
}
function getNature() {
  let gr = 'Animals & Nature';
  let result = [];
  for (const sg in ByGroupSubgroup[gr]) {
    result = result.concat(ByGroupSubgroup[gr][sg]);
  }
  return result;
}
function getParams(areaName, oSpec, oid) {
  let params = oSpec.params ? oSpec.params : {};
  let panels = oSpec.panels ? oSpec.panels : [];
  let num = panels.length;
  let or = params.orientation ? params.orientation == 'h' ? 'rows'
    : 'columns' : DEF_ORIENTATION;
  let split = params.split ? params.split : DEF_SPLIT;
  let bg = oSpec.color ? oSpec.color : randomColor();
  let fg = bg ? colorIdealText(bg) : null;
  let id = oSpec.id ? oSpec.id : areaName;
  if (oid) { id = getDynId(id, oid); }
  let parent = mBy(areaName);
  if (oSpec.id) {
    parent.id = id;
    addAREA(id, oSpec);
    parent.innerHTML = id;
  }
  if (bg) { mColor(parent, bg, fg); }
  return [num, or, split, bg, fg, id, panels, parent];
}
function getRect(elem, relto) {
  if (isString(elem)) elem = document.getElementById(elem);
  let res = elem.getBoundingClientRect();
  if (isdef(relto)) {
    let b2 = relto.getBoundingClientRect();
    let b1 = res;
    res = {
      x: b1.x - b2.x,
      y: b1.y - b2.y,
      left: b1.left - b2.left,
      top: b1.top - b2.top,
      right: b1.right - b2.right,
      bottom: b1.bottom - b2.bottom,
      width: b1.width,
      height: b1.height
    };
  }
  let r = { x: res.left, y: res.top, w: res.width, h: res.height };
  addKeys({ l: r.x, t: r.y, r: r.x + r.w, b: r.y + r.h }, r);
  return r;
}
function getRelCoords(ev, elem) {
  let x = ev.pageX - elem.offset().left;
  let y = ev.pageY - elem.offset().top;
  return { x: x, y: y };
}
function getSizeNeeded(elem) {
  var d = elem.cloneNode(true);
  d.style.width = 'auto';
  document.body.appendChild(d);
  let cStyles = {};
  cStyles.position = 'fixed';
  cStyles.opacity = 0;
  cStyles.top = '-9999px';
  mStyle(d, cStyles);
  height = d.clientHeight;
  width = d.clientWidth;
  d.parentNode.removeChild(d);
  return { w: Math.round(width), h: Math.round(height) };
}
function getStyleProp(elem, prop) { return getComputedStyle(elem).getPropertyValue(prop); }
function getTextWidth(text, font) {
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  var context = canvas.getContext('2d');
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
function getTimeElapsed() { return TimeElapsed + msElapsedSince(TimestampStarted); }
function getTypeOf(param) {
  let type = typeof param;
  if (type == 'string') {
    return 'string';
  }
  if (type == 'object') {
    type = param.constructor.name;
    if (startsWith(type, 'SVG')) type = stringBefore(stringAfter(type, 'SVG'), 'Element').toLowerCase();
    else if (startsWith(type, 'HTML')) type = stringBefore(stringAfter(type, 'HTML'), 'Element').toLowerCase();
  }
  let lType = type.toLowerCase();
  if (lType.includes('event')) type = 'event';
  return type;
}
function getUID(pref = '') {
  UIDCounter += 1;
  return pref + '_' + UIDCounter;
}
function got_create_table(obj) { Session.cur_tid = obj.table.id; Session.cur_table = obj.table; present_table(obj); }
function got_dictionary(obj) {
  let lang = obj.lang;
  let x = obj.dict;
  Dictionary[lang] = to_words(x);
  return;
  let keys = get_keys(obj).filter(x => endsWith(x, 'dict'));
  console.log('keys', keys)
  if (isEmpty(keys)) return;
  if (nundef(Dictionary)) Dictionary = {};
  let l = obj.lang;
  for (const k of keys) {
    if (nundef(Dictionary[l])) {
      Dictionary[l] = to_words(obj[k]);
    }
  }
}
function got_games(obj) {
  let tables = obj.tables;
  let bygame = set_tables_by_game(obj, false);
  set_most_recent_table_as_cur_tid(tables);
  present_games();
}
function got_intro(obj) {
  Session.users = obj.users;
  Session.users_by_name = {};
  for (const u of Session.users) {
    Session.users_by_name[u.username] = u;
    if (isdef(DB.users[u.username])) { copyKeys(DB.users[u.username], u); }
  }
  present_intro();
}
function got_modify_table(obj) { Session.cur_tid = obj.table.id; Session.cur_table = obj.table; present_table(obj); }
function got_non_admin_reload(obj) {
  in_game_off();
  in_game_open_prompt_off();
  console.log('got_non_admin reload: obj', obj)
  set_tables_by_game(obj);
  tables = obj.tables;
  if (isEmpty(tables)) {
    console.assert(nundef(Session.cur_tid), 'reload no table still cur_tid!!!!!')
    get_user_in_intro_screen();
  } else {
    get_play_start();
  }
}
function got_play(obj) { present_table(obj); }
function got_play_start(obj) {
  console.log('got_play_start', obj);
  let table = obj.table;
  console.log('fen', table.fen);
  let lang = get_preferred_lang(Session.cur_user);
  set_start_data_from_fen(obj.table.fen, obj.table.game);
  let lang2 = get_preferred_lang(Session.cur_user);
  if (lang != lang2) get_dictionary();
  present_table(obj);
}
function got_send_move(obj) { present_table(obj); }
function got_tables(obj) {
  set_tables_by_game(obj);
  if (isdef(Session.cur_tid)) { get_play(); } else get_games();
}
function got_user_game_tables(obj) {
  let tables = obj.tables;
  if (!isEmpty(tables)) { Session.cur_tid = tables[0].id; Session.cur_table = tables[0]; }
}
function got_user_in_intro_screen() {
  show('dIntro'); clearElement('dIntro');
  intro_show_user_image(Session.cur_user);
  present_wait_for_table_to_start();
}
function handle_bid() {
  let [z, A, fen, uplayer, ui] = [Z, Z.A, Z.fen, Z.uplayer, UI];
  let oldbid = jsCopy(fen.oldbid);
  let bid = jsCopy(fen.newbid);
  let ranks = '23456789TJQKA';
  bid = normalize_bid(bid);
  let higher = is_bid_higher_than(bid, oldbid);
  if (bid[2] == 0) bid[2] = '_';
  if (!higher) {
    select_error('the bid you entered is not high enough!');
  } else {
    fen.lastbid = fen.players[uplayer].lastbid = bid;
    fen.lastbidder = uplayer;
    delete fen.oldbid; delete fen.newbid;
    Z.turn = [get_next_player(Z, uplayer)];
    take_turn_fen();
  }
}
function handle_gehtHoch() {
  let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
  let [bid, bidder] = [fen.lastbid, fen.lastbidder];
  let diff = calc_bid_minus_cards(fen, bid);
  let aufheber = uplayer;
  let loser = diff > 0 ? bidder : aufheber;
  let war_drin = fen.war_drin = diff <= 0;
  let loser_handsize = inc_handsize(fen, loser);
  new_deal(fen);
  let nextplayer;
  if (loser_handsize > Z.options.max_handsize) {
    nextplayer = get_next_player(Z, loser)
    let plorder = fen.plorder = remove_player(fen, loser);
  } else {
    nextplayer = loser;
  }
  fen.loser = loser; fen.bidder = bidder; fen.aufheber = aufheber;
  bluff_change_to_ack_round(fen, nextplayer);
  take_turn_fen();
}
function handle_result(result, cmd) {
  if (verbose) console.log('cmd', cmd, '\nresult', result);
  if (result.trim() == "") return;
  let obj;
  try { obj = JSON.parse(result); } catch { console.log('ERROR:', result); }
  if (Clientdata.AUTORESET) { Clientdata.AUTORESET = false; if (result.auto == true) { console.log('message bounced'); return; } }
  DA.result = jsCopy(obj);
  processServerdata(obj, cmd);
  switch (cmd) {
    case "assets": load_assets(obj); start_with_assets(); break;
    case "users": show_users(); break;
    case "tables": show_tables(); break;
    case "delete_table":
    case "delete_tables": show_tables(); break;
    case "table1":
      update_table();
      console.log('cmd', cmd)
      console.log('obj', obj)
      for (const k in obj) { if (isLiteral(obj[k])) { console.log(k, obj[k]); } }
      clear_timeouts();
      gamestep();
      break;
    case "gameover":
    case "table":
    case "startgame":
      update_table();
      if (Z.skip_presentation) { Z.func.state_info(mBy('dTitleLeft')); autopoll(); return; }
      clear_timeouts();
      gamestep();
      break;
  }
}
function hasDescendantOfTag(elem, tag) {
  return elem.querySelector(tag) !== null;
}
function hasParentWithDescendant(elem,tag='img') {
  let parent = elem.parentNode;
  return hasDescendantOfTag(parent,tag);
}
function hFunc(content, funcname, arg1, arg2, arg3) {
  let html = `<a style='color:blue' href="javascript:${funcname}('${arg1}','${arg2}','${arg3}');">${content}</a>`;
  return html;
}
function hide(elem) {
  if (isString(elem)) elem = document.getElementById(elem);
  if (nundef(elem)) return;
  if (isSvg(elem)) {
    elem.setAttribute('style', 'visibility:hidden;display:none');
  } else {
    elem.style.display = 'none';
  }
}
function hide_options_popup() { let d = mBy('dOptions'); if (isdef(d)) mRemove(d); }
function HPLayout() {
  if (isdef(UI.DRR)) UI.DRR.remove();
  mInsert(UI.dRechts, UI.dHistory);
  Clientdata.historyLayout = 'hp';
}
function HRPLayout() {
  let dr = UI.dRechts;
  dr.remove();
  let drr = UI.DRR = mDiv(dTable);
  mAppend(drr, UI.dHistory);
  mAppend(dTable, dr);
  Clientdata.historyLayout = 'hrp';
}
function HSLAToRGBA(hsla, isPct) {
  let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
  if (ex.test(hsla)) {
    let sep = hsla.indexOf(',') > -1 ? ',' : ' ';
    hsla = hsla
      .substr(5)
      .split(')')[0]
      .split(sep);
    if (hsla.indexOf('/') > -1) hsla.splice(3, 1);
    isPct = isPct === true;
    let h = hsla[0],
      s = hsla[1].substr(0, hsla[1].length - 1) / 100,
      l = hsla[2].substr(0, hsla[2].length - 1) / 100,
      a = hsla[3];
    if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
    else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
    else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360) h %= 360;
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    let pctFound = a.indexOf('%') > -1;
    if (isPct) {
      r = +((r / 255) * 100).toFixed(1);
      g = +((g / 255) * 100).toFixed(1);
      b = +((b / 255) * 100).toFixed(1);
      if (!pctFound) {
        a *= 100;
      } else {
        a = a.substr(0, a.length - 1);
      }
    } else if (pctFound) {
      a = a.substr(0, a.length - 1) / 100;
    }
    return 'rgba(' + (isPct ? r + '%,' + g + '%,' + b + '%,' + a + '%' : +r + ',' + +g + ',' + +b + ',' + +a) + ')';
  } else {
    return 'Invalid input color';
  }
}
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function HSLToRGB(hsl, isPct) {
  let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
  if (ex.test(hsl)) {
    let sep = hsl.indexOf(',') > -1 ? ',' : ' ';
    hsl = hsl
      .substr(4)
      .split(')')[0]
      .split(sep);
    isPct = isPct === true;
    let h = hsl[0],
      s = hsl[1].substr(0, hsl[1].length - 1) / 100,
      l = hsl[2].substr(0, hsl[2].length - 1) / 100;
    if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
    else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
    else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360) h %= 360;
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    if (isPct) {
      r = +((r / 255) * 100).toFixed(1);
      g = +((g / 255) * 100).toFixed(1);
      b = +((b / 255) * 100).toFixed(1);
    }
    return 'rgb(' + (isPct ? r + '%,' + g + '%,' + b + '%' : +r + ',' + +g + ',' + +b) + ')';
  } else {
    return 'Invalid input color';
  }
}
function hue(h) {
  var r = Math.abs(h * 6 - 3) - 1;
  var g = 2 - Math.abs(h * 6 - 2);
  var b = 2 - Math.abs(h * 6 - 4);
  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}
function i_am_acting_host() { return U.name == Z.fen.acting_host; }
function i_am_host() { return U.name == Z.host; }
function i_am_trigger() { return is_multi_trigger(U.name); }
function iAdd(item, liveprops={}, addprops={}) {
  let id, l;
  if (isString(item)) { id = item; item = valf(Items[id], {}); }
  let el = valf(liveprops.div, liveprops.ui, iDiv(item), null);
  id = valnwhite(addprops.id, item.id, (el ? el.id : getUID()), getUID());
  item.id = id; if (nundef(Items[id])) Items[id] = item; if (el) el.id = id;
  if (nundef(item.live)) item.live = {};
  l = item.live;
  for (const k in liveprops) {
    let val = liveprops[k];
    if (nundef(val)) { continue; }
    l[k] = val;
    if (isdef(val.id) && val.id != id) { lookupAddIfToList(val, ['memberOf'], id); }
  }
  if (isdef(addprops)) copyKeys(addprops, item);
  return item;
}
function iClear(item) {
  if (nundef(item)) return;
  if (isString(item)) { let id = item; if (isdef(Items[id])) item = Items[id]; else item = toElem(id); }
  let d = iDiv(item);
  if (isdef(d)) {
    let desc = Array.from(d.querySelectorAll('[id]:not([id=""])'));
    desc = desc.filter(x => isdef(Items[x.id]))
    for (const item1 of desc) iDelete(item1.id);
    mClear(d);
  }
}
function iDelete(id) {
  delete Items[id];
}
function iDiv(i) { return isdef(i.live) ? i.live.div : valf(i.div, i.ui, i); } //isdef(i.div) ? i.div : i; }
function if_hotseat_autoswitch(result) {
  if (isdef(result.table) && isdef(Z) && Z.mode == 'hotseat') {
    let turn = lookup(result, ['table', 'fen', 'turn']);
    assertion(isdef(turn), 'turn is NOT defined (_sendSIMSIM) !!!!');
    let uname = turn.length == 1 ? turn[0] : arrNext(turn, U.name);
    if (uname != U.name) switch_uname(uname);
  }
}
function if_stringified(obj) { return is_stringified(obj) ? JSON.parse(obj) : obj; }
function iHigh(item) { let d = iDiv(item); mStyle(d, { bg: 'darkgray' }); }
function iMeasure(item, sizingOptions) {
  if (nundef(iDiv(item))) return;
  setRect(iDiv(item), valf(sizingOptions, { hgrow: true, wgrow: true }));
}
function in_game() { return isdef(mBy('table')) && Session.in_game == `${Session.cur_user} ${Session.cur_tid}`; }
function in_game_off() { Session.in_game = null; }
function in_game_on() { Session.in_game = `${Session.cur_user} ${Session.cur_tid}`; }
function in_game_open_prompt() { return uiActivated && Session.in_prompt == `${Session.cur_user} ${Session.cur_tid}`; }
function in_game_open_prompt_off() { Session.in_prompt = null; }
function in_game_open_prompt_on() { Session.in_prompt = `${Session.cur_user} ${Session.cur_tid}`; }
function inc_handsize(fen, uname) {
  let pl = fen.players[uname];
  pl.handsize = Number(pl.handsize) + 1;
  return pl.handsize;
}
function inc_player_score(plname) { ensure_score(plname); return Z.fen.players[plname].score += 1; }
function increase_handicap_if_losestreak(losers, game) {
  console.log('winners', losers);
  for (const w of losers) {
    let o = lookupSet(DB.users, [w, 'games', game], {});
    if (nundef(o.losestreak)) o.losestreak = 1; else o.losestreak += 1;
    if (o.losestreak >= 1) {
      lookupSetOverride(o, ['startlevel'], Math.max(o.startlevel - 1, 0));
      o.losestreak = 0;
      console.log('...startlevel of', w, 'is decreased to', get_startlevel(w, game));
    }
  }
}
function infoToItem(x) { let item = { info: x, key: x.key }; item.id = iRegister(item); return item; }
function initTable() {
  clearElement(dTableBackground);
  setTableBackground(RED, 'white', true);
  let ltitle = get3ColLineName(dTableBackground, 'title', { hmin: 30 });
  mStyleX(dTitle, { maleft: -50 })
  let ltable = get3ColLineName(dTableBackground, 'table', {});
  let lbottom = get3ColLineName(dTableBackground, 'bottom', { position: 'absolute', bottom: 30 });
}
function input_to_anzeige1(caption, index) {
  let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
  const di = { '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' };
  let bid = fen.newbid;
  if (index == 0) {
    bid[0] = Number(caption);
    if (bid[0] == 0) {
      bid[0] = '_'; bid[1] = '_';
    } else if (bid[1] == '_') {
      let hand = fen.players[uplayer].hand;
      let c1 = arrLast(hand);
      let r = c1[0];
      if (r == '2') r = bid[3] == 'ace' ? 'K' : 'A';
      if (di[r] == bid[3]) bid[1] = bid[3] == 'three' ? 'four' : 'three'; else bid[1] = di[r];
    }
  } else if (index == 1) {
    bid[1] = di[caption];
    if (bid[0] == '_') bid[0] = 1;
    if (bid[3] == bid[1]) { bid[0] = bid[0] + bid[2]; bid[2] = bid[3] = '_'; }
  } else if (index == 2) {
    bid[2] = Number(caption);
    if (bid[2] == 0) {
      bid[2] = '_'; bid[3] = '_';
    } else if (bid[3] == '_') {
      let hand = fen.players[uplayer].hand;
      let c1 = hand[0];
      let r = c1[0];
      if (r == '2') r = bid[1] == 'ace' ? 'K' : 'A';
      if (di[r] == bid[1]) bid[3] = bid[1] == 'three' ? 'four' : 'three'; else bid[3] = di[r];
    }
  } else {
    bid[3] = di[caption];
    if (bid[2] == '_') bid[2] = 1;
    if (bid[3] == bid[1]) { bid[0] = bid[0] + bid[2]; bid[1] = bid[3]; bid[2] = bid[3] = '_'; }
  }
  for (let i = 0; i < 4; i++)  iDiv(UI.panelItems[i]).innerHTML = bid[i];
}
function interrupt() {
  STOPAUS = true;
  uiActivated = aiActivated = false;
  clearTimeouts();
  if (isdef(G.clear)) G.clear();
  TOMan.clear();
  clearMarkers();
}
function intro_create_score_table(fen) {
  let dParent = mBy('dIntro');
  let d = mDiv(dParent, { margin: 'auto', w: 300 });
  html = `<div style='text-align:center;margin-top:100px'>
  <table id='customers'><tr><th>player</th><th>score</th></tr>
  `;
  let plparts = fen.split(',');
  for (const pl of plparts) {
    html += `<tr><td>${stringBefore(pl, ':')}</td><td>${stringAfter(pl, ':')}</td></tr>`
  }
  html += '</table></div>';
  d.innerHTML = html;
}
function intro_show_user_image(uname) {
  let dParent = mBy('dIntro');
  let d = mDiv(dParent, { margin: 'auto', w: 300 });
  let html = `
  <div style='text-align:center;margin-top:100px'>
    <img src='../base/assets/images/${uname}.jpg' class="img_person" height=200 />
  </div>
  `;
  d.innerHTML = html;
}
function iRegister(item, id) { let uid = isdef(id) ? id : getUID(); Items[uid] = item; return uid; }
function is_admin(name) { return ['mimi'].includes(isdef(name) ? name : Session.cur_user); }
function is_advanced_user() {
  let advancedUsers = ['mimi', 'bob', 'buddy', 'minnow', 'nimble', 'leo'];
  return isdef(U) && ((advancedUsers.includes(DA.secretuser) || advancedUsers.includes(U.name)));
}
function is_ai_player(plname) {
  let [fen, name] = [Z.fen, valf(plname, Z.uplayer)];
  return lookup(fen, ['players', name, 'playmode']) == 'bot';
}
function is_bid_higher_than(bid, oldbid) {
  bid = jsCopy(bid);
  if (bid[0] == '_') bid[0] = 0;
  if (bid[2] == '_') bid[2] = 0;
  if (oldbid[0] == '_') oldbid[0] = 0;
  if (oldbid[2] == '_') oldbid[2] = 0;
  let higher = bid[0] > oldbid[0]
    || bid[0] == oldbid[0] && is_higher_ranked_name(bid[1], oldbid[1])
    || bid[0] == oldbid[0] && bid[1] == oldbid[1] && bid[2] > oldbid[2]
    || bid[0] == oldbid[0] && bid[1] == oldbid[1] && bid[2] == oldbid[2] && is_higher_ranked_name(bid[3], oldbid[3]);
  return higher;
}
function is_card(o) { return isdef(o.rank) || isdef(o.o) && isdef(o.o.rank); }
function is_card_key(ckey, rankstr = '*A23456789TJQK', suitstr = 'SHCD') { return rankstr.includes(ckey[0]) && suitstr.includes(ckey[1]); }
function is_correct_group_illegal(cards) {
  let keys = cards.map(x => x.key);
  let isgroup = is_group(keys);
  if (isgroup) return false;
  if (is_fixed_goal() && get_round_goal() != '7R') {
    return `the goal for this round is ${get_round_goal()}!`;
  }
  let [fen, uplayer] = [Z.fen, Z.uplayer];
  let pl = fen.players[uplayer];
  if (!is_fixed_goal() && pl.goals['7R'] == true) return `you can only have one sequence of 7!`;
  if (pl.journeys.find(x => is_sequence(x))) return `you can only have one sequence of 7!`;
  if (pl.roundgoal) return `row of 7 NOT allowed except if it is the round goal!`;
  return false;
}
function is_fixed_goal() { return Z.options.phase_order == 'fixed'; }
function is_game_host() { return Session.cur_table.host == Session.cur_user; }
function is_group(j) {
  if (j.length < 3) return false;
  let rank = firstCond(j, x => !is_jolly(x))[0];
  return j.every(x => is_jolly(x) || x[0] == rank);
}
function is_higher_ranked_name(f1, f2) {
  let di2 = { _: 0, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, jack: 11, queen: 12, king: 13, ace: 14 };
  return di2[f1] > di2[f2];
}
function is_human_player(plname) {
  let [fen, name] = [Z.fen, valf(plname, Z.uplayer)];
  return lookup(fen, ['players', name, 'playmode']) == 'human';
}
function is_joker(card) { return is_jolly(card.key); }
function is_jolly(ckey) { return ckey[0] == '*'; }
function is_multi_trigger(plname) { return lookup(Z, ['fen', 'trigger']) == plname; }
function is_online() { return lookup(DA, ['internet']); }
function is_overlapping_set(cards, max_jollies_allowed = 1, seqlen = 7, group_same_suit_allowed = true) {
  let istart = 0;
  let inextstart = 0;
  let lmin = 3;
  let legal = true;
  if (cards.length < lmin) return false;
  while (legal && istart <= cards.length - lmin) {
    let cl = cards.slice(istart, istart + lmin);
    let set = ferro_is_set(cl, max_jollies_allowed, seqlen, group_same_suit_allowed);
    if (set) { istart++; inextstart = Math.min(istart + lmin, cards.length - 3); }
    else if (!set && inextstart == istart) return false;
    else istart++;
  }
  return cards.map(x => x.key);
}
function is_playerdata_set(plname) {
  return isdef(Z.playerdata) && !isEmpty(Z.playerdata) && !isEmpty(Z.playerdata.find(x => x.name == plname).state);
}
function is_playing(pl, fen) {
  return isList(fen.plorder) && fen.plorder.includes(pl) || isList(fen.roundorder) && fen.roundorder.includes(pl) || Z.game == 'feedback' && isdef(Z.fen.players[pl]);
}
function is_sequence(j) { return !is_group(j); }
function is_shield_mode() {
  return Z.role == 'spectator'
    || Z.mode == 'multi' && Z.role == 'inactive' && Z.host != Z.uname
    || Z.mode == 'multi' && Z.role == 'inactive' && Z.pl.playmode != 'bot'
}
function is_stringified(obj) {
  if (isString(obj)) {
    return '"{[('.includes(obj[0]) || obj[0] == "'";
  }
  return false;
}
function isdef(x) { return x !== null && x !== undefined; }
function isDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res; }
function isEmpty(arr) {
  return arr === undefined || !arr
    || (isString(arr) && (arr == 'undefined' || arr == ''))
    || (Array.isArray(arr) && arr.length == 0)
    || Object.entries(arr).length === 0;
}
function isEmptyOrWhiteSpace(s) { return isEmpty(s.trim()); }
function isList(arr) { return Array.isArray(arr); }
function isLiteral(x) { return isString(x) || isNumber(x); }
function isMergeableObject(val) {
  var nonNullObject = val && typeof val === 'object'
  return nonNullObject
    && Object.prototype.toString.call(val) !== '[object RegExp]'
    && Object.prototype.toString.call(val) !== '[object Date]'
}
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isString(param) { return typeof param == 'string'; }
function isSvg(elem) { return startsWith(elem.constructor.name, 'SVG'); }
function isWhiteSpace(s) { let white = new RegExp(/^\s$/); return white.test(s.charAt(0)); }
function iUnhigh(item) { let d = iDiv(item); mStyle(d, { bg: 'transparent' }); }
function jolly_matches(key, j, rankstr = 'A23456789TJQKA') {
  let jolly_idx = find_index_of_jolly(j);
  if (jolly_idx == -1) return false;
  if (is_group(j)) {
    let r = get_group_rank(j);
    if (key[0] == r) return true;
  } else if (jolly_idx > 0) {
    let rank_before_index = j[jolly_idx - 1][0];
    let suit_needed = j[jolly_idx - 1][1];
    let rank_needed = rankstr[rankstr.indexOf(rank_before_index) + 1];
    if (key[0] == rank_needed && key[1] == suit_needed) return true;
  } else {
    let rank_after_index = j[jolly_idx + 1][0];
    let suit_needed = j[jolly_idx + 1][1];
    let rank_needed = rank_after_index == 'A' ? 'K' : rankstr[rankstr.indexOf(rank_after_index) - 1];
    if (key[0] == rank_needed && key[1] == suit_needed) return true;
  }
  return false;
}
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function jsonToYaml(o) { let y = jsyaml.dump(o); return y; }
function landing() { if (isdef(DA.landing)) DA.landing(); }
function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}
function last_n_digits(number, n = 2) {
  return number % Math.pow(10, n);
}
function lastCond(arr, func) {
  if (nundef(arr)) return null;
  for (let i = arr.length - 1; i >= 0; i--) { let a = arr[i]; if (func(a)) return a; }
  return null;
}
function lastDescendantOfType(type, parent) {
  if (getTypeOf(parent) == type) return parent;
  let children = arrChildren(parent);
  if (isEmpty(children)) return null;
  for (const ch of children.reverse()) {
    let res = lastDescendantOfType(type, ch);
    if (res) return res;
  }
  return null;
}
function lastOfLanguage(key, language) {
  let y = symbolDict[key];
  let w = y[language];
  let last = stringAfterLast(w, '|');
  return last.trim();
}
function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
  let di = {};
  for (const a of arr) {
    let key = typeof (a) == 'object' ? a[keyprop] : a;
    if (uniqueKeys) lookupSet(di, [key], a);
    else lookupAddToList(di, [key], a);
  }
  return di;
}
function load_assets(obj) {
  Config = jsyaml.load(obj.config);
  Syms = jsyaml.load(obj.syms);
  SymKeys = Object.keys(Syms);
  ByGroupSubgroup = jsyaml.load(obj.symGSG);
  C52 = jsyaml.load(obj.c52);
  Cinno = jsyaml.load(obj.cinno);
  Info = jsyaml.load(obj.info);
  Sayings = jsyaml.load(obj.sayings);
  create_card_assets_c52();
  KeySets = getKeySets();
  assertion(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');
}
function load_user(name, display_ui = true) {
  if (nundef(name)) name = 'guest';
  let udata = lookup(DB, ['users', name]);
  if (!udata) udata = add_new_user({ name: name, color: randomColor(), motto: random_motto(), image: false, games: {}, tables: {} });
  Session.cur_user = name;
  if (!is_admin(name)) localStorage.setItem('user', name);
  if (display_ui) show_user(udata);
  if (name == 'mimi') show('dAdminButtons'); else hide('dAdminButtons');
  return udata;
}
function loader_off() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_off'; }
function loader_on() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_on'; }
function lookup(dict, keys) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (k === undefined) break;
    let e = d[k];
    if (e === undefined || e === null) return null;
    d = d[k];
    if (i == ilast) return d;
    i += 1;
  }
  return d;
}
function lookupAddIfToList(dict, keys, val) {
  let lst = lookup(dict, keys);
  if (isList(lst) && lst.includes(val)) return;
  lookupAddToList(dict, keys, val);
}
function lookupAddToList(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (i == ilast) {
      if (nundef(k)) {
        console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
        return null;
      } else if (isList(d[k])) {
        d[k].push(val);
      } else {
        d[k] = [val];
      }
      return d[k];
    }
    if (nundef(k)) continue;
    if (d[k] === undefined) d[k] = {};
    d = d[k];
    i += 1;
  }
  return d;
}
function lookupSet(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (nundef(k)) continue;
    if (d[k] === undefined) d[k] = (i == ilast ? val : {});
    if (nundef(d[k])) d[k] = (i == ilast ? val : {});
    d = d[k];
    if (i == ilast) return d;
    i += 1;
  }
  return d;
}
function lookupSetOverride(dict, keys, val) {
  let d = dict;
  let ilast = keys.length - 1;
  let i = 0;
  for (const k of keys) {
    if (i == ilast) {
      if (nundef(k)) {
        return null;
      } else {
        d[k] = val;
      }
      return d[k];
    }
    if (nundef(k)) continue;
    if (nundef(d[k])) d[k] = {};
    d = d[k];
    i += 1;
  }
  return d;
}
function luxury_card_deco(card) {
  let d = iDiv(card); mStyle(d, { position: 'relative' });
  let d1 = mDiv(d, { fg: 'dimgray', fz: 11, family: 'tangerine', position: 'absolute', left: 0, top: 0, 'writing-mode': 'vertical-rl', transform: 'scale(-1)', top: '35%' }, null, 'Luxury');
  let html = `<img height=${18} src="../base/assets/icons/deco0.svg" style="transform:scaleX(-1);">`;
  d1 = mDiv(d, { position: 'absolute', bottom: -2, left: 3, opacity: .25 }, null, html);
}
function maButton(caption, handler, dParent, styles) {
  let a = mLink("javascript:void(0)", dParent, {}, null, caption, 'a');
  a.onclick = handler;
  if (isdef(styles)) mStyle(a, styles);
  return a;
}
function make_card_selectable(item) { let d = iDiv(item.o); mClass(d, 'selectable'); if (Z.game != 'aristo') { spread_hand(item.path, .3); } mClass(d.parentNode, 'selectable_parent'); }
function make_card_selected(item) {
  let color = isdef(Z.func.get_selection_color) ? Z.func.get_selection_color(item) : 'red';
  set_card_border(item, 13, color);
  if (DA.magnify_on_select) mClass(iDiv(item.o), 'mag');
}
function make_card_unselectable(item) { let d = iDiv(item.o); d.onclick = null; mClassRemove(d, 'selectable'); mClassRemove(d.parentNode, 'selectable_parent'); spread_hand(item.path); }
function make_card_unselected(item) { set_card_border(item); if (DA.magnify_on_select) mClassRemove(iDiv(item.o), 'mag'); }
function make_container_selectable(item) { let d = iDiv(item); mClass(d, 'selectable'); mClass(d, 'selectable_parent'); }
function make_container_selected(item) { let d = iDiv(item); mClass(d, 'selected_parent'); }
function make_container_unselectable(item) { let d = iDiv(item); d.onclick = null; mClassRemove(d, 'selectable'); mClassRemove(d, 'selectable_parent'); }
function make_container_unselected(item) { let d = iDiv(item); mClassRemove(d, 'selected_parent'); }
function make_csv_for_rankings() {
  let csv = 'players,';
  let games = get_values(DB.games);
  let gamenames = games.map(x => x.friendly).join(',');
  csv += gamenames;
  for (const name in DB.users) {
    let [dbuser, values, usergames] = [DB.users[name], [], []];
    for (const gname in dbuser.games) {
      let rec = dbuser.games[gname];
      if (isdef(rec.total) && rec.total > 0) usergames.push(gname);
    }
    if (isEmpty(usergames)) continue;
    for (const gname in DB.games) {
      let info = lookupSet(DB.users, [name, 'games', gname], {});
      if (nundef(info.total)) values.push('0/0'); else values.push(`${info.wins}/${info.total}`);
    }
    if (!isEmpty(values)) csv += `\n${name},` + values.join(',');
  }
  return csv;
}
function make_players(playernames) {
  let o = Session.cur_players = {};
  for (const plname of playernames) {
    o[plname] = { name: plname, color: getColorDictColor(DB.users[plname].color), imgPath: `../base/assets/images/${plname}.jpg`, score: 0 };
  }
  Session.cur_me = o[Session.cur_user];
  Session.cur_others = get_values(o).filter(x => x.name != Session.cur_user);
}
function make_string_selectable(item) { let d = mBy(item.id); mClass(d, 'selectable_button'); }
function make_string_selected(item) { let d = mBy(item.id); item.bg = mGetStyle(d, 'bg'); item.fg = mGetStyle(d, 'fg'); mStyle(d, { bg: 'yellow', fg: 'black' }); }
function make_string_unselectable(item) { let d = mBy(item.id); d.onclick = null; mClassRemove(d, 'selectable_button'); }
function make_string_unselected(item) { let d = mBy(item.id); mStyle(d, { bg: item.bg, fg: item.fg }); }
function makeCategories() {
  let keys = Categories = {
    animal: getGSGElements(g => g == 'Animals & Nature', s => startsWith(s, 'animal')),
    clothing: getGSGElements(g => g == 'Objects', s => s == 'clothing'),
    emotion: getGSGElements(g => g == 'Smileys & Emotion', s => startsWith(s, 'face') && !['face-costume', 'face-hat'].includes(s)),
    food: getGSGElements(g => g == 'Food & Drink', s => startsWith(s, 'food')),
    'game/toy': (['sparkler', 'firecracker', 'artist palette', 'balloon', 'confetti ball'].concat(ByGroupSubgroup['Activities']['game'])).sort(),
    gesture: getGSGElements(g => g == 'People & Body', s => startsWith(s, 'hand')),
    job: ByGroupSubgroup['People & Body']['job'],
    mammal: ByGroupSubgroup['Animals & Nature']['animal-mammal'],
    music: getGSGElements(g => g == 'Objects', s => startsWith(s, 'musi')),
    object: getGSGElements(g => g == 'Objects', s => true),
    place: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'place')),
    plant: getGSGElements(g => g == 'Animals & Nature' || g == 'Food & Drink', s => startsWith(s, 'plant') || s == 'food-vegetable' || s == 'food-fruit'),
    sport: ByGroupSubgroup['Activities']['sport'],
    tool: getGSGElements(g => g == 'Objects', s => s == 'tool'),
    transport: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'transport')),
  };
  let incompatible = DA.incompatibleCats = {
    animal: ['mammal'],
    clothing: ['object'],
    emotion: ['gesture'],
    food: ['plant', 'animal'],
    'game/toy': ['object', 'music'],
    gesture: ['emotion'],
    job: ['sport'],
    mammal: ['animal'],
    music: ['object', 'game/toy'],
    object: ['music', 'clothing', 'game/toy', 'tool'],
    place: [],
    plant: ['food'],
    sport: ['job'],
    tool: ['object'],
    transport: [],
  }
}
function makeItemDiv(item, options) {
  if (isdef(options.outerStyles) && isdef(options.ifs)) copyKeys(item, options.outerStyles, {}, Object.keys(options.ifs));
  let dOuter = mCreate('div', options.outerStyles, item.id);
  if (isdef(item.textShadowColor)) {
    let sShade = '0 0 0 ' + item.textShadowColor;
    if (options.showPic) {
      options.picStyles['text-shadow'] = sShade;
      options.picStyles.fg = colorFrom('black', options.contrast);
    } else {
      options.labelStyles['text-shadow'] = sShade;
      options.labelStyles.fg = colorFrom('black', options.contrast);
    }
  }
  let dLabel;
  if (options.showLabels && options.labelTop == true) { dLabel = mText(item.label, dOuter, options.labelStyles); }
  let dPic;
  if (options.showPic) {
    dPic = mDiv(dOuter, { family: item.info.family });
    dPic.innerHTML = item.info.text;
    if (isdef(options.picStyles)) mStyleX(dPic, options.picStyles);
  }
  if (options.showLabels && options.labelBottom == true) { dLabel = mText(item.label, dOuter, options.labelStyles); }
  if (isdef(options.handler)) dOuter.onclick = options.handler;
  iAdd(item, { options: options, div: dOuter, dLabel: dLabel, dPic: dPic });
  if (isdef(item.textShadowColor)) { applyColorkey(item, options); }
  return dOuter;
}
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
  if (nundef(nOrString)) return defaultVal;
  if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
  return nOrString;
}
function mAnimate(elem, prop, valist, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0, forwards = 'none') {
  let kflist = [];
  for (const perc in valist) {
    let o = {};
    let val = valist[perc];
    o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
    kflist.push(o);
  }
  let opts = { duration: msDuration, fill: forwards, easing: easing, delay: delay };
  let a = toElem(elem).animate(kflist, opts);
  if (isdef(callback)) { a.onfinish = callback; }
  return a;
}
function mAnimateTo(elem, prop, val, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
  let o = {};
  o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
  let kflist = [o];
  let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
  let a = toElem(elem).animate(kflist, opts);
  if (isdef(callback)) { a.onfinish = callback; }
  return a;
}
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
function marrTag(tag) {
  return Array.from(document.getElementsByTagName(tag));
}
function mButton(caption, handler, dParent, styles, classes, id) {
  let x = mCreate('button');
  x.innerHTML = caption;
  if (isdef(handler)) x.onclick = handler;
  if (isdef(dParent)) toElem(dParent).appendChild(x);
  if (isdef(styles)) mStyle(x, styles);
  if (isdef(classes)) mClass(x, classes);
  if (isdef(id)) x.id = id;
  return x;
}
function mBy(id) { return document.getElementById(id); }
function mCardText(ckey, sz, color) { return is_jolly(ckey) ? '<span style="font-family:Algerian">jolly</span>' : `${ckey[0]}${mSuit(ckey, sz, color)}`; }
function mCenterCenterFlex(d, gap) { mCenterFlex(d, true, true, true, gap); }
function mCenterFlex(d, hCenter = true, vCenter = false, wrap = true, gap = null) {
  let styles = { display: 'flex' };
  if (hCenter) styles['justify-content'] = 'center';
  styles['align-content'] = vCenter ? 'center' : 'flex-start';
  if (wrap) styles['flex-wrap'] = 'wrap';
  if (gap) styles.gap = gap;
  mStyle(d, styles);
}
function mClass(d) {
  d = toElem(d);
  if (arguments.length == 2) {
    let arg = arguments[1];
    if (isString(arg) && arg.indexOf(' ') > 0) { arg = [toWords(arg)]; }
    else if (isString(arg)) arg = [arg];
    if (isList(arg)) {
      for (let i = 0; i < arg.length; i++) {
        d.classList.add(arg[i]);
      }
    }
  } else for (let i = 1; i < arguments.length; i++) d.classList.add(arguments[i]);
}
function mClassRemove(d) { d = toElem(d); for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mClassReplace(d, weg, her) { mClassRemove(d, weg); mClass(d, her); }
function mClear(d) {
  toElem(d).innerHTML = '';
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
function mColor(d, bg, fg) { return mStyle(d, { 'background-color': bg, 'color': fg }); }
function mColorLetters(s, brightness) {
  return toLetters(s).map(x => `<div style='display:inline-block;transform:rotate(${rChoose([10, 5, -10, -5])}deg);color:${rColor(brightness)}'>${x == ' ' ? '&nbsp;' : x}</div>`).join('');
}
function mColsX(dParent, arr, itemStyles = { bg: 'random' }, rowStyles, colStyles, akku) {
  let d0 = mDiv100(dParent, { display: 'flex', 'justify-content': 'space-between' });
  if (isdef(colStyles)) mStyle(d0, colStyles);
  for (let i = 0; i < arr.length; i++) {
    let content = arr[i];
    if (isList(content)) {
      d1 = mDiv(d0);
      mRowsX(d1, content, itemStyles, rowStyles, colStyles, akku);
    } else {
      d1 = mContentX(content, d0, itemStyles);
      akku.push(d1);
    }
  }
}
function mContainerSplay(d, splay, w, h, num, ov) {
  if (nundef(splay)) splay = 2;
  if (!isNumber(splay)) splay = get_splay_number(splay);
  if (isString(ov) && ov[ov.length - 1] == '%') ov = splay == 0 ? 1 : splay == 3 ? Number(ov) * h / 100 : Number(ov) * w / 100;
  if (splay == 3) {
    d.style.display = 'grid';
    d.style.gridTemplateRows = `repeat(${num},${ov}px)`;
    console.log('HAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOO')
    d.style.minHeight = `${h + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 2 || splay == 1) {
    d.style.display = 'grid';
    d.style.gridTemplateColumns = `repeat(${num},${ov}px)`;
    let wnew = w + (num - 1) * (ov * 1.1);
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 0) {
    d.style.display = 'grid'; ov = .5
    d.style.gridTemplateColumns = `repeat(${num},${ov}px)`;
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 5) {
    d.style.display = 'grid';
    d.style.gridTemplateColumns = `${ov}px repeat(${num - 1},${ov / 2}px)`;
    d.style.minWidth = `${w + (num) * (ov / 2 * 1.1)}px`;
  } else if (splay == 4) {
    d.style.position = 'relative';
    if (nundef(ov)) ov = .5;
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
    d.style.minHeight = `${h + (num - 1) * (ov * 1.1)}px`;
  }
}
function mContentX(content, dParent, styles = { sz: Card.sz / 5, fg: 'random' }) {
  let [key, scale] = isDict(content) ? [content.key, content.scale] : [content, 1];
  if (scale != 1) { styles.transform = `scale(${scale},${Math.abs(scale)})`; }
  let dResult = mDiv(dParent);
  let ds = isdef(Syms[key]) ? mSym(key, dResult, styles) : mDiv(dResult, styles, null, key);
  return dResult;
}
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
function mCreateFrom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function mDataTable(reclist, dParent, rowstylefunc, headers, id, showheaders = true) {
  if (nundef(headers)) headers = get_keys(reclist[0]);
  let t = mTable(dParent, headers, showheaders);
  if (isdef(id)) t.id = `t${id}`;
  let rowitems = [];
  let i = 0;
  for (const u of reclist) {
    let rid = isdef(id) ? `r${id}_${i}` : null;
    r = mTableRow(t, u, headers, rid);
    if (isdef(rowstylefunc)) mStyle(r.div, rowstylefunc(u));
    rowitems.push({ div: r.div, colitems: r.colitems, o: u, id: rid, index: i });
    i++;
  }
  return { div: t, rowitems: rowitems };
}
function mDiv(dParent, styles, id, inner, classes, sizing) {
  dParent = toElem(dParent);
  let d = mCreate('div');
  if (dParent) mAppend(dParent, d);
  if (isdef(styles)) mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  if (isdef(id)) d.id = id;
  if (isdef(inner)) d.innerHTML = inner;
  if (isdef(sizing)) { setRect(d, sizing); }
  return d;
}
function mDiv100(dParent, styles, id, sizing = false) { let d = mDiv(dParent, styles, id); mSize(d, 100, 100, '%', sizing); return d; }
function mDivItem(dParent, styles, id, content) {
  if (nundef(id)) id = getUID();
  let d = mDiv(dParent, styles, id, content);
  return mItem(id, { div: d });
}
function mDom(dParent, styles = {}, opts = {}) {
  let tag = valf(opts.tag, 'div');
  let d = document.createElement(tag);
  if (isdef(dParent)) mAppend(dParent, d);
  if (tag == 'textarea') styles.wrap = 'hard';
  const aliases = {
    classes: 'className',
    inner: 'innerHTML',
    html: 'innerHTML',
    w: 'width',
    h: 'height',
  };
  for (const opt in opts) {
    let name = valf(aliases[opt], opt), val = opts[opt];
    if (['style', 'tag', 'innerHTML', 'className', 'checked', 'value'].includes(name) || name.startsWith('on')) d[name] = val;
    else d.setAttribute(name, val);
  }
  mStyle(d, styles);
  return d;
}
function mDraggable(item) {
  let d = iDiv(item);
  d.draggable = true;
  d.ondragstart = drag;
}
function mDroppable(item, handler, dragoverhandler) {
  let d = iDiv(item);
  d.ondragover = isdef(dragoverhandler) ? dragoverhandler : default_allowDrop;
  d.ondrop = handler;
}
function measure_fieldset(fs) {
  let legend = fs.firstChild;
  let r = getRect(legend);
  let labels = fs.getElementsByTagName('label');
  let wmax = 0;
  for (const l of labels) {
    let r1 = getRect(l);
    wmax = Math.max(wmax, r1.w);
  }
  let wt = r.w;
  let wo = wmax + 24;
  let diff = wt - wo;
  if (diff >= 10) {
    for (const l of labels) { let d = l.parentNode; mStyle(d, { maleft: diff / 2 }); }
  }
  let wneeded = Math.max(wt, wo) + 10;
  mStyle(fs, { wmin: wneeded });
  for (const l of labels) { let d = l.parentNode; mStyle(l, { display: 'inline-block', wmin: 50 }); mStyle(d, { wmin: wneeded - 40 }); }
}
function measureText(text, styles = {}, cx = null) {
  if (!cx) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    cx = canvas.getContext('2d');
  }
  cx.font = isdef(styles.font) ? styles.font : `${styles.fz}px ${styles.family}`;
  var metrics = cx.measureText(text);
  return { w: metrics.width, h: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent };
}
function mergeObject(target, source, optionsArgument) {
  var destination = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach(function (key) {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument)
    }
  })
  return destination;
}
function mergeOverride(base, drueber) { return _deepMerge(base, drueber, { arrayMerge: _overwriteMerge }); }
function mFadeClear(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mClear(d); if (callback) callback(); }, ms); }
function mFadeClearShow(d, ms = 800, callback = null) { return mAnimate(d, 'opacity', [1, 0], () => { mClear(d); if (callback) callback(); }, ms); }
function mFadeRemove(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mRemove(d); if (callback) callback(); }, ms); }
function mFall(d, ms = 800, dist = 50) { toElem(d).animate([{ opacity: 0, transform: `translateY(-${dist}px)` }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' }); }
function mFlex(d, or = 'h') {
  d = toElem(d);
  d.style.display = 'flex';
  d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}
function mFlexWrap(d) { mFlex(d, 'w'); }
function mGetStyle(elem, prop) {
  let val;
  elem = toElem(elem);
  if (prop == 'bg') { val = getStyleProp(elem, 'background-color'); if (isEmpty(val)) return getStyleProp(elem, 'background'); }
  else if (isdef(STYLE_PARAMS[prop])) { val = getStyleProp(elem, STYLE_PARAMS[prop]); }
  else {
    switch (prop) {
      case 'vmargin': val = stringBefore(elem.style.margin, ' '); break;
      case 'hmargin': val = stringAfter(elem.style.margin, ' '); break;
      case 'vpadding': val = stringBefore(elem.style.padding, ' '); break;
      case 'hpadding': val = stringAfter(elem.style.padding, ' '); break;
      case 'box': val = elem.style.boxSizing; break;
      case 'dir': val = elem.style.flexDirection; break;
    }
  }
  if (nundef(val)) val = getStyleProp(elem, prop);
  if (val.endsWith('px')) return firstNumber(val); else return val;
}
function mIfNotRelative(d) { if (isEmpty(d.style.position)) d.style.position = 'relative'; }
function mImage() { return mImg(...arguments); }
function mImg(path, dParent, styles, classes, callback) {
  let d = mCreate('img');
  if (isdef(callback)) d.onload = callback;
  d.src = path;
  if (isdef(dParent)) mAppend(dParent, d);
  if (isdef(styles)) mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  if (isdef(styles.w)) d.setAttribute('width', styles.w + 'px');
  if (isdef(styles.h)) d.setAttribute('height', styles.h + 'px');
  return d;
}
function mInsert(dParent, el, index = 0) { dParent.insertBefore(el, dParent.childNodes[index]); return el; }
function miPic(item, dParent, styles, classes) {
  let info = isString(item) ? Syms[item] : isdef(item.info) ? item.info : item;
  let d = mDiv(dParent);
  d.innerHTML = info.text;
  if (nundef(styles)) styles = {};
  let family = info.family;
  addKeys({ family: family, fz: 50, display: 'inline-block' }, styles);
  mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  mCenterCenterFlex(d);
  return d;
}
function mItem(id, diDOM, di = {}, addSizing = false) {
  let item = di;
  id = isdef(id) ? id : isdef(diDOM) && isdef(diDOM.div) && !isEmpty(diDOM.div.id) ? diDOM.div.id : getUID();
  item.id = iRegister(item, id);
  if (isdef(diDOM) && isdef(diDOM.div)) { diDOM.div.id = id; iAdd(item, diDOM); }
  if (addSizing) {
    if (nundef(item.sizing)) item.sizing = 'sizeToContent';
    if (nundef(item.positioning)) { item.positioning = 'absolute'; }
    if (nundef(item.posType)) { item.posType = 'center'; }
    if (isdef(diDOM) && item.sizing == 'sizeToContent') iMeasure(item, item.sizingOptions);
  }
  return item;
}
function mItemSplay(item, list, splay, ov = .5) {
  if (!isNumber(splay)) splay = get_splay_number(splay);
  let d = iDiv(item);
  let idx = list.indexOf(item.key);
  if (splay == 4) {
    let offset = (list.length - idx) * ov;
    mStyle(d, { position: 'absolute', left: offset, top: offset });
    d.style.zIndex = list.length - idx;
  } else {
    d.style.zIndex = splay != 2 ? list.length - idx : 0;
  }
}
function mLinebreak(dParent, gap) {
  dParent = toElem(dParent);
  let d;
  let display = getComputedStyle(dParent).display;
  if (display == 'flex') {
    d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
  } else {
    d = mDiv(dParent, {}, null, '<br>');
  }
  if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }
  return d;
}
function mLink(href, dParent, styles, id, inner, classes, sizing) {
  let d = mCreate('a');
  if (dParent) mAppend(dParent, d);
  d.href = valf(href, '#');
  if (isdef(styles)) mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  if (isdef(id)) d.id = id;
  if (isdef(inner)) d.innerHTML = inner;
  if (isdef(sizing)) { setRect(d, sizing); }
  return d;
}
function modify_item_for_adaptive(item, items, n) {
  item.numSyms = n;
  [item.rows, item.cols, item.colarr] = calc_syms(item.numSyms);
  let other_items = items.filter(x => x != item);
  let shared_syms = find_shared_keys(item.keys, other_items.map(x => x.keys));
  let other_symbols = item.keys.filter(x => !shared_syms.includes(x));
  item.keys = shared_syms;
  let num_missing = item.numSyms - item.keys.length;
  item.keys = item.keys.concat(rChoose(other_symbols, num_missing));
  shuffle(item.keys);
  item.scales = item.keys.map(x => rChoose([1, .75, 1.2, .9, .8]));
}
function more() {
  let sz = measureText(text, styles, cx);
  console.log('sz', sz)
  let [v, h] = [pos[0], pos[1]];
  let offy = v == 't' ? -sz.h : 'c' ? -sz.h / 2 : 0;
  let offx = h == 'l' ? -sz.w : 'c' ? -sz.w / 2 : 0;
  let [x, y] = [styles.x + offx, styles.y + offy];
  console.log('pos', pos, styles.x, styles.y, x, y)
  cx.fillText(text, x, y);
  return;
  if (pos[1] == 'c') cx.textAlign = 'center';
  cx.font = `16px Arial`;
  cx.fillStyle = color;
  cx.fillText(`${label}`, x, y + (pos[0] == 'b' ? 20 : -10));
}
function mPlace(elem, pos, offx, offy) {
  elem = toElem(elem);
  pos = pos.toLowerCase();
  let dParent = elem.parentNode; if (dParent.style.position != 'absolute') dParent.style.position = 'relative';
  let vert = valf(offx, 0);
  let hor = isdef(offy) ? offy : vert;
  if (pos[0] == 'c' || pos[1] == 'c') {
    let rParent = getRect(dParent);
    let [wParent, hParent] = [rParent.w, rParent.h];
    let rElem = getRect(elem);
    let [wElem, hElem] = [rElem.w, rElem.h];
    switch (pos) {
      case 'cc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert + (hParent - hElem) / 2 }); break;
      case 'tc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert }); break;
      case 'bc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, bottom: vert }); break;
      case 'cl': mStyle(elem, { position: 'absolute', left: hor, top: vert + (hParent - hElem) / 2 }); break;
      case 'cr': mStyle(elem, { position: 'absolute', right: hor, top: vert + (hParent - hElem) / 2 }); break;
    }
    return;
  }
  let di = { t: 'top', b: 'bottom', r: 'right', l: 'left' };
  elem.style.position = 'absolute';
  elem.style[di[pos[0]]] = hor + 'px'; elem.style[di[pos[1]]] = vert + 'px';
}
function mPopup(content, dParent, styles, id) {
  if (isdef(mBy(id))) mRemove(id);
  mIfNotRelative(dParent);
  if (nundef(styles)) styles = { top: 0, left: 0 };
  styles.position = 'absolute';
  let d1 = mDiv(dParent, styles, valf(id, getUID()), content);
  return d1;
}
function mPulse(d, ms, callback = null) { mClass(d, 'onPulse'); TO[getUID()] = setTimeout(() => { mClassRemove(d, 'onPulse'); if (callback) callback(); }, ms); }
function mRadio(label, val, name, dParent, styles = {}, handler, group_id, is_on) {
  let cursor = styles.cursor; delete styles.cursor;
  let d = mDiv(dParent, styles, group_id + '_' + val);
  let id = isdef(group_id) ? `i_${group_id}_${val}` : getUID();
  let type = isdef(group_id) ? 'radio' : 'checkbox';
  let checked = isdef(is_on) ? is_on : false;
  let inp = mCreateFrom(`<input class='radio' id='${id}' type="${type}" name="${name}" value="${val}">`);
  if (checked) inp.checked = true;
  let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
  if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
  mAppend(d, inp);
  mAppend(d, text);
  if (isdef(handler)) {
    inp.onclick = ev => {
      ev.cancelBubble = true;
      if (handler == 'toggle') {
      } else if (isdef(handler)) {
        handler(val);
      }
    };
  }
  return d;
}
function mRadioGroup(dParent, styles, id, legend, legendstyles) {
  let f = mCreate('fieldset');
  f.id = id;
  if (isdef(styles)) mStyle(f, styles);
  if (isdef(legend)) {
    let l = mCreate('legend');
    l.innerHTML = legend;
    mAppend(f, l);
    if (isdef(legendstyles)) { mStyle(l, legendstyles); }
  }
  mAppend(dParent, f);
  return f;
}
function mRemove(elem) {
  elem = toElem(elem); if (nundef(elem)) return;
  var a = elem.attributes, i, l, n;
  if (a) {
    for (i = a.length - 1; i >= 0; i -= 1) {
      n = a[i].name;
      if (typeof elem[n] === 'function') {
        elem[n] = null;
      }
    }
  }
  a = elem.childNodes;
  if (a) {
    l = a.length;
    for (i = a.length - 1; i >= 0; i -= 1) {
      mRemove(elem.childNodes[i]);
    }
  }
  elem.remove();
}
function mRemoveChildrenFromIndex(dParent, i) { while (dParent.children[i]) { mRemove(dParent.children[i]); } }
function mRemoveClass(d) { for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mRowsX(dParent, arr, itemStyles = { bg: 'random' }, rowStyles, colStyles, akku) {
  let d0 = mDiv100(dParent, { display: 'flex', dir: 'column', 'justify-content': 'space-between' });
  if (isdef(rowStyles)) mStyle(d0, rowStyles);
  for (let i = 0; i < arr.length; i++) {
    let content = arr[i];
    if (isList(content)) {
      let d1 = mDiv(d0);
      mColsX(d1, content, itemStyles, rowStyles, colStyles, akku);
    } else {
      d1 = mContentX(content, d0, itemStyles);
      akku.push(d1);
    }
  }
}
function msElapsedSince(msStart) { return Date.now() - msStart; }
function mShield(dParent, styles = { bg: '#00000020' }, id = null, classnames = null, hideonclick = false) {
  dParent = toElem(dParent);
  let d = mDiv(dParent, styles, id, classnames);
  lookupAddIfToList(DA, ['shields'], d);
  mIfNotRelative(dParent);
  mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
  if (hideonclick) d.onclick = ev => { evNoBubble(ev); d.remove(); };
  else d.onclick = ev => { evNoBubble(ev); };
  mClass(d, 'topmost');
  return d;
}
function mShieldsOff() { if (nundef(DA.shields)) return; for (const d of DA.shields) d.remove(); }
function mShrinkTranslate(child, scale, newParent, ms = 800, callback) {
  let [dx, dy] = get_screen_distance(child, newParent);
  mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px) scale(${scale})`], callback, ms, 'ease');
}
function mSize(d, w, h, unit = 'px', sizing) { if (nundef(h)) h = w; mStyle(d, { width: w, height: h }, unit); if (isdef(sizing)) setRect(d, sizing); }
function msNow() { return Date.now(); }
function msToTime(ms) {
  let secs = Math.floor(ms / 1000);
  let mins = Math.floor(secs / 60);
  secs = secs - mins * 60;
  let hours = Math.floor(mins / 60);
  mins = mins - hours * 60;
  return { h: hours, m: mins, s: secs };
}
function mStyle(elem, styles, unit = 'px') {
  elem = toElem(elem);
  if (isdef(styles.whrest)) { delete styles.whrest; styles.w = styles.h = 'rest'; } else if (isdef(styles.wh100)) { styles.w = styles.h = '100%'; delete styles.wh100; }
  if (isdef(styles.w100)) styles.w = '100%'; else if (isdef(styles.wrest)) styles.w = 'rest';
  if (isdef(styles.h100)) styles.h = '100%'; else if (isdef(styles.hrest)) styles.h = 'rest';
  let dParent = elem.parentNode;
  if (isdef(dParent)) {
    let pad = dParent && isdef(dParent.style.padding) ? parseInt(dParent.style.padding) : 0;
    let rp = getRect(dParent);
    let r = getRect(elem, dParent);
    if (styles.w == 'rest') {
      let left = r.l;
      let w = rp.w;
      let wrest = w - left - pad;
      styles.w = wrest;
    }
    if (styles.h == 'rest') {
      let r1 = getRect(dParent.lastChild, dParent);
      let hrest = rp.h - (r1.y) - pad;
      styles.h = hrest;
    }
  }
  let bg, fg;
  if (isdef(styles.bg) || isdef(styles.fg)) {
    [bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
  }
  if (isdef(styles.vpadding) || isdef(styles.hpadding)) {
    styles.padding = valf(styles.vpadding, 0) + unit + ' ' + valf(styles.hpadding, 0) + unit;
  }
  if (isdef(styles.vmargin) || isdef(styles.hmargin)) {
    styles.margin = valf(styles.vmargin, 0) + unit + ' ' + valf(styles.hmargin, 0) + unit;
  }
  if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
    let rtop = '' + valf(styles.upperRounding, 0) + unit;
    let rbot = '' + valf(styles.lowerRounding, 0) + unit;
    styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
  }
  if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
  if (isdef(styles.round)) { elem.style.setProperty('border-radius', '50%'); }
  for (const k in styles) {
    if (['round','box'].includes(k)) continue;
    let val = styles[k];
    let key = k;
    if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
    else if (k == 'font' && !isString(val)) {
      let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
      let ff = f.family;
      let fv = f.variant;
      let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
      let fs = isdef(f.italic) ? 'italic' : f.style;
      if (nundef(fz) || nundef(ff)) return null;
      let s = fz + ' ' + ff;
      if (isdef(fw)) s = fw + ' ' + s;
      if (isdef(fv)) s = fv + ' ' + s;
      if (isdef(fs)) s = fs + ' ' + s;
      elem.style.setProperty(k, s);
      continue;
    } else if (k.includes('class')) {
      mClass(elem, styles[k]);
    } else if (k == 'border') {
      if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
      if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
    } else if (k == 'ajcenter') {
      elem.style.setProperty('justify-content', 'center');
      elem.style.setProperty('align-items', 'center');
    } else if (k == 'layout') {
      if (val[0] == 'f') {
        val = val.slice(1);
        elem.style.setProperty('display', 'flex');
        elem.style.setProperty('flex-wrap', 'wrap');
        let hor, vert;
        if (val.length == 1) hor = vert = 'center';
        else {
          let di = { c: 'center', s: 'start', e: 'end' };
          hor = di[val[1]];
          vert = di[val[2]];
        }
        let justStyle = val[0] == 'v' ? vert : hor;
        let alignStyle = val[0] == 'v' ? hor : vert;
        elem.style.setProperty('justify-content', justStyle);
        elem.style.setProperty('align-items', alignStyle);
        switch (val[0]) {
          case 'v': elem.style.setProperty('flex-direction', 'column'); break;
          case 'h': elem.style.setProperty('flex-direction', 'row'); break;
        }
      } else if (val[0] == 'g') {
        val = val.slice(1);
        elem.style.setProperty('display', 'grid');
        let n = allNumbers(val);
        let cols = n[0];
        let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
        elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
        elem.style.setProperty('place-content', 'center');
      }
    } else if (k == 'layflex') {
      elem.style.setProperty('display', 'flex');
      elem.style.setProperty('flex', '0 1 auto');
      elem.style.setProperty('flex-wrap', 'wrap');
      if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
    } else if (k == 'laygrid') {
      elem.style.setProperty('display', 'grid');
      let n = allNumbers(val);
      let cols = n[0];
      let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
      elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
      elem.style.setProperty('place-content', 'center');
    }
    if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
    else if (key == 'background-color') elem.style.background = bg;
    else if (key == 'color') elem.style.color = fg;
    else if (key == 'opacity') elem.style.opacity = val;
    else if (key == 'wrap') { if (val == 'hard') elem.setAttribute('wrap', 'hard'); else elem.style.flexWrap = 'wrap'; }
    else if (k.startsWith('dir')) {
      isCol = val[0] == 'c';
      elem.style.setProperty('flex-direction', 'column');
    } else if (key == 'flex') {
      if (isNumber(val)) val = '' + val + ' 1 0%';
      elem.style.setProperty(key, makeUnitString(val, unit));
    } else {
      elem.style.setProperty(key, makeUnitString(val, unit));
    }
  }
}
function mStyleX(elem, styles, unit = 'px') {
  const paramDict = {
    bg: 'background-color',
    fg: 'color',
    align: 'text-align',
    matop: 'margin-top',
    maleft: 'margin-left',
    mabottom: 'margin-bottom',
    maright: 'margin-right',
    patop: 'padding-top',
    paleft: 'padding-left',
    pabottom: 'padding-bottom',
    paright: 'padding-right',
    rounding: 'border-radius',
    w: 'width',
    h: 'height',
    fontSize: 'font-size',
    fz: 'font-size',
    family: 'font-family',
    weight: 'font-weight',
  };
  let bg, fg;
  if (isdef(styles.bg) || isdef(styles.fg)) {
    [bg, fg] = getExtendedColors(styles.bg, styles.fg);
  }
  if (isdef(styles.vmargin) && isdef(styles.hmargin)) {
    styles.margin = vmargin + unit + ' ' + hmargin + unit;
  }
  if (isdef(styles.vpadding) && isdef(styles.hpadding)) {
    styles.padding = vpadding + unit + ' ' + hpadding + unit;
  }
  for (const k in styles) {
    let val = styles[k];
    let key = k;
    if (isdef(paramDict[k])) key = paramDict[k];
    else if (k == 'font' && !isString(val)) {
      let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
      let ff = f.family;
      let fv = f.variant;
      let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
      let fs = isdef(f.italic) ? 'italic' : f.style;
      if (nundef(fz) || nundef(ff)) return null;
      let s = fz + ' ' + ff;
      if (isdef(fw)) s = fw + ' ' + s;
      if (isdef(fv)) s = fv + ' ' + s;
      if (isdef(fs)) s = fs + ' ' + s;
      elem.style.setProperty(k, s);
      continue;
    } else if (k == 'border') {
      if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
    }
    if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
    else if (key == 'background-color') elem.style.background = bg;
    else if (key == 'color') elem.style.color = fg;
    else {
      elem.style.setProperty(key, makeUnitString(val, unit));
    }
  }
}
function mSuit(ckey, sz = 20, color = null) {
  let suit = ckey.length == 1 ? ckey : ckey[1];
  let di = { S: '&spades;', H: '&hearts;', D: '&diams;', C: '&clubs;' };
  color = valf(color, suit == 'H' || suit == 'D' ? 'red' : 'black');
  let html = `<span style='color:${color};font-size:${sz}px'>${di[suit]}</span>`;
  return html;
}
function mSym(key, dParent, styles = {}, pos, classes) {
  let info = Syms[key];
  styles.display = 'inline-block';
  let family = info.family;
  styles.family = family;
  let sizes;
  if (isdef(styles.sz)) { sizes = mSymSizeToBox(info, styles.sz, styles.sz); }
  else if (isdef(styles.w) && isdef(styles.h)) { sizes = mSymSizeToBox(info, styles.w, styles.h); }
  else if (isdef(styles.fz)) { sizes = mSymSizeToFz(info, styles.fz); }
  else if (isdef(styles.h)) { sizes = mSymSizeToH(info, styles.h); }
  else if (isdef(styles.w)) { sizes = mSymSizeToW(info, styles.w); }
  else { sizes = mSymSizeToFz(info, 25); }
  styles.fz = sizes.fz;
  styles.w = sizes.w;
  styles.h = sizes.h;
  styles.align = 'center';
  if (isdef(styles.bg) && info.family != 'emoNoto') { styles.fg = styles.bg; delete styles.bg; }
  let x = mDiv(dParent, styles, null, info.text);
  if (isdef(classes)) mClass(x, classes);
  if (isdef(pos)) { mPlace(x, pos); }
  return x;
}
function mSymSizeToBox(info, w, h) {
  let fw = w / info.w;
  let fh = h / info.h;
  let f = Math.min(fw, fh);
  return { fz: 100 * f, w: info.w * f, h: info.h * f };
}
function mSymSizeToFz(info, fz) { let f = fz / 100; return { fz: fz, w: info.w * f, h: info.h * f }; }
function mSymSizeToH(info, h) { let f = h / info.h; return { fz: 100 * f, w: info.w * f, h: h }; }
function mSymSizeToW(info, w) { let f = w / info.w; return { fz: 100 * f, w: w, h: info.h * f }; }
function mTable(dParent, headers, showheaders, styles = { mabottom: 0 }, className = 'table') {
  let d = mDiv(dParent);
  let t = mCreate('table');
  mAppend(d, t);
  if (isdef(className)) mClass(t, className);
  if (isdef(styles)) mStyle(t, styles);
  if (showheaders) {
    let code = `<tr>`;
    for (const h of headers) {
      code += `<th>${h}</th>`
    }
    code += `</tr>`;
    t.innerHTML = code;
  }
  return t;
}
function mTableCol(r, val) {
  let col = mCreate('td');
  mAppend(r, col);
  if (isdef(val)) col.innerHTML = val;
  return col;
}
function mTableCommandify(rowitems, di) {
  for (const item of rowitems) {
    for (const index in di) {
      let colitem = item.colitems[index];
      colitem.div.innerHTML = di[index](item, colitem.val);
    }
  }
}
function mTableRow(t, o, headers, id) {
  let elem = mCreate('tr');
  if (isdef(id)) elem.id = id;
  mAppend(t, elem);
  let colitems = [];
  for (const k of headers) {
    let val = isdef(o[k]) ? isDict(o[k]) ? JSON.stringify(o[k]) : isList(o[k]) ? o[k].join(', ') : o[k] : '';
    let col = mTableCol(elem, val);
    colitems.push({ div: col, key: k, val: val });
  }
  return { div: elem, colitems: colitems };
}
function mText(text, dParent, styles, classes) {
  if (!isString(text)) text = text.toString();
  let d = mDiv(dParent);
  if (!isEmpty(text)) { d.innerHTML = text; }
  if (isdef(styles)) mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  return d;
}
function mYaml(d, js) {
  d.innerHTML = '<pre>' + jsonToYaml(js) + '</pre>';
  return d;
}
function name2id(name) { return 'd_' + name.split(' ').join('_'); }
function new_cards_animation(n = 2) {
  let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
  let pl = fen.players[uplayer];
  if (stage == 'card_selection' && !isEmpty(pl.newcards)) {
    let anim_elems = [];
    for (const key of pl.newcards) {
      let ui = lastCond(UI.players[uplayer].hand.items, x => x.key == key);
      if (nundef(ui)) { pl.newcards = []; return; }
      ui = iDiv(ui);
      anim_elems.push(ui);
    }
    delete pl.newcards;
    anim_elems.map(x => mPulse(x, n * 1000));
  }
}
function new_deal(fen) {
  let deck = fen.deck = create_fen_deck('n', fen.num_decks);
  shuffle(deck);
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    let handsize = pl.handsize;
    pl.hand = deck_deal(deck, handsize);
  }
}
function normalize_bid(bid) {
  let need_to_sort = bid[0] == '_' && bid[2] != '_'
    || bid[2] != '_' && bid[2] > bid[0]
    || bid[2] == bid[0] && is_higher_ranked_name(bid[3], bid[1]);
  if (need_to_sort) {
    let [h0, h1] = [bid[0], bid[1]];
    [bid[0], bid[1]] = [bid[2], bid[3]];
    [bid[2], bid[3]] = [h0, h1];
  }
  return bid;
}
function nundef(x) { return x === null || x === undefined; }
function object2string(o, props = [], except_props = []) {
  let s = '';
  if (nundef(o)) return s;
  if (isString(o)) return o;
  let keys = Object.keys(o).sort();
  for (const k of keys) {
    if (!isEmpty(props) && props.includes(k) || !except_props.includes(k)) {
      let val = isList(o[k]) ? o[k].join(',') : isDict(o[k]) ? object2string(o[k].props, except_props) : o[k];
      let key_part = isEmpty(s) ? '' : `, ${k}:`;
      s += val;
    }
  }
  return s;
}
function on_poll_table_seen(obj) {
  delete DA.poll;
  update_session(obj);
  if (is_game_host()) {
    let txt = jsyaml.dump(DB);
    DA.next = get_games;
    let fen = get_score_fen_from_cur_players();
    to_server({ tid: Session.cur_tid, fen: fen, uname: Session.cur_user, db: txt }, 'save_and_delete');
  } else {
    show_user_intro_screen(true);
  }
}
function on_poll_table_started(obj) {
  let t = obj.tables[0];
  update_db_user_from_pl_options(t.pl_options, t.game);
  Session.cur_tid = t.id;
  Session.cur_game = t.game;
  delete DA.poll;
  status_message_off();
  hide('divTest');
  close_sidebar();
  mBy('user_info_mini').style.display = 'flex';
  Session.scoring_complete = false;
  get_play();
}
function onclick_by_rank() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  let items = ui_get_hand_items(uplayer).map(x => x.o);
  let h = UI.players[uplayer].hand;
  pl.handsorting = 'rank';
  Clientdata.handsorting = pl.handsorting;
  localStorage.setItem('handsorting', Clientdata.handsorting);
  let cardcont = h.cardcontainer;
  let ch = arrChildren(cardcont);
  ch.map(x => x.remove());
  let sorted = sortCardItemsByRank(items, Z.func.rankstr);
  h.sortedBy = 'rank';
  for (const item of sorted) {
    mAppend(cardcont, iDiv(item));
  }
}
function onclick_by_suit() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  let items = ui_get_hand_items(uplayer).map(x => x.o);
  let h = UI.players[uplayer].hand;
  Clientdata.handsorting = pl.handsorting = 'suit';
  localStorage.setItem('handsorting', Clientdata.handsorting);
  let cardcont = h.cardcontainer;
  let ch = arrChildren(cardcont);
  ch.map(x => x.remove());
  let sorted = sortCardItemsByRank(items, Z.func.rankstr);
  sorted = sortCardItemsBySuit(sorted);
  h.sortedBy = 'suit';
  for (const item of sorted) {
    mAppend(cardcont, iDiv(item));
  }
}
function onclick_game_menu_item(ev) {
  let gamename = ev_to_gname(ev);
  stop_game();
  show_game_options_menu(gamename);
}
function onclick_gameover_screen() {
  let game = Session.cur_game;
  let winners = Session.winners;
  if (!Session.scoring_complete) {
    console.log('scoring...')
    decrease_handicap_if_winstreak(winners, game);
    increase_handicap_if_losestreak();
    Session.scoring_complete = true;
  }
  if (is_admin()) {
    let txt = jsyaml.dump(DB);
    DA.next = get_games;
    let fen = get_score_fen_from_cur_players();
    to_server({ tid: Session.cur_tid, fen: fen, uname: Session.cur_user, db: txt }, 'save_and_delete');
  } else {
    get_got_user_in_intro_screen();
    let t = Session.cur_table;
    let fen = t.status == 'past' ? t.fen : get_score_fen_from_cur_players();
    intro_create_score_table(fen, t.friendly);
  }
}
function onclick_logout() {
  mFadeClearShow('dAdminRight', 300);
  mClear('dAdminMiddle');
  stop_game();
  clear_screen();
  U = null;
  show_users();
}
function onclick_reload() {
  if (isdef(Z)) {
    if (Z.game == 'fritz' && nundef(Z.fen.winners)) {
      console.log(Z);
      Z.fen.players[Z.uplayer].time_left = stop_timer();
      take_turn_fen();
    } else {
      FORCE_REDRAW = true; send_or_sim({ friendly: Z.friendly, uname: Z.uplayer, auto: false }, 'table');
    }
  } else if (U) { onclick_tables(); }
  else { show_users(); }
}
function onclick_tables() { phpPost({ app: 'simple' }, 'tables'); }
function onclick_user(uname) {
  U = firstCond(Serverdata.users, x => x.name == uname);
  localStorage.setItem('uname', U.name);
  DA.secretuser = U.name;
  let elem = firstCond(arrChildren('dUsers'), x => x.getAttribute('username') == uname);
  let img = elem.children[0];
  mShrinkTranslate(img, .75, 'dAdminRight', 400, show_username);
  mFadeClear('dUsers', 300);
}
function onClickBadgeX(ev) {
  interrupt();
  let item = evToItem(ev);
  setBadgeLevel(item.index);
  userUpdate(['games', G.id, 'startLevel'], item.index);
  auxOpen = false;
  TOMain = setTimeout(G.controller.startGame.bind(G.controller), 100);
}
function open_game_ui() {
  clear_table_all();
  let hmin = firstNumber(getCssVar('--inner_left_panel_height'));
  mBy("inner_left_panel").innerHTML = `<div style='min-height:${hmin}px'>
  <div id="md" style="display: flex;min-height:${hmin}px">
    <div id="dLeftSide" style="align-self: stretch;min-height:${hmin}px"></div>
    <div id="dRightSide" style='min-height:${hmin}px'>
      <div id="table" class="flexWrap"></div>
    </div>
  </div></div>`;
  initTable();
  badges_off();
}
function open_prompt() {
  console.assert(!uiActivated, 'open_prompt with uiActivated ON !!!!!!!!!!!!!!!!!!!!!!!!!!');
  let game = Session.cur_game;
  let uname = Session.cur_user;
  let g = Session;
  let next = lookup(DB.games, [game]); if (next) copyKeys(next, g);
  next = lookup(DB.users, [uname, 'games', game]); if (next) copyKeys(next, g);
  let level = g.level = valf(g.startlevel, g.def_startlevel);
  lookupSet(DB.users, [uname, 'games', game, 'startlevel'], level);
  next = lookup(DB.games, [game, 'levels']);
  if (next) copyKeys(next[level], g);
  g.maxlevel = valf(get_keys(next).length, 0) - 1;
  g.color = getColorDictColor(g.color);
  for (const k in g.options) {
    g[k] = get_game_option(g, k);
    console.log('g.' + k, g[k]);
  }
  delete g.levels;
  clearEvents(); set_background_color(g.color);
  QContextCounter += 1;
  show_game_name(g.friendly);
  show_title(g.table.friendly);
  show_level(g.level, g.maxlevel);
  if (Session.is_badges) setBadgeLevel(g.level);
  g.startTime = get_timestamp();
  mLinebreak(dTable, 15);
  let items = g.items = spotit_deal(g.num_cards, g.rows, g.cols, g.vocab, g.lang, g.min_scale, g.max_scale);
  Selected = null;
  uiActivated = true;
}
function panel(areaName, oSpec, oid, o) {
  let [num, or, split, bg, fg, id, panels, parent] = getParams(areaName, oSpec, oid);
  if (num > 0) {
    parent.style.display = 'grid';
    clearElement(parent);
    for (let i = 0; i < num; i++) {
      let d = mDiv100(parent);
      d.id = getUID();
      if (panels.length > i) {
        if (oid) dynamicArea(d.id, panels[i], oid, o); else staticArea(d.id, panels[i]);
      }
    }
    if (or == 'rows') {
      console.log('====', split * 100);
      parent.style.gridTemplateColumns = `${split * 100}% 1fr`;
    }
  }
  return parent;
}
function param_present_contacts(obj, dParent, onclick_func_name) {
  let others = sync_users(obj.users);
  Session.others = others.map(x => x.name);
  let msgs = valf(obj.msgs, {});
  let mydata = `
  <style>
    @keyframes appear{
      0%{opacity:0;transform: translateY(50px)}
      100%{opacity:1;transform: translateY(0px)}
     }
     .contact{
       cursor:pointer;
       transition: all .5s cubic-bezier(0.68, -2, 0.265, 1.55);
     }
     .contact:hover{
       transform: scale(1.1);
     }
  </style>
  <div style="text-align: center; animation: appear 1s ease both">
  `;
  let mydata_list = '';
  for (const r of others) {
    row = r;
    let image = get_image_path(row);
    let mydata_element = `
        <div class='contact' style='position:relative;text-align:center;margin-bottom:18px;' username='${row.name}' 
          onclick='${onclick_func_name}(event)'>
          <img src='${image}' draggable='true' ondragstart='drag(event)' class='img_person sz100' style='margin:0;'/>
          <br>${row.name}`;
    if (isdef(msgs[row.username])) {
      mydata_element += `<div style='width:20px;height:20px;border-radius:50%;background-color:orange;color:white;position:absolute;left:0px;top:0px;'>` + msgs[row.username] + "</div>";
    }
    mydata_element += "</div>";
    mydata_list += mydata_element;
  }
  mydata += mydata_list;
  dParent.innerHTML = mydata;
}
function path2fen(fen, path) { let o = lookup(fen, path.split('.')); return o; }
function pauseSound() {
  _qSound = [];
  if (_loaded && isdef(_sndPlayer)) {
    clearTimeout(TOSound);
    _sndPlayer.onended = null;
    _sndPlayer.onpause = whenSoundPaused;
    _sndPlayer.pause();
  }
}
function PHLayout() {
  if (isdef(UI.DRR)) UI.DRR.remove();
  mAppend(UI.dRechts, UI.dHistory);
  Clientdata.historyLayout = 'ph';
}
function phpPost(data, cmd) {
  if (DA.TEST1 === true && cmd == 'table') { cmd = 'table1'; }
  pollStop();
  var o = {};
  o.data = valf(data, {});
  o.cmd = cmd;
  o = JSON.stringify(o);
  if (DA.SIMSIM && (DA.exclusive || ['table', 'startgame', 'gameover', 'tables'].includes(cmd))) {
    sendSIMSIM(o, DA.exclusive);
    FORCE_REDRAW = true;
    if (DA.exclusive) return;
  } else if (DA.simulate) {
    sendSIMSIM(o, true, true);
    FORCE_REDRAW = true;
    return;
  }
  clear_transaction();
  var xml = new XMLHttpRequest();
  loader_on();
  xml.onload = function () {
    if (xml.readyState == 4 || xml.status == 200) {
      loader_off();
      handle_result(xml.responseText, cmd);
    } else { console.log('WTF?????') }
  }
  xml.open("POST", "api.php", true);
  xml.send(o);
}
function player_stat_count(key, n, dParent, styles = {}) {
  let sz = valf(styles.sz, 16);
  addKeys({ display: 'flex', margin: 4, dir: 'column', hmax: 2 * sz, 'align-content': 'start', fz: sz, align: 'center' }, styles);
  let d = mDiv(dParent, styles);
  if (isdef(Syms[key])) mSym(key, d, { h: sz, 'line-height': sz, w: '100%' });
  else mText(key, d, { h: sz, fz: sz, w: '100%' });
  d.innerHTML += `<span style="font-weight:bold">${n}</span>`;
  return d;
}
function poll() {
  if (IS_POLLING_ALLOWED) {
    if (isdef(DA.poll.func)) DA.poll.data = DA.poll.func(DA.poll.data);
    console.log('...poll')
    to_server(DA.poll.data, DA.poll.type);
  } else console.log('polling OFF!');
}
function poll_for_table_seen_or_deleted() {
  start_polling({ uname: Session.cur_user, tid: Session.cur_tid }, 'poll_table_seen', on_poll_table_seen, 3000);
}
function poll_for_table_started() {
  start_polling(Session.cur_user, 'poll_table_started', on_poll_table_started, 3000);
}
function pollStop() { clearTimeout(TO.poll); Clientdata.AUTORESET = true; }
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return await response.text();
}
function posXY(d1, dParent, x, y, unit = 'px', position = 'absolute') {
  if (nundef(position)) position = 'absolute';
  if (dParent && !dParent.style.position) dParent.style.setProperty('position', 'relative');
  d1.style.setProperty('position', position);
  if (isdef(x)) d1.style.setProperty('left', makeUnitString(x, unit));
  if (isdef(y)) d1.style.setProperty('top', makeUnitString(y, unit));
}
async function prelims() {
  M.categories = await mGetJson('news_categories.json');
  M.allItems = await mGetJson('news_items.json'); // console.log(M);
  createDebugButton();
  if (DEBUG) {
    console.log('DEBUG MODE ON');
  } else {
    console.log('DEBUG MODE OFF');
  }
  if (windowWidth < 1040) {
    alert("Please increase the width of your browser window to at least 1040px to ensure the best user experience.");
  }
}
function prep_move() {
  let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.pl];
  for (const k of ['round', 'phase', 'stage', 'step', 'turn']) { fen[k] = Z[k]; }
  deactivate_ui();
  clear_timeouts();
}
function present() {
  if (Settings.perspective == 'me') presentFor(me);
  else presentAll();
}
function present_a_game() {
  let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.pl];
  UI.hand = ui_type_hand(pl.hand, dTable, { margin: 20 });
}
function present_contacts(obj) {
  let others = sync_users(obj.myusers);
  Session.others = others.map(x => x.name);
  var inner_left_panel = mBy("inner_left_panel");
  inner_left_panel.innerHTML = createContactsContent(others, obj.msgs);
}
function present_games() {
  let html = `<div id='game_menu' style="text-align: center; animation: appear 1s ease both">`;
  for (const g of dict2list(DB.games)) { html += ui_game_menu_item(g, Session.tables_by_game[g.id]); }
  mBy('inner_left_panel').innerHTML = html;
  mCenterCenterFlex(mBy('game_menu'));
}
function present_intro() {
  let dParent = mBy('divTest'); show(dParent); clearElement(dParent);
  mStyle(dParent, { position: 'absolute', top: 0, bg: 'green', wmin: '100vw', hmin: '100vw' });
  param_present_contacts(Session, dParent, 'onclick_user_in_intro');
}
function present_login(obj) { param_present_contacts(obj, mBy('inner_left_panel'), 'onclick_user_login'); }
function present_non_admin_waiting_screen() {
  let dParent = mBy('divTest'); show(dParent); clearElement(dParent);
  mStyle(dParent, { position: 'absolute', top: 0, bg: 'green', wmin: '100vw', hmin: '100vw' });
  let dlogout = mDiv(dParent, { position: 'absolute', right: 10, top: 4, cursor: 'pointer' }, 'ddd_logout', `logout`);
  dlogout.onclick = onclick_logout;
  show_user_image(Session.cur_user, dParent);
  status_message_new(`hi, ${capitalize(Session.cur_user)}, a game is starting soon...`, dParent, { classname: 'slow_gradient_blink' });
  mLinebreak(dParent, 100);
  show_rankings(dParent);
}
function present_table(obj) {
  Session.cur_menu = 'play';
  console.assert(isdef(obj.table), 'present_table without obj.table!!!!!!!!!!!!!!');
  update_session(obj);
  let table_status = Session.cur_table.status;
  let my_status = Session.cur_me.player_status;
  let have_another_move = my_status == 'joined';
  if (table_status == 'deleted') { in_game_off(); in_game_open_prompt_off(); status_message_off(); get_games(); return; }
  if (!in_game()) { open_game_ui(); in_game_on(); }
  let d = mBy('table'); d.animate([{ opacity: 0, transform: 'translateY(50px)' }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: 1000, easing: 'ease' });
  if (!have_another_move) { reload_last_game_state(); }
  else if (!in_game_open_prompt()) { open_prompt(); in_game_open_prompt_on(); }
  else { uiActivated = true; }
  update_game_status(Session.cur_players);
  if (table_status == 'over') {
    stop_game();
    let winners = Session.winners = race_check_endcondition();
    if (!isEmpty(winners)) {
      stop_game();
      DA.after_status_message = onclick_gameover_screen;
      show_gameover(winners);
    }
  }
}
function present_table_from_csv(csv_text, dParent) {
  prepare_table();
  dParent.innerHTML = get_table_html();
  import_the_text(csv_text);
}
function present_wait_for_table_to_start() {
  status_message(`hi, ${capitalize(Session.cur_user)}, a game is starting soon...`, { top: 330, classname: 'slow_gradient_blink' });
  poll_for_table_started();
}
function presentAll() {
  clearZones();
  for (const pl of T.players) {
    let zone = Zones[pl.id];
    pl.hand.showDeck(zone.dData, 'right', 0, false);
  }
  showTrick();
}
function presentFor(me) {
  clearElement(dTable);
  let others = arrWithout(T.players, [me]);
  for (const pl of others) {
    pl.hand.showDeck(dTable, 'right', 0, false);
  }
  mLinebreak(dTable);
  T.trick.showDeck(dTable, 'right', 20, true);
  mLinebreak(dTable);
  me.hand.showDeck(dTable, 'right', 0, false);
  showFleetingMessage('click to play a card!');
}
function PRHLayout() {
  let drr = UI.DRR = mDiv(dTable);
  mAppend(drr, UI.dHistory);
  Clientdata.historyLayout = 'prh';
}
function processServerdata(obj, cmd) {
  if (isdef(Serverdata.table)) Serverdata.prevtable = jsCopy(Serverdata.table);
  if (isdef(obj.playerdata)) {
    let old_playerdata = valf(Serverdata.playerdata, []);
    let di = list2dict(old_playerdata, 'name');
    Serverdata.playerdata = if_stringified(obj.playerdata);
    Serverdata.playerdata_changed_for = [];
    for (const o of Serverdata.playerdata) {
      let old = di[o.name];
      o.state = isEmpty(o.state) ? '' : if_stringified(o.state);
      let changed = nundef(old) ? true : !simpleCompare(old, o);
      if (changed) {
        Serverdata.playerdata_changed_for.push(o.name);
      }
    }
  } else if (isdef(Serverdata.playerdata)) {
    Serverdata.playerdata_changed_for = Serverdata.playerdata.map(x => x.name);
    Serverdata.playerdata = [];
  } else Serverdata.playerdata_changed_for = [];
  for (const k in obj) {
    if (k == 'tables') Serverdata.tables = obj.tables.map(x => unpack_table(x));
    else if (k == 'table') { Serverdata.table = unpack_table(obj.table); }
    else if (k == 'users') Serverdata[k] = obj[k];
    else if (k == 'playerdata') continue;
    else if (cmd != 'assets') Serverdata[k] = obj[k];
  }
  if (isdef(obj.table)) {
    assertion(isdef(Serverdata.table) && obj.table.id == Serverdata.table.id, 'table NOT in Serverdata or table id mismatch');
    let i = Serverdata.tables.findIndex(x => x.id == obj.table.id);
    if (i != -1) { Serverdata.tables[i] = Serverdata.table; } else Serverdata.tables.push(Serverdata.table);
  }
  else if (isdef(Serverdata.table)) {
    let t = Serverdata.tables.find(x => x.id == Serverdata.table.id);
    if (nundef(t)) delete Serverdata.table;
  }
}
function pSBC(p, c0, c1, l) {
  function pSBCr(d) {
    let i = parseInt, m = Math.round, a = typeof c1 == 'string';
    let n = d.length,
      x = {};
    if (n > 9) {
      ([r, g, b, a] = d = d.split(',')), (n = d.length);
      if (n < 3 || n > 4) return null;
      (x.r = parseInt(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = parseInt(g)), (x.b = parseInt(b)), (x.a = a ? parseFloat(a) : -1);
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
      d = parseInt(d.slice(1), 16);
      if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
      else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
    }
    return x;
  }
  let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof c1 == 'string';
  if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
  h = c0.length > 9;
  h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h;
  f = pSBCr(c0);
  P = p < 0;
  t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 };
  p = P ? p * -1 : p;
  P = 1 - p;
  if (!f || !t) return null;
  if (l) { r = m(P * f.r + p * t.r); g = m(P * f.g + p * t.g); b = m(P * f.b + p * t.b); }
  else { r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5); g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5); b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5); }
  a = f.a;
  t = t.a;
  f = a >= 0 || t >= 0;
  a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0;
  if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
  else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
}
function race_check_endcondition() {
  let players = get_values(Session.cur_players);
  let winners = players.filter(x => x.score >= Session.winning_score).map(x => x.name);
  return winners;
}
function random_motto() { return chooseRandom(["time to play!", "life's good", "one game at a time!", "let's play!", "no place like home", "cafe landmann"]) }
function randomColor() { return rColor(); }
function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rChoose(arr, n = 1, func = null, exceptIndices = null) {
  if (isDict(arr)) arr = dict2list(arr, 'key');
  let indices = arrRange(0, arr.length - 1);
  if (isdef(exceptIndices)) {
    for (const i of exceptIndices) removeInPlace(indices, i);
  }
  if (isdef(func)) indices = indices.filter(x => func(arr[x]));
  if (n == 1) {
    let idx = Math.floor(Math.random() * indices.length);
    return arr[indices[idx]];
  }
  arrShuffle(indices);
  return indices.slice(0, n).map(x => arr[x]);
}
function rColor(brightPerOrAlpha01 = 1, alpha01 = 1, hueVari = 60) {
  let c;
  if (brightPerOrAlpha01 <= 1) {
    c = '#';
    for (let i = 0; i < 6; i++) { c += rChoose(['f', 'c', '9', '6', '3', '0']); }
    alpha01 = brightPerOrAlpha01;
  } else {
    let hue = rHue(hueVari);
    let sat = 100;
    let b = isNumber(brightPerOrAlpha01) ? brightPerOrAlpha01 : brightPerOrAlpha01 == 'dark' ? 25 : brightPerOrAlpha01 == 'light' ? 75 : 50;
    c = colorFromHSL(hue, sat, b);
  }
  return alpha01 < 1 ? colorTrans(c, alpha01) : c;
}
function reindex_items(items) { let i = 0; items.map(x => { x.index = i; i++; }); }
function reload() {
  console.log('reload!!!')
  if (radio_contacts.checked == true) get_contacts();
  else if (radio_chat.checked == true) get_chats();
  else if (radio_games.checked == true) get_games();
  else if (radio_play.checked == true) get_play();
}
function reload_last_game_state() { if (!in_game_open_prompt()) open_prompt(Session.cur_me.state); }
function remove_from_selection(card) {
  if (nundef(Z.A)) return;
  let A = Z.A;
  let item = firstCond(A.items, x => x.id == card.id);
  if (isdef(item)) {
    let idx = item.index;
    A.items.splice(item.index, 1);
    removeInPlace(A.selected, item.index);
    make_card_unselectable(item);
    make_card_unselected(item);
    reindex_items(A.items);
  }
}
function remove_player(fen, uname) {
  if (nundef(fen.original_players)) fen.original_players = jsCopy(fen.players);
  removeInPlace(fen.plorder, uname);
  delete fen.players[uname];
  return fen.plorder;
}
function removeDuplicates(keys, prop) {
  let di = {};
  let res = [];
  let items = keys.map(x => Syms[x]);
  for (const item of items) {
    if (isdef(di[item.best])) { continue; }
    res.push(item);
    di[item.key] = true;
  }
  return res.map(x => x.key);
}
function removeInPlace(arr, el) {
  arrRemovip(arr, el);
}
function replace_jolly(key, j) {
  let jolly_idx = find_index_of_jolly(j);
  j[jolly_idx] = key;
}
function replaceAll(str, sSub, sBy) {
  let regex = new RegExp(sSub, 'g');
  return str.replace(regex, sBy);
}
function resetUIDs() { UIDCounter = 0; FRUIDCounter = -1; }
function resplay_container(targetgroup, ovpercent) {
  let d = iDiv(targetgroup);
  let card = Items[targetgroup.ids[0]];
  let ov = valf(targetgroup.ov, .1222)
  mContainerSplay(d, 2, card.w, card.h, arrChildren(d).length, ov * card.w);
  let items = arrChildren(d).map(x => Items[x.id]);
  ui_add_cards_to_hand_container(d, items);
}
function reverse(x) {
  if (isString(x)) {
    var newString = "";
    for (var i = x.length - 1; i >= 0; i--) {
      newString += x[i];
    }
    return newString;
  }
  if (isList(x)) return x.reverse();
  if (isDict(x)) return dict2list(x, 'value').reverse();
  return x;
}
function rHue(vari = 36) { return (rNumber(0, vari) * Math.round(360 / vari)) % 360; }
function rNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function round_change_animation(n = 2) {
  let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
  let pl = fen.players[uplayer];
  if (pl.roundchange) {
    let d = mBy('dTitleLeft');
    mStyle(d, { 'transform-origin': '0% 0%' });
    mPulse(d, n * 1000);
    show_special_message(`${fen.round_winner} won round ${Z.round - 1}!!!`)
    delete pl.roundchange;
  }
}
function runderkreis(color, id) {
  return `<div id=${id} style='width:20px;height:20px;border-radius:50%;background-color:${color};color:white;position:absolute;left:0px;top:0px;'>` + '' + "</div>";
}
function rWheel(n = 1, hue = null, sat = 100, bri = 50) {
  let d = 360 / n;
  let h = valf(hue, rHue());
  let arr = [];
  for (let i = 0; i < n; i++) {
    console.log('h', h)
    let r = colorFromHSL(h, sat, bri);
    h = (h + d) % 360;
    arr.push(r);
  }
  return arr;
}
function sameList(l1, l2) {
  if (l1.length != l2.length) return false;
  for (const s of l1) {
    if (!l2.includes(s)) return false;
  }
  return true;
}
function saveFile(name, type, data) {
  if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);
  var a = $("<a style='display: none;'/>");
  var url = window.URL.createObjectURL(new Blob([data], { type: type }));
  a.attr('href', url);
  a.attr('download', name);
  $('body').append(a);
  a[0].click();
  setTimeout(function () {
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 500);
}
function saveFileAtClient(name, type, data) {
  if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);
  let a = document.createElement('a');
  a.style.display = 'none';
  let url = window.URL.createObjectURL(new Blob([data], { type: type }));
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  simulateClick(a);
  setTimeout(function () {
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 500);
}
function saveUser() {
  U.lastGame = G.id;
  if (!startsWith(Username, 'test')) localStorage.setItem('user', Username);
  DB.users[Username] = U;
  dbSaveX();
}
function scoring(isCorrect) {
  Score.nTotal += 1;
  if (isCorrect) { Score.nCorrect += 1; if (G.trialNumber == 1) Score.nCorrect1 += 1; }
  percentageCorrect = Math.round(100 * Score.nCorrect / Score.nTotal);
  if (isCorrect) { Score.nPos += 1; Score.nNeg = 0; } else { Score.nPos = 0; Score.nNeg += 1; }
  let levelChange = 0;
  let gameChange = false;
  let nextLevel = G.level;
  let toggle = G.pictureLabels == 'toggle';
  let hasLabels = G.showLabels == true;
  let boundary = G.samplesPerGame;
  let pos = G.incrementLevelOnPositiveStreak;
  let posSeq = pos > 0 && Score.nPos >= pos;
  let halfposSeq = pos > 0 && Score.nPos >= pos / 2;
  let neg = G.decrementLevelOnNegativeStreak;
  let negSeq = neg > 0 && Score.nNeg >= neg;
  let halfnegSeq = neg > 0 && Score.nNeg >= neg / 2;
  let labelsNextRound = G.showLabels;
  if (halfposSeq && hasLabels && toggle) { labelsNextRound = false; }
  else if (posSeq) { levelChange = 1; nextLevel += 1; Score.nPos = 0; }
  if (halfnegSeq && !hasLabels && toggle) { labelsNextRound = true; }
  else if (negSeq) { levelChange = -1; if (nextLevel > 0) nextLevel -= 1; Score.nNeg = 0; }
  if (nextLevel != G.Level && nextLevel > 0 && nextLevel <= G.maxLevel) {
    userUpdate(['games', G.id, 'startLevel'], nextLevel);
  }
  if (Score.nTotal >= boundary) {
    gameChange = true; levelChange = false;
  }
  if (levelChange || gameChange) {
    if (toggle) labelsNextRound = true;
  } else if (!halfnegSeq && toggle && hasLabels && Score.nTotal >= G.samplesPerGame / 2) {
    labelsNextRound = false;
  }
  G.showLabels = labelsNextRound;
  Score.gameChange = gameChange;
  Score.levelChange = levelChange;
  return nextLevel;
}
function select_add_items(items, callback = null, instruction = null, min = 0, max = 100, prevent_autoselect = false) {
  let A = Z.A;
  select_clear_previous_level();
  A.level++; A.items = items; A.callback = callback; A.selected = []; A.minselected = min; A.maxselected = max;
  console.log('A.level', A.level)
  show_stage();
  let dInstruction = mBy('dSelections0');
  mClass(dInstruction, 'instruction');
  mCenterCenterFlex(dInstruction);
  dInstruction.innerHTML = (Z.role == 'active' ? `${get_waiting_html()}<span style="color:red;font-weight:bold;max-height:25px">You</span>` : `${Z.uplayer}`) + "&nbsp;" + instruction;
  if (too_many_string_items(A)) { mLinebreak(dInstruction, 4); }
  let has_submit_items = false;
  let buttonstyle = { maleft: 10, vmargin: 2, rounding: 6, padding: '4px 12px 5px 12px', border: '0px solid transparent', outline: 'none' }
  for (const item of A.items) {
    let type = item.itemtype = is_card(item) ? 'card' : isdef(item.o) ? 'container' : 'string';
    if (isdef(item.submit_on_click)) { has_submit_items = true; }
    let id = item.id = lookup(item, ['o', 'id']) ? item.o.id : getUID(); A.di[id] = item;
    if (type == 'string') {
      let handler = ev => select_last(item, isdef(item.submit_on_click) ? callback : select_toggle, ev);
      item.div = mButton(item.a, handler, dInstruction, buttonstyle, null, id);
    } else {
      let ui = item.div = iDiv(item.o);
      ui.onclick = ev => select_last(item, select_toggle, ev);
      ui.id = id;
    }
  }
  let show_submit_button = !has_submit_items && (A.minselected != A.maxselected || !A.autosubmit);
  if (show_submit_button) { mButton('submit', callback, dInstruction, buttonstyle, 'selectable_button', 'bSubmit'); }
  let show_restart_button = A.level > 1;
  if (show_restart_button) { mButton('restart', onclick_reload, dInstruction, buttonstyle, 'selectable_button', 'bReload'); }
  let dParent = window[`dActions${A.level}`];
  for (const item of A.items) { ari_make_selectable(item, dParent, dInstruction); }
  assertion(A.items.length >= min, 'less options than min selection!!!!', A.items.length, 'min is', min);
  if (A.items.length == min && !is_ai_player() && !prevent_autoselect) {
    for (const item of A.items) { A.selected.push(item.index); ari_make_selected(item); }
    if (A.autosubmit) {
      loader_on();
      setTimeout(() => { if (callback) callback(); loader_off(); }, 800);
    }
  } else if (is_ai_player()) {
    ai_move();
  } else if (TESTING && isdef(DA.test)) {
    if (DA.test.iter >= DA.auto_moves.length) {
      if (isdef(DA.test.end)) DA.test.end();
      activate_ui();
      return;
    }
    let selection = DA.auto_moves[DA.test.iter++];
    if (selection) {
      deactivate_ui();
      let numbers = [];
      for (const el of selection) {
        if (el == 'last') {
          numbers.push(A.items.length - 1);
        } else if (el == 'random') {
          numbers.push(rNumber(0, A.items.length - 1));
        } else if (isString(el)) {
          let commands = A.items.map(x => x.key);
          let idx = commands.indexOf(el);
          numbers.push(idx);
        } else numbers.push(el);
      }
      selection = numbers;
      A.selected = selection;
      if (selection.length == 1) A.command = A.items[A.selected[0]].key;
      A.last_selected = A.items[A.selected[0]];
      select_highlight();
      setTimeout(() => {
        if (A.callback) A.callback();
      }, 1000);
    } else { activate_ui(); }
  } else { activate_ui(); }
}
function select_clear_previous_level() {
  let A = Z.A;
  if (!isEmpty(A.items)) {
    console.assert(A.level >= 1, 'have items but level is ' + A.level);
    A.ll.push({ items: A.items, selected: A.selected });
    let dsel = mBy(`dSelections1`);
    mStyle(dsel, { display: 'flex', 'align-items': 'center', padding: 10, box: true, gap: 10 });
    for (const item of A.items) {
      ari_make_unselectable(item);
      if (A.keep_selection) continue;
      ari_make_unselected(item);
      if (!A.selected.includes(item.index)) continue;
      if (item.itemtype == 'card') {
        let d = iDiv(item);
        let card = item.o;
        let mini = mDiv(dsel, { bg: 'yellow', fg: 'black', hpadding: 2, border: '1px solid black' }, null, card.friendly);
      } else if (item.itemtype == 'container') {
        let list = item.o.list;
        let cards = list.map(x => ari_get_card(x, 30, 30 * .7));
        let cont2 = ui_make_hand_container(cards, dsel, { bg: 'transparent' });
        ui_add_cards_to_hand_container(cont2, cards, list);
      } else if (item.itemtype == 'string') {
        let db = mDiv(dsel, { bg: 'yellow', fg: 'black', border: 'black', hpadding: 4 }, item.id, item.a);
      }
    }
  }
}
function select_error(msg, callback = null, stay = false) {
  let [A] = [Z.A];
  DA.callback = callback;
  if (A.maxselected == 1 && A.selected.length > 0) {
    let item = A.items[A.selected[0]];
    ari_make_unselected(item);
    A.selected = [];
  } else if (A.selected.length == 2) {
    let item = A.items[A.selected[1]];
    ari_make_unselected(item);
    A.selected = [A.selected[0]];
  }
  dError.innerHTML = msg;
  if (stay) {
    dError.innerHTML += '<br><button onclick="continue_after_error()">CLICK TO CONTINUE</button>';
  } else {
    TO.error = setTimeout(continue_after_error, 3000);
  }
}
function select_highlight() { let A = Z.A; for (const i of A.selected) { let a = A.items[i]; ari_make_selected(a, true); } }
function select_last(item, callback, ev) {
  if (isdef(ev)) evNoBubble(ev);
  Z.A.last_selected = item; callback(item, ev);
}
function select_timer(ms, callback) {
  let d = mBy('dSelections0');
  let dtimer = mDiv(d, { w: 80, maleft: 10, fg: 'red', weight: 'bold' }, 'dTimer');
  if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; }
  let timer = DA.timer = new SimpleTimer(dtimer, 1000, null, ms, callback);
  timer.start();
  return dtimer;
}
function select_toggle() {
  if (!uiActivated) { console.log('ui is deactivated!!!'); return; }
  let A = Z.A;
  let item = A.last_selected;
  if (A.selected.includes(item.index)) {
    removeInPlace(A.selected, item.index);
    ari_make_unselected(item);
  } else {
    if (A.maxselected == 1 && !isEmpty(A.selected)) { ari_make_unselected(A.items[A.selected[0]]); A.selected = []; }
    A.selected.push(item.index);
    ari_make_selected(item);
    if (!DA.ai_is_moving && A.selected.length >= A.maxselected && A.autosubmit) {
      setTimeout(() => A.callback(), 100);
    }
  }
}
function selectItems(all_items, categories, num) {
  console.log('selectItems',categories,num);
  var cards = categories.includes("any") ? all_items : all_items.filter(card => card.category && (!categories || categories.includes(card.category)));
  const sel = cards.sort(() => 0.5 - Math.random()).slice(0, num);
  return sel;
}
function send_or_sim(o, cmd) {
  Counter.server += 1;
  phpPost(o, cmd);
}
function sendgameover(plname, friendly, fen, scoring) {
  let o = { winners: plname, friendly: friendly, fen: fen, scoring: scoring };
  phpPost(o, 'gameover');
}
function sendSIMSIM(o, exclusive = false, saveFromZ = false) {
  o = data_from_client(o);
  let result = apiphp(o, saveFromZ);
  if (TESTING && o.cmd == 'startgame') { for (const func of DA.test.mods) func(result.table); }
  let res = JSON.stringify(result);
  if (exclusive) { if_hotseat_autoswitch(result); handle_result(res, o.cmd); } else { console.log('sendSIMSIM testresult', result); }
}
function server_offline(req, type) {
  if (type == 'user_info') console.log('_______to server offline!', 'req', req, 'type', type, 'Session.cur_user', Session.cur_user);
  let response = {};
  switch (type) {
    case 'user_info':
    case 'account':
      if (nundef(req.user)) req.user = Session.cur_user;
      let u = response.message = DB.users[req.user];
      console.log('udata', u);
      response.name = u.name;
      break;
    case 'contacts':
      let usernames = get_user_names().filter(x => x != Session.cur_user);
      response.users = usernames.map(x => DB.users[x]);
      break;
  }
  response.type = type;
  from_server(JSON.stringify(response), type);
}
function server_online(req, type) {
  var xml = new XMLHttpRequest();
  var loader_holder = mBy("loader_holder");
  loader_holder.className = "loader_on";
  xml.onload = function () {
    if (xml.readyState == 4 || xml.status == 200) {
      loader_holder.className = "loader_off";
      from_server(xml.responseText, type);
    }
  }
  var data = { req: req, type: type };
  data = JSON.stringify(data);
  xml.open("POST", "./server/apisi.php", true);
  xml.send(data);
}
function set_background_color(color, elem) { if (nundef(elem)) elem = mBy('md').parentNode; mStyle(elem, { bg: getColorDictColor(color) }); }
function set_card_border(item, thickness = 1, color = 'black', dasharray) {
  let d = iDiv(item);
  let rect = lastDescendantOfType('rect', d);
  assertion(rect, 'NO RECT FOUND IN ELEM', d);
  if (rect) {
    rect.setAttribute('stroke-width', thickness);
    rect.setAttribute('stroke', color);
    if (isdef(dasharray)) rect.setAttribute('stroke-dasharray', dasharray);
  }
}
function set_most_recent_table_as_cur_tid(tables) { if (!isEmpty(tables)) Session.cur_tid = tables[0].id; }
function set_player(name, fen) {
  if (isdef(PL) && PL.name != name) { Z.prev.pl = PL; Z.prev.uplayer = PL.name; }
  PL = Z.pl = firstCond(Serverdata.users, x => x.name == name);
  copyKeys(fen.players[name], PL);
  Z.uplayer = name;
}
function set_player_strategy(val) {
  Z.strategy = Clientdata.strategy = Z.pl.strategy = val;
  mRemove('dOptions')
}
function set_preferred_lang(uname, val) { val = val.toUpperCase(); if ('EDSFC'.indexOf(val) >= 0) return lookupSetOverride(DB.users, [uname, 'lang'], val); }
function set_start_data_from_fen(fen, game) {
  let parts = fen.split(',');
  for (const p of parts) {
    let [name, startlevel, lang] = p.split(':');
    startlevel = Number(startlevel);
    set_startlevel(name, game, startlevel);
    set_preferred_lang(name, lang);
  }
}
function set_startlevel(user, game, val) { return lookupSetOverride(DB.users, [user, 'games', game, 'startlevel'], val); }
function set_tables_by_game(obj, is_set_cur_id = true) {
  let tables = Session.tables = obj.tables;
  let bygame = Session.tables_by_game = {};
  if (isEmpty(tables)) {
    Session.cur_tid = null;
    Session.tables_by_game = {};
  } else {
    if (is_set_cur_id) {
      let t = tables[0];
      Session.cur_tid = t.id;
      Session.cur_game = t.game;
    }
    for (const t of tables) { lookupAddToList(bygame, [t.game], t); }
  }
  return bygame;
}
function set_user(name) {
  if (isdef(Z) && isdef(U) && U.name != name) {
    Z.prev.u = U;
    Z.prev.uname = U.name;
  }
  U = firstCond(Serverdata.users, x => x.name == name);
  if (isdef(Z)) {
    Z.u = U;
    Z.uname = Z.uplayer = name;
  }
}
function setBadgeLevel(i) {
  G.level = i;
  Score.levelChange = true;
  if (isEmpty(badges)) showBadgesX(dLeiste, G.level, onClickBadgeX, G.maxLevel);
  for (let iBadge = 0; iBadge < G.level; iBadge++) {
    let d1 = iDiv(badges[iBadge]);
    d1.style.opacity = .75;
    d1.style.border = 'transparent';
    d1.children[1].innerHTML = '* ' + (iBadge + 1) + ' *';
    d1.children[0].style.color = 'white';
  }
  let d = iDiv(badges[G.level]);
  d.style.border = '1px solid #00000080';
  d.style.opacity = 1;
  d.children[1].innerHTML = 'Level ' + (G.level + 1);
  d.children[0].style.color = 'white';
  for (let iBadge = G.level + 1; iBadge < badges.length; iBadge++) {
    let d1 = iDiv(badges[iBadge]);
    d1.style.border = 'transparent';
    d1.style.opacity = .25;
    d1.children[1].innerHTML = 'Level ' + (iBadge + 1);
    d1.children[0].style.color = 'black';
  }
}
function setDropPosition(ev, elem, targetElem, dropPos) {
  if (dropPos == 'mouse') {
    var elm = $(targetElem);
    x = ev.pageX - elm.offset().left - dragStartOffset.x;
    y = ev.pageY - elm.offset().top - dragStartOffset.y;
    posXY(elem, targetElem, x, y);
  } else if (dropPos == 'none') {
    return;
  } else if (dropPos == 'center') {
    elem.style.position = elem.style.left = elem.style.top = '';
    elem.classList.add('centeredTL');
  } else if (dropPos == 'centerCentered') {
    elem.style.position = elem.style.left = elem.style.top = '';
    elem.classList.add('centerCentered');
  } else {
    dropPos(ev, elem, targetElem);
  }
}
function setKeys({ allowDuplicates, nMin = 25, lang, key, keySets, filterFunc, param, confidence, sortByFunc } = {}) {
  let keys = jsCopy(keySets[key]);
  if (isdef(nMin)) {
    let diff = nMin - keys.length;
    let additionalSet = diff > 0 ? nMin > 100 ? firstCondDictKeys(keySets, k => k != key && keySets[k].length > diff) : 'best100' : null;
    if (additionalSet) KeySets[additionalSet].map(x => addIf(keys, x));
  }
  let primary = [];
  let spare = [];
  for (const k of keys) {
    let info = Syms[k];
    info.best = info[lang];
    if (nundef(info.best)) {
      let ersatzLang = (lang == 'D' ? 'D' : 'E');
      let klang = 'best' + ersatzLang;
      if (nundef(info[klang])) info[klang] = lastOfLanguage(k, ersatzLang);
    }
    let isMatch = true;
    if (isdef(filterFunc)) isMatch = isMatch && filterFunc(param, k, info.best);
    if (isdef(confidence)) isMatch = info[klang + 'Conf'] >= confidence;
    if (isMatch) { primary.push(k); } else { spare.push(k); }
  }
  if (isdef(nMin)) {
    let len = primary.length;
    let nMissing = nMin - len;
    if (nMissing > 0) { let list = choose(spare, nMissing); spare = arrMinus(spare, list); primary = primary.concat(list); }
  }
  if (isdef(sortByFunc)) { sortBy(primary, sortByFunc); }
  if (isdef(nMin)) console.assert(primary.length >= nMin);
  if (nundef(allowDuplicates)) {
    primary = removeDuplicates(primary);
  }
  return primary;
}
function setRect(elem, options) {
  let r = getRect(elem);
  elem.rect = r;
  elem.setAttribute('rect', `${r.w} ${r.h} ${r.t} ${r.l} ${r.b} ${r.r}`);
  if (isDict(options)) {
    if (options.hgrow) mStyle(elem, { hmin: r.h });
    else if (options.hfix) mStyle(elem, { h: r.h });
    else if (options.hshrink) mStyle(elem, { hmax: r.h });
    if (options.wgrow) mStyle(elem, { wmin: r.w });
    else if (options.wfix) mStyle(elem, { w: r.w });
    else if (options.wshrink) mStyle(elem, { wmax: r.w });
  }
  return r;
}
function setTableBackground(bg, fg = 'white', isBase = true) {
  bg = colorHex(bg);
  if (isBase) DA.tableBaseColor = bg;
  mStyleX(dTableBackground, { bg: bg, fg: isdef(fg) ? fg : 'contrast' });
}
function setup() {
  axiom = system.axiom;
  rules = system.rules;
  factor = valf(system.factor, 1);
  angle = radians(valf(system.angle, 60));
  sentence = axiom;
  let button = createButton("generate"); button.mousePressed(generate);
  button = createButton("animate"); button.mousePressed(() => interval_id = setInterval(generate, 500));
  createCanvas(400, 400);
  background(51);
  createP(axiom);
  turtle();
}
function shield_off() {
  mStyle('dAdmin', { bg: 'white' });
}
function shield_on() {
  mShield(dTable.firstChild.childNodes[1]);
  mStyle('dAdmin', { bg: 'silver' });
}
function show(elem, isInline = false) {
  if (isString(elem)) elem = document.getElementById(elem);
  if (isSvg(elem)) {
    elem.setAttribute('style', 'visibility:visible');
  } else {
    elem.style.display = isInline ? 'inline-block' : null;
  }
  return elem;
}
function show_admin_ui() {
  for (const id of ['bSpotitStart', 'bClearAck', 'bRandomMove', 'bSkipPlayer', 'bRestartMove']) hide(id);
  if (Z.game == 'spotit' && Z.uname == Z.host && Z.stage == 'init') show('bSpotitStart');
  else if (Z.game == 'bluff' && Z.uname == Z.host && Z.stage == 1) show('bClearAck');
  else if (Z.uname == Z.host && Z.stage == 'round_end') show('bClearAck');
  else if (Z.game == 'ferro' && Z.uname == 'mimi' && Z.stage != 'card_selection') show('bClearAck');
  if (['ferro', 'bluff', 'aristo', 'a_game'].includes(Z.game) && (Z.role == 'active' || Z.mode == 'hotseat')) {
    show('bRandomMove');
  }
  if (Z.uname == Z.host || Z.uname == 'mimi') show('dHostButtons'); else hide('dHostButtons');
  if (DA.TEST0 == true) show('dTestButtons'); else hide('dTestButtons');
}
function show_fleeting_message(s, dParent, styles, id, ms = 2000) {
  let d = mDiv(dParent, styles, id, s);
  mFadeRemove(d, ms);
}
function show_game_name(gname) { dGameTitle.innerHTML = gname; }
function show_game_options(dParent, game) {
  mRemoveChildrenFromIndex(dParent, 2);
  let poss = Config.games[game].options;
  if (nundef(poss)) return;
  for (const p in poss) {
    let key = p;
    let val = poss[p];
    if (isString(val)) {
      let list = val.split(',');
      let fs = mRadioGroup(dParent, {}, `d_${key}`, key);
      for (const v of list) { mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { cursor: 'pointer' }, null, key, true); }
      measure_fieldset(fs);
    }
  }
}
function show_game_options_menu(gamename) {
  let dMenu = mBy('dMenu'); iClear(dMenu);
  show_standard_title(dMenu, 'Game Options');
  let d = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
  let dOptions = mDiv(d, {}, 'dMenuInput'); mCenterFlex(dOptions);
  let dButtons = mDiv(d, { display: 'flex', justify: 'center', w: '100%' }, 'dMenuButtons');
  DA.playerlist = null;
  show_game_options(dOptions, gamename);
  let astart = maButton('Start', start_game, dButtons);
  let acancel = maButton('Cancel', cancel_game, dButtons);
}
function show_gameover(winners) {
  let pl = Session.cur_players[winners[0]];
  let styles = { bg: pl.color, fg: 'contrast', top: 220, };
  if (winners.length > 1) {
    status_message(`GAME OVER - The winners are ${winners.join(', ')}!!!`, styles);
  } else {
    status_message(`GAME OVER - The winner is ${winners[0]}!!!`, styles);
  }
}
function show_games(ms = 500) {
  let dParent = mBy('dGames');
  mClear(dParent);
  mText(`<h2>start new game</h2>`, dParent, { maleft: 12 });
  let d = mDiv(dParent, { fg: 'white', animation: 'appear 1s ease both' }, 'game_menu');
  mCenterFlex(d);
  let gamelist = 'aristo bluff spotit ferro fritz'; if (DA.TEST0) gamelist += ' a_game';
  for (const g of dict2list(Config.games)) {
    if (gamelist.includes(g.id)) {
      let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
      let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id);
      d1.setAttribute('gamename', g.id);
      d1.onclick = onclick_game_menu_item;
      mCenterFlex(d1);
      mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
      mLinebreak(d1);
      mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);
    }
  }
}
function show_handsorting_buttons_for(plname, styles = {}) {
  if (Z.role == 'spectator' || isdef(mBy('dHandButtons'))) return;
  let fen = Z.fen;
  let pl = fen.players[plname];
  if (pl.hand.length <= 1) return;
  let d = UI.players[plname].hand.container; mStyle(d, { position: 'relative', wmin: 155 });
  addKeys({ position: 'absolute', left: 58, bottom: -8, height: 25 }, styles);
  let dHandButtons = mDiv(d, styles, 'dHandButtons');
  show_player_button('rank', dHandButtons, onclick_by_rank);
  show_player_button('suit', dHandButtons, onclick_by_suit);
}
function show_history(fen, dParent) {
  if (!isEmpty(fen.history)) {
    let html = '';
    for (const o of jsCopy(fen.history).reverse()) {
      html += beautify_history(o.lines, o.title, fen);
    }
    let dHistory = mDiv(dParent, { paleft: 12, bg: colorLight('#EDC690', .5), box: true, matop: 4, rounding: 10, patop: 10, pabottom: 10, w: '100%', hmax: `calc( 100vh - 250px )`, 'overflow-y': 'auto', w: 260 }, null, html);
    UI.dHistoryParent = dParent;
    UI.dHistory = dHistory;
    if (isdef(Clientdata.historyLayout)) {
      show_history_layout(Clientdata.historyLayout);
    }
  }
}
function show_history_layout(layout) {
  assertion(isdef(UI.dHistoryParent) && isdef(UI.dHistory), 'UI.dHistoryParent && UI.dHistory do NOT exist!!!');
  if (layout == 'ph') PHLayout();
  else if (layout == 'hp') HPLayout();
  else if (layout == 'prh') PRHLayout();
  else if (layout == 'hrp') HRPLayout();
  else PHLayout();
}
function show_history_popup() {
  if (isEmpty(Z.fen.history)) return;
  assertion(isdef(UI.dHistoryParent) && isdef(UI.dHistory), 'UI.dHistoryParent && UI.dHistory do NOT exist!!!');
  let l = valf(Clientdata.historyLayout, 'ph');
  let cycle = ['ph', 'hp', 'prh', 'hrp'];
  let i = (cycle.indexOf(l) + 1) % cycle.length;
  show_history_layout(cycle[i]);
}
function show_home_logo() {
  let bg = colorLight();
  let dParent = mBy('dAdminLeft');
  clearElement(dParent);
  let d = miPic('castle', dParent, { cursor: 'pointer', fz: 24, padding: 6, h: 36, box: true, margin: 2 });
  d.onclick = db_load;
  let version = 'v0.0.1';
  let html = `version ${version}`
  mText(html, dParent, { fz: 12 });
}
function show_hourglass(uname, d, sz, stylesPos = {}) {
  let html = get_waiting_html(sz);
  mStyle(d, { position: 'relative' });
  addKeys({ position: 'absolute' }, stylesPos);
  let dw = mDom(d, stylesPos, {id:`dh_${uname}`, html});
}
function show_level(level, maxlevel) {
  let handicap = maxlevel - level;
  dLevel.innerHTML = `level: ${level}`;
  mStyle(dLevel, { fg: level >= 8 ? get_user_color() : 'white' });
}
function show_message(msg = '', stay = false) {
  mStyle(dTable, { transition: 'all 1s ease' });
  let d = mBy('dMessage'); d.innerHTML = msg;
  if (stay) return;
  let ms = 1000, delay = 3000;
  let anim = d.animate([{ transform: `scale(1,1)`, opacity: 1 }, { transform: `scale(1,0)`, opacity: 0 },], { duration: 1000, easing: 'ease', delay: delay });
  dTable.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(-56px)' },], { fill: 'none', duration: ms, easing: 'ease', delay: delay });
  anim.onfinish = () => {
    mClear(d);
  }
}
function show_MMM(msg) { show_fleeting_message(msg, mBy('dMMM')); }
function show_options_popup(options) {
  let opresent = {};
  let di = { mode: 'gamemode', yes: true, no: false };
  let keys = get_keys(options);
  keys.sort();
  for (const k of get_keys(options).sort()) {
    let key = valf(di[k], k);
    let val = valf(di[options[k]], options[k]);
    opresent[key] = val;
  }
  let x = mYaml(mCreate('div'), opresent);
  let dpop = mPopup(x.innerHTML, dTable, { fz: 16, fg: 'white', top: 0, right: 0, border: 'white', padding: 10, bg: 'dimgray' }, 'dOptions');
  mInsert(dpop, mCreateFrom(`<div style="text-align:center;width:100%;font-family:Algerian;font-size:22px;">${Z.game}</div>`));
}
function show_player_button(caption, ui_item, handler) {
  let d = ui_item.container ?? iDiv(ui_item);
  let styles = { rounding: 6, bg: 'silver', fg: 'black', border: 0, maleft: 10 };
  let b = mButton(caption, handler, d, styles, 'enabled');
  return b;
}
function show_polling_signal() {
  if (DA.TEST0 != true) return;
  let d1 = mDiv(mBy('dAdmin'), { position: 'fixed', top: 10, left: 73 });
  let bg = Z.skip_presentation == true ? 'grey' : 'green';
  let d2 = mDiv(d1, { width: 20, height: 20, bg: bg, rounding: 10, display: 'inline-block' });
  mFadeRemove(d1, 1000);
}
function show_rankings(dParent) {
  csv = make_csv_for_rankings();
  let ch = csv[csv.length - 1];
  if (ch == '%' || isNumber(ch)) {
    let d = mDiv(dParent, { align: 'center' }, null, `<h1>All Time Ranking</h1>`);
    let d1 = mDiv(d, { align: 'center', display: 'flex' });
    mCenterCenterFlex(d1);
    present_table_from_csv(csv, d1);
    mLinebreak(dParent);
  }
}
function show_role() {
  let d = mBy('dAdminMiddle');
  clearElement(d);
  let hotseatplayer = Z.uname != Z.uplayer && Z.mode == 'hotseat' && Z.host == Z.uname;
  let styles, text;
  let boldstyle = { fg: 'red', weight: 'bold', fz: 20 };
  let normalstyle = { fg: 'black', weight: null, fz: null };
  let location = '';
  if (hotseatplayer) {
    styles = boldstyle;
    text = `your turn for ${Z.uplayer}`;
  } else if (Z.role == 'spectator') {
    styles = normalstyle;
    text = `(spectating)`;
  } else if (Z.role == 'active') {
    styles = boldstyle;
    text = `It's your turn!!!`;
  } else if (Z.role == 'waiting') {
    text = `waiting for players to complete their moves...`;
  } else {
    assertion(Z.role == 'inactive', 'role is not active or inactive or spectating ' + Z.role);
    styles = normalstyle;
    text = `(${Z.turn[0]}'s turn)`;
  }
  d.innerHTML = location + text;
  mStyle(d, styles);
}
function show_settings(dParent) {
  let [options, fen, uplayer] = [Z.options, Z.fen, Z.uplayer];
  clearElement(dParent);
  mFlex(dParent);
  mStyle(dParent, { 'justify-content': 'end', gap: 12, paright: 10 })
  let playmode = get_playmode(uplayer);
  let game_mode = Z.mode;
  let st = { fz: 20, padding: 0, h: 40, box: true, matop: 2, rounding: '50%', cursor: 'pointer' };
  let dHistoryButton = miPic('scroll', dParent, st);
  dHistoryButton.onclick = show_history_popup;
  if (isdef(Config.games[Z.game].options.strategy)) {
    let dStrategy = miPic('chess pawn', dParent, st);
    dStrategy.onclick = show_strategy_popup;
  }
  let d = miPic('gear', dParent, st);
  options.playmode = playmode;
  d.onmouseenter = () => show_options_popup(options);
  d.onmouseleave = hide_options_popup;
}
function show_special_message(msg, stay = false, ms = 3000, delay = 0, styles = {}, callback = null) {
  let dParent = mBy('dBandMessage');
  if (nundef(dParent)) dParent = mDiv(document.body, {}, 'dBandMessage');
  show(dParent);
  clearElement(dParent);
  addKeys({ position: 'fixed', top: 200, classname: 'slow_gradient_blink', vpadding: 10, align: 'center', position: 'absolute', fg: 'white', fz: 24, w: '100vw' }, styles);
  if (!isEmpty(styles.classname)) { mClass(dParent, styles.classname); }
  delete styles.classname;
  mStyle(dParent, styles);
  dParent.innerHTML = msg;
  if (delay > 0) TO.special = setTimeout(() => { mFadeRemove(dParent, ms, callback); }, delay);
  else mFadeRemove(dParent, ms, callback);
}
function show_stage() {
  if (isdef(Z.fen.progress)) {
    let d = mBy('dTitleLeft');
    let former = mBy('dProgress');
    if (isdef(former)) former.remove();
    let dprogress = mDiv(d, {}, 'dProgress', `<div>${Z.fen.progress}</div>`);
  }
}
function show_standard_title(dParent, title) { mText(title, dParent, { margin: 20, fz: 24 }); }
function show_strategy_popup() {
  let dpop = mPopup('', dTable, { fz: 16, fg: 'white', top: 0, right: 0, border: 'white', padding: 10, bg: 'dimgray' }, 'dOptions');
  mAppend(dpop, mCreateFrom(`<div style="text-align:center;width:100%;font-family:Algerian;font-size:22px;">${Z.game}</div>`));
  mDiv(dpop, { matop: 5, maleft: 10 }, null, `choose strategy:`);
  let vals = Config.games[Z.game].options.strategy.split(',');
  let key = 'strategy';
  let fs = mRadioGroup(dpop, { fg: 'white' }, `d_${key}`);
  for (const v of vals) { mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { cursor: 'pointer' }, set_player_strategy, key, v == Z.strategy); }
  measure_fieldset(fs);
}
function show_tables(ms = 500) {
  clear_screen();
  let dParent = mBy('dTables');
  mClear(dParent);
  show_games();
  let tables = Serverdata.tables;
  if (isEmpty(tables)) { mText('no active game tables', dParent); return []; }
  tables.map(x => x.game_friendly = Config.games[x.game].friendly);
  mText(`<h2>game tables</h2>`, dParent, { maleft: 12 })
  let t = mDataTable(tables, dParent, null, ['friendly', 'game_friendly', 'players'], 'tables', false);
  mTableCommandify(t.rowitems, {
    0: (item, val) => hFunc(val, 'onclick_table', val, item.id),
  });
  let d = iDiv(t);
  for (const ri of t.rowitems) {
    let r = iDiv(ri);
    let h = hFunc('delete', 'delete_table', ri.o.friendly);
    c = mAppend(r, mCreate('td'));
    c.innerHTML = h;
  }
}
function show_title() {
  Z.func.state_info(mBy('dTitleLeft'));
  show_settings(mBy('dTitleRight'));
  mBy('dTablename').innerHTML = Z.friendly;
}
function show_title_left(s, styles, funnyLetters = false) {
  let d = mBy('dTitleLeft');
  d.innerHTML = `${funnyLetters ? mColorLetters(s) : s}`;
  if (isdef(styles)) mStyle(d, styles);
}
function show_user() {
  if (isdef(U) && U.name != 'anonymous') {
    let uname = U.name;
    let sz = 36;
    let html = `
    <div username='${uname}' style='display:flex;align-items:center;gap:6px;height:100%'>
      <img src='../base/assets/images/${uname}.jpg' width='${sz}' height='${sz}' class='img_person' style='border:3px solid ${U.color};margin:0'>
      <span>${uname}</span>
    </div>`;
    show_title_left(html, { fg: U.color });
  }
  else show_home_logo();
}
function show_user_image(uname, dParent, sz = 300) {
  let d = mDiv(dParent, { margin: 'auto', w: sz });
  let html = `
  <div style='text-align:center;margin-top:50px'>
    <img src='../base/assets/images/${uname}.jpg' class="img_person" height=150 />
  </div>
  `;
  d.innerHTML = html;
  return d;
}
function show_user_intro_screen(is_show_ranking = false, is_start_poll = true) {
  show('dIntro'); clearElement('dIntro');
  intro_show_user_image(Session.cur_user);
  status_message(`hi, ${capitalize(Session.cur_user)}, a game is starting soon...`, { top: 330, classname: 'slow_gradient_blink' });
  if (is_show_ranking) {
    let t = Session.cur_table;
    let fen = t.status == 'past' ? t.fen : get_score_fen_from_cur_players();
    intro_create_score_table(fen);
  }
  if (is_start_poll) poll_for_table_started();
}
function show_username() {
  let uname = U.name;
  let dpic = get_user_pic(uname, 30);
  let d = mBy('dAdminRight');
  mClear(d);
  mAppend(d, get_logout_button());
  mAppend(d, dpic);
  if (is_advanced_user()) { show('dAdvanced1'); } else { hide('dAdvanced'); hide('dAdvanced1'); }
  if (!TESTING && !DA.running) phpPost({ app: 'easy' }, 'tables');
}
function show_users(ms = 300) {
  let dParent = mBy('dUsers');
  mClear(dParent);
  for (const u of Serverdata.users) {
    if (['ally', 'bob', 'leo'].includes(u.name)) continue;
    let d = get_user_pic_and_name(u.name, dParent);
    d.onclick = () => onclick_user(u.name);
    mStyle(d, { cursor: 'pointer' });
  }
  mFall(dParent, ms);
}
function show_waiting_for_ack_message() {
  let dInstruction = mBy('dSelections0');
  mClass(dInstruction, 'instruction');
  mCenterCenterFlex(dInstruction);
  mBy('dSelections0').innerHTML = 'waiting for next round to start...';
}
function show_waiting_message(msg) {
  let dInstruction = mBy('dSelections0');
  mClass(dInstruction, 'instruction');
  mCenterCenterFlex(dInstruction);
  mBy('dSelections0').innerHTML = msg;
}
function show_winners() {
  let winners = Z.fen.winners;
  let multiple_winners = winners.length > 1;
  let winners_html = winners.map(x => get_user_pic_html(x, 35)).join(' ');
  let msg = `
    <div style="display:flex;gap:10px;align-items:center">
      <div style="color:red;font-size:22px;font-weight:bold;">GAME OVER! the winner${multiple_winners ? 's are: ' : ' is '}</div>
      <div style="padding-top:5px;">${winners_html}</div>
    </div>
  `;
  show_message(msg, true);
  mShield(dTable);
  hide('bRestartMove');
  return Z.fen.winners;
}
function showBadgesX(dParent, level, clickHandler, maxLevel) {
  clearElement(dParent);
  badges = [];
  for (let i = 1; i <= maxLevel + 1; i++) {
    if (i > level) {
      let b = addBadge(dParent, i, clickHandler, false);
      b.live.div.style.opacity = .25;
      b.achieved = false;
    } else {
      let b = addBadge(dParent, i, clickHandler, true);
      b.achieved = true;
    }
  }
}
function showDeck(keys, dParent, splay, w, h) {
  let d = mDiv(dParent);
  mStyleX(d, { display: 'block', position: 'relative', bg: 'green', padding: 25 });
  let gap = 10;
  let ovPercent = 20;
  let overlap = w * ovPercent / 100;
  let x = y = gap;
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let c = zInno(k, d);
    mAppend(d, c.div);
    mStyleX(c.div, { position: 'absolute', left: x, top: y });
    c.row = 0;
    c.col = i;
    x += overlap;
    Pictures.push(c);
  }
  d.style.width = (x - overlap + w) + 'px';
  console.log(Pictures[0])
  console.log(Pictures[0].div)
  d.style.height = firstNumber(Pictures[0].div.style.height) + 'px';
}
function showFleetingMessage(msg, dParent, styles = {}, ms = 3000, msDelay = 0, fade = true) {
  clearFleetingMessage();
  dFleetingMessage = mDiv(dParent);
  if (msDelay) {
    TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), msDelay);
  } else {
    TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), 10);
  }
}
function showTrick() {
  let dZone = Zones.table.dData;
  let d = mDiv(dZone);
  mStyleX(d, { display: 'flex', position: 'relative' });
  let zIndex = 1;
  for (let i = 0; i < T.trick.length; i++) {
    let c = T.trick[i];
    let direction = i == 0 ? { x: 0, y: -1 } : { x: 0, y: 1 };
    let displ = 10;
    let offset = { x: -35 + direction.x * displ, y: direction.y * displ };
    let d1 = c.div;
    mAppend(d, d1);
    mStyleX(d1, { position: 'absolute', left: offset.x, top: offset.y, z: zIndex });
    zIndex += 1;
  }
}
function shuffle(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function simpleCompare(o1, o2) {
  let s1 = object2string(o1);
  let s2 = object2string(o2);
  return s1 == s2;
}
function simulateClick(elem) {
  var evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
  var canceled = !elem.dispatchEvent(evt);
}
function sort_cards(hand, bySuit = true, suits = 'CDHS', byRank = true, rankstr = '23456789TJQKA') {
  if (bySuit && byRank) {
    let buckets = arrBuckets(hand, x => x[1], suits);
    for (const b of buckets) { sort_cards(b.list, false, null, true, rankstr); }
    hand.length = 0; buckets.map(x => x.list.map(y => hand.push(y)));
  } else if (bySuit) hand.sort((a, b) => suits.indexOf(a[1]) - suits.indexOf(b[1]));
  else if (byRank) hand.sort((a, b) => rankstr.indexOf(a[0]) - rankstr.indexOf(b[0]));
  return hand;
}
function sortBy(arr, key) { arr.sort((a, b) => (a[key] < b[key] ? -1 : 1)); return arr; }
function sortByDescending(arr, key) { arr.sort((a, b) => (a[key] > b[key] ? -1 : 1)); return arr; }
function sortByFunc(arr, func) { arr.sort((a, b) => (func(a) < func(b) ? -1 : 1)); return arr; }
function sortByRank(ckeys, rankstr = '23456789TJQKA') {
  let ranks = toLetters(rankstr);
  ckeys.sort((a, b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]));
  return ckeys;
}
function sortCardItemsByRank(items, rankstr = '23456789TJQKA') {
  let ranks = toLetters(rankstr);
  items.sort((a, b) => ranks.indexOf(a.key[0]) - ranks.indexOf(b.key[0]));
  return items;
}
function sortCardItemsBySuit(items, suitstr = 'CDSH') {
  let ranks = toLetters(suitstr);
  items.sort((a, b) => ranks.indexOf(a.key[1]) - ranks.indexOf(b.key[1]));
  return items;
}
function sortCardItemsToSequence(items, rankstr = '23456789TJQKA', jolly_allowed = 1) {
  let ranks = toLetters(rankstr);
  let n = items.length;
  let jollies = items.filter(x => is_joker(x));
  if (jollies.length > jolly_allowed) { return null; }
  let no_jolly = items.filter(x => !is_joker(x));
  let sorted = sortCardItemsByRank(no_jolly, rankstr);
  let partial_sequences = [], seq = [sorted[0]], first, second;
  for (let i = 0; i < sorted.length - 1; i++) {
    first = sorted[i];
    second = sorted[i + 1];
    diff = second.irank - first.irank;
    if (diff == 1) { seq.push(second); }
    else {
      partial_sequences.push({ seq: seq, len: seq.length, diff_to_next: diff });
      seq = [second];
    }
  }
  diff = sorted[0].irank - (sorted[sorted.length - 1].irank - rankstr.length)
  if (!isEmpty(seq)) {
    partial_sequences.push({ seq: seq, len: seq.length, diff_to_next: diff });
  } else {
    arrLast(partial_sequences).diff_to_next = diff;
  }
  let i_max_diff = partial_sequences.findIndex(x => x.diff_to_next == Math.max(...partial_sequences.map(x => x.diff_to_next)));
  let max_diff = partial_sequences[i_max_diff].diff_to_next;
  let istart = (i_max_diff + 1) % partial_sequences.length;
  let final_sequence = [];
  let jollies_needed = 0;
  let len = partial_sequences.length;
  let ij = 0;
  for (let i = 0; i < len; i++) {
    let index = (i + istart) % len;
    let list = partial_sequences[index].seq;
    final_sequence = final_sequence.concat(list);
    let nj = partial_sequences[index].diff_to_next - 1;
    if (i < len - 1) {
      for (let j = 0; j < nj; j++) { final_sequence.push(jollies[ij++]); }
      jollies_needed += nj;
    }
  }
  for (let i = 0; i < final_sequence.length; i++) { items[i] = final_sequence[i]; }
  return jollies_needed;
}
function spotit() {
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), turn: [players[0]], stage: 'init', phase: '' };
    for (const plname of players) {
      fen.players[plname] = {
        score: 0, name: plname, color: get_user_color(plname),
      };
    }
    fen.items = spotit_item_fen(options);
    if (nundef(options.mode)) options.mode = 'multi';
    return fen;
  }
  function check_gameover() {
    for (const uname of Z.plorder) {
      let cond = get_player_score(uname) >= Z.options.winning_score;
      if (cond) { Z.fen.winners = [uname]; return Z.fen.winners; }
    }
    return false;
  }
  function state_info(dParent) { spotit_state(dParent); }
  function present(dParent) { spotit_present(dParent); }
  function stats(dParent) { spotit_stats(dParent); }
  function activate_ui() { spotit_activate(); }
  return { setup, activate_ui, check_gameover, present, state_info, stats };
}
function spotit_activate() {
  let [stage, uplayer, host, plorder, fen] = [Z.stage, Z.uplayer, Z.host, Z.plorder, Z.fen];
  if (stage == 'move' && uplayer == host && get_player_score(host) >= 1) {
    let bots = plorder.filter(x => fen.players[x].playmode == 'bot');
    if (isEmpty(bots)) return;
    let bot = rChoose(bots);
    TO.main = setTimeout(() => spotit_move(bot, true), rNumber(2000, 9000));
  }
}
function spotit_card(info, dParent, cardStyles, onClickSym) {
  Card.sz = 300;
  copyKeys({ w: Card.sz, h: Card.sz }, cardStyles);
  let card = cRound(dParent, cardStyles, info.id);
  addKeys(info, card);
  card.faceUp = true;
  let zipped = [];
  for (let i = 0; i < card.keys.length; i++) {
    zipped.push({ key: card.keys[i], scale: card.scales[i] });
  }
  card.pattern = fillColarr(card.colarr, zipped);
  let symStyles = { sz: Card.sz / (card.rows + 1), fg: 'random', hmargin: 10, vmargin: 6, cursor: 'pointer' };
  let syms = [];
  mRowsX(iDiv(card), card.pattern, symStyles, { 'justify-content': 'center' }, { 'justify-content': 'center' }, syms);
  for (let i = 0; i < info.keys.length; i++) {
    let key = card.keys[i];
    let sym = syms[i];
    card.live[key] = sym;
    sym.setAttribute('key', key);
    sym.onclick = ev => onClickSym(ev, key);
  }
  return card;
}
function spotit_create_sample(numCards, numSyms, vocab, lang, min_scale, max_scale) {
  lang = valf(lang, 'E');
  let [rows, cols, colarr] = calc_syms(numSyms);
  let perCard = arrSum(colarr);
  let nShared = (numCards * (numCards - 1)) / 2;
  let nUnique = perCard - numCards + 1;
  let numKeysNeeded = nShared + numCards * nUnique;
  let nMin = numKeysNeeded + 3;
  let keypool = setKeys({ nMin: nMin, lang: valf(lang, 'E'), key: valf(vocab, 'animals'), keySets: KeySets, filterFunc: (_, x) => !x.includes(' ') });
  let keys = choose(keypool, numKeysNeeded);
  let dupls = keys.slice(0, nShared);
  let uniqs = keys.slice(nShared);
  let infos = [];
  for (let i = 0; i < numCards; i++) {
    let keylist = uniqs.slice(i * nUnique, (i + 1) * nUnique);
    let info = { id: getUID(), shares: {}, keys: keylist, rows: rows, cols: cols, colarr: colarr, num_syms: perCard };
    infos.push(info);
  }
  let iShared = 0;
  for (let i = 0; i < numCards; i++) {
    for (let j = i + 1; j < numCards; j++) {
      let c1 = infos[i];
      let c2 = infos[j];
      let dupl = dupls[iShared++];
      c1.keys.push(dupl);
      c1.shares[c2.id] = dupl;
      c2.shares[c1.id] = dupl;
      c2.keys.push(dupl);
    }
  }
  for (const info of infos) { shuffle(info.keys); }
  for (const info of infos) {
    info.scales = info.keys.map(x => chooseRandom([.5, .75, 1, 1.2]));
  }
  for (const info of infos) {
    let zipped = [];
    for (let i = 0; i < info.keys.length; i++) {
      zipped.push({ key: info.keys[i], scale: info.scales[i] });
    }
    info.pattern = fillColarr(info.colarr, zipped);
  }
  return infos;
}
function spotit_deal(numCards, rows, cols, vocab, lang, min_scale, max_scale, fen) {
  lang = valf(lang, 'E');
  let colarr = _calc_hex_col_array(rows, cols);
  if (rows == 3 && cols == 1) { colarr = [1, 3, 1]; }
  else if (rows == 2 && cols == 1) { colarr = [1, 2]; }
  else if (rows == 4 && cols == 1) { rows = 3; colarr = [2, 3, 1]; }
  else if (rows == 5 && cols == 1) { rows = 4; cols = 1; colarr = [1, 3, 3, 1]; }
  else if (rows == 5 && cols == 3) { rows = 5; cols = 1; colarr = [1, 3, 4, 3, 1]; }
  else if (rows == 6 && cols == 2) { rows = 5.5; colarr = [2, 4, 5, 4, 2]; }
  let perCard = arrSum(colarr);
  let nShared = (numCards * (numCards - 1)) / 2;
  let nUnique = perCard - numCards + 1;
  let numKeysNeeded = nShared + numCards * nUnique;
  let nMin = numKeysNeeded + 3;
  let keypool = setKeys({ nMin: nMin, lang: valf(lang, 'E'), key: valf(vocab, 'animals'), keySets: KeySets, filterFunc: (_, x) => !x.includes(' ') });
  let keys = choose(keypool, numKeysNeeded);
  let dupls = keys.slice(0, nShared);
  let uniqs = keys.slice(nShared);
  let infos = [];
  for (let i = 0; i < numCards; i++) {
    let keylist = uniqs.slice(i * nUnique, (i + 1) * nUnique);
    let info = { id: getUID(), shares: {}, keys: keylist, rows: rows, cols: cols, colarr: colarr, num_syms: perCard };
    infos.push(info);
  }
  let iShared = 0;
  for (let i = 0; i < numCards; i++) {
    for (let j = i + 1; j < numCards; j++) {
      let c1 = infos[i];
      let c2 = infos[j];
      let dupl = dupls[iShared++];
      c1.keys.push(dupl);
      c1.shares[c2.id] = dupl;
      c2.shares[c1.id] = dupl;
      c2.keys.push(dupl);
    }
  }
  for (const info of infos) { shuffle(info.keys); }
  for (const info of infos) {
    info.scales = info.keys.map(x => randomNumber(min_scale * 100, max_scale * 100) / 100);
  }
  if (isdef(fen)) {
    let ks_for_cards = fen.split(',');
    for (let i = 0; i < infos.length; i++) {
      let info = infos[i];
      let ks_list = ks_for_cards[i].split(' ');
      info.keys = ks_list.map(x => stringBefore(x, ':'));
      info.scales = ks_list.map(x => stringAfter(x, ':')).map(x => Number(x));
    }
  }
  let items = [];
  for (const info of infos) {
    let item = spotit_card(info, dTable, { margin: 20 }, spotit_interact);
    items.push(item);
  }
  return items;
}
function spotit_find_shared(card, keyClicked) {
  let success = false, othercard = null;
  for (const c of Z.cards) {
    if (c == card) continue;
    if (c.keys.includes(keyClicked)) { success = true; othercard = c; }
  }
  return [success, othercard];
}
function spotit_interact(ev, key) {
  ev.cancelBubble = true;
  if (!uiActivated) { console.log('ui NOT activated'); return; }
  let keyClicked = evToProp(ev, 'key');
  let id = evToId(ev);
  if (isdef(keyClicked) && isdef(Items[id])) {
    let item = Items[id];
    let dsym = ev.target;
    let card = Items[id];
    let [success, othercard] = spotit_find_shared(card, keyClicked);
    spotit_move(Z.uplayer, success);
  }
}
function spotit_item_fen(options) {
  let o = {
    num_cards: valf(options.num_cards, 2),
    num_symbols: options.adaptive == 'yes' ? 14 : valf(options.num_symbols, 7),
    vocab: valf(options.vocab, 'lifePlus'),
    lang: 'E',
    min_scale: valf(options.min_scale, 0.75),
    max_scale: valf(options.max_scale, 1.25),
  };
  let items = spotit_create_sample(o.num_cards, o.num_symbols, o.vocab, o.lang, o.min_scale, o.max_scale);
  let item_fens = [];
  for (const item of items) {
    let arr = arrFlatten(item.pattern);
    let ifen = arr.map(x => `${x.key}:${x.scale}`).join(' ');
    item_fens.push(ifen);
  }
  let res = item_fens.join(',');
  return res;
}
function spotit_move(uplayer, success) {
  if (success) {
    inc_player_score(uplayer);
    assertion(get_player_score(uplayer) >= 1, 'player score should be >= 1');
    Z.fen.items = spotit_item_fen(Z.options);
    Z.state = { score: get_player_score(uplayer) };
    take_turn_spotit();
  } else {
    let d = mShield(dTable, { bg: '#000000aa', fg: 'red', fz: 60, align: 'center' });
    d.innerHTML = 'NOPE!!! try again!';
    TO.spotit_penalty = setTimeout(() => d.remove(), 2000);
  }
}
function spotit_present(dParent) {
  let [fen, ui, stage, uplayer] = [Z.fen, UI, Z.stage, Z.uplayer];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent, 1, 0);
  spotit_read_all_scores();
  let dt = dOpenTable; clearElement(dt); mCenterFlex(dt);
  spotit_stats(dt);
  mLinebreak(dt, 10);
  let ks_for_cards = fen.items.split(',');
  let numCards = ks_for_cards.length;
  let items = Z.items = [];
  Items = [];
  let i = 0;
  for (const s of ks_for_cards) {
    let ks_list = s.split(' ');
    let item = {};
    item.keys = ks_list.map(x => stringBefore(x, ':'));
    item.scales = ks_list.map(x => stringAfter(x, ':')).map(x => Number(x));
    item.index = i; i++;
    let n = item.numSyms = item.keys.length;
    let [rows, cols, colarr] = calc_syms(item.numSyms);
    item.colarr = colarr;
    item.rows = rows;
    items.push(item);
  }
  Z.cards = [];
  let is_adaptive = Z.options.adaptive == 'yes';
  let nsyms = is_adaptive ? cal_num_syms_adaptive() : Z.options.num_symbols;
  for (const item of items) {
    if (is_adaptive) { modify_item_for_adaptive(item, items, nsyms); }
    let card = spotit_card(item, dt, { margin: 20, padding: 10 }, spotit_interact);
    Z.cards.push(card);
    if (Z.stage == 'init') {
      face_down(card, GREEN, 'food');
    }
  }
  mLinebreak(dt, 10);
}
function spotit_read_all_scores() {
  if (nundef(Z.playerdata)) {
    Z.playerdata = [];
    for (const pl in Z.fen.players) {
      Z.playerdata.push({
        name: pl,
        state: { score: 0 },
      });
    }
  }
  for (const pldata of Z.playerdata) {
    let plname = pldata.name;
    let state = pldata.state;
    let score = !isEmpty(state) ? state.score : 0;
    let fenscore = lookupSet(Z.fen, ['players', plname, 'score'], score);
    Z.fen.players[plname].score = Math.max(fenscore, score);
  }
}
function spotit_state(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  let msg = Z.stage == 'init' ? `getting ready...` : `player: ${user_html}`;
  dParent.innerHTML = `Round ${Z.round}:&nbsp;${msg} `;
}
function spotit_stats(d) {
  let players = Z.fen.players;
  let d1 = mDiv(d, { display: 'flex', 'justify-content': 'center', 'align-items': 'space-evenly' });
  for (const plname of get_present_order()) {
    let pl = players[plname];
    let onturn = Z.turn.includes(plname);
    let sz = 50;
    let bcolor = plname == Z.uplayer ? 'lime' : 'silver';
    let border = pl.playmode == 'bot' ? `double 5px ${bcolor}` : `solid 5px ${bcolor}`;
    let rounding = pl.playmode == 'bot' ? '0px' : '50%';
    let d2 = mDiv(d1, { margin: 4, align: 'center' }, null, `<img src='../base/assets/images/${plname}.jpg' style="border-radius:${rounding};display:block;border:${border};box-sizing:border-box" class='img_person' width=${sz} height=${sz}>${get_player_score(plname)}`);
  }
}
function spread_hand(path, ov) {
  let hand = lookup(UI, path.split('.'));
  assertion(hand, 'hand does NOT exist', path);
  if (hand.ctype != 'hand') return;
  if (isEmpty(hand.items)) return;
  let card = hand.items[0];
  if (nundef(ov)) ov = card.ov;
  if (hand.ov == ov) return;
  hand.ov = ov;
  let cont = hand.cardcontainer;
  let items = hand.items;
  mContainerSplay(cont, hand.splay, card.w, card.h, items.length, ov * card.w);
}
function start_game() {
  let gamename = DA.gamename;
  let options = collect_game_specific_options(gamename);
  let players = DA.playerlist ? DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode, strategy: valf(x.strategy, options.strategy, 'random') })) : create_random_players(options.nplayers);
  _start_game(gamename, players, options); hide('dMenu');
}
function start_new_round_ferro() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let pl = fen.players[uplayer];
  Z.stage = 'card_selection';
  fen.plorder = arrCycle(plorder, 1);
  let starter = fen.plorder[0];
  Z.turn = fen.turn = [starter];
  let deck = fen.deck = create_fen_deck('n', fen.num_decks, fen.num_decks * 4);
  let deck_discard = fen.deck_discard = [];
  shuffle(deck);
  let handsize = valf(Number(Z.options.handsize), 11);
  for (const plname of fen.plorder) {
    let pl = fen.players[plname];
    pl.hand = deck_deal(deck, plname == starter ? handsize + 1 : handsize);
    pl.journeys = [];
    pl.roundgoal = false;
    pl.roundchange = true;
    delete pl.handsorting;
  }
  Z.round += 1;
  if (Z.round > Z.options.maxrounds) {
    ari_history_list([`game over`], 'game');
    Z.stage = 'game_over';
    fen.winners = find_players_with_min_score();
  }
}
function start_polling(data, type, onsuccess, ms = 5000, func) {
  delete DA.poll; allow_polling();
  DA.poll = {
    data: data,
    type: type,
    onsuccess: onsuccess,
    ms: ms,
    func: func
  };
  poll();
}
function start_transaction() {
  if (DA.simulate) return;
  DA.simulate = true;
  DA.snapshot = { fen: jsCopy(Z.fen), stage: Z.stage, round: Z.round, phase: Z.phase, turn: Z.turn };
  DA.transactionlist = [];
}
function start_with_assets() {
  DA.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1; if (DA.isFirefox) console.log('using Firefox!')
  show_home_logo();
  if (nundef(U)) { show_users(); return; }
  show_username();
  if (DA.TEST0) show('dTestButtons');
}
function startgame(game, players, options = {}) {
  if (nundef(game)) game = 'a_game';
  let default_options = {}; for (const k in Config.games[game].options) default_options[k] = arrLast(Config.games[game].options[k].split(','));
  addKeys(default_options, options);
  if (nundef(players)) players = rChoose(Serverdata.users, 2).map(x => ({ name: x.name }));
  let playernames = players.map(x => x.name);
  let fen = window[game]().setup(playernames, options);
  if (nundef(fen.round)) fen.round = 1;
  if (nundef(fen.phase)) fen.phase = '';
  if (nundef(fen.stage)) fen.stage = 0;
  if (nundef(fen.step)) fen.step = 0;
  if (nundef(fen.turn)) fen.turn = [fen.plorder[0]]; else if (DA.TESTSTART1 && fen.turn.length == 1) fen.turn = [playernames[0]];
  players.map(x => { let pl = fen.players[x.name]; pl.playmode = valf(x.playmode, 'human'); pl.strategy = valf(x.strategy, valf(options.strategy, 'random')); });
  if (options.mode == 'solo') {
    let me = isdef(U) && isdef(fen.players[U.name]) ? U.name : rChoose(playernames);
    for (const plname of playernames) {
      if (plname == me) continue;
      fen.players[plname].playmode = 'bot';
    }
    options.mode = 'hotseat';
  }
  for (const k in options) { if (isNumber(options[k])) options[k] = parseInt(options[k]); }
  let o = {
    friendly: generate_table_name(players.length), game: game, host: playernames[0], players: playernames,
    fen: fen, options: options
  };
  ensure_polling();
  phpPost(o, 'startgame');
}
function startTime(elem) {
  if (nundef(Settings.showTime) || !Settings.showTime) return;
  if (nundef(TimestampStarted)) { TimestampStarted = msNow(); TimeElapsed = 0; }
  if (nundef(elem) && isdef(TimeElem)) { elem = TimeElem; }
  else { if (isString(elem)) elem = mBy(elem); TimeElem = elem; }
  var timeLeft = TimeLeft = Settings.minutesPerUnit * 60000 - getTimeElapsed();
  if (timeLeft > 0) {
    let t = msToTime(timeLeft);
    let s = format2Digits(t.h) + ":" + format2Digits(t.m) + ":" + format2Digits(t.s);
    elem.innerHTML = s;
    setTimeout(() => startTime(elem), 500);
  } else {
    elem.innerHTML = '00:00:00';
    if (OnTimeOver) OnTimeOver();
  }
}
function staticArea(areaName, oSpec) {
  func = correctFuncName(oSpec.type);
  oSpec.ui = window[func](areaName, oSpec);
}
function staticTitle() {
  clearInterval(TO.titleInterval);
  let url = window.location.href;
  let loc = url.includes('telecave') ? 'telecave' : 'local';
  let game = isdef(Z) ? stringAfter(Z.friendly, 'of ') : '♠ GAMES ♠';
  document.title = `(${loc}) ${game}`;
}
function status_message(msg, styles = {}) {
  let d = mBy('dMessage'); show(d); clearElement(d);
  let def_styles = { padding: 20, align: 'center', position: 'absolute', fg: 'contrast', fz: 24, w: '100vw' };
  copyKeys(styles, def_styles);
  let dContent = mDiv(d, def_styles, null, msg);
  return dContent;
}
function status_message_new(msg, dParent, styles = {}) { }
function status_message_off() {
  let d = mBy('dMessage');
  clearElement(d);
  hide(d);
  onclick = null;
}
function stop_game() { console.log('stopgame'); }
function stop_simple_timer() { if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; } }
function stop_timer() {
  if (isdef(DA.timer)) {
    let res = DA.timer.clear();
    DA.timer = null;
    return isNumber(res) ? res : 0;
  }
  return 0;
}
function stopPolling() { pollStop(); }
function stringAfter(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return '';
  return sFull.substring(idx + sSub.length);
}
function stringAfterLast(sFull, sSub) {
  let parts = sFull.split(sSub);
  return arrLast(parts);
}
function stringBefore(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return sFull;
  return sFull.substring(0, idx);
}
function stringBeforeLast(sFull, sSub) {
  let parts = sFull.split(sSub);
  return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}
function switch_uname(plname) {
  set_user(plname);
  show_username();
}
function sync_users(php_users) {
  let result = [];
  let changed = false;
  for (const udata of php_users) {
    if (nundef(udata.id)) return php_users;
    let name = udata.username;
    let u = DB.users[name];
    if (nundef(u)) {
      changed = true;
      let db_user = { name: name, color: randomColor(), motto: random_motto(), image: startsWith(udata.image, name), games: {}, tables: {}, };
      add_new_user(db_user, false);
      result.push(db_user);
    } else result.push(u)
  }
  if (changed) db_save();
  if (!is_online()) return result;
  let di = {}; php_users.map(x => di[x.username] = x);
  let not_in_sql_db = [];
  for (const name in DB.users) {
    let u = DB.users[name];
    if (nundef(di[name]) && name != Session.cur_user) { not_in_sql_db.push(name); addIf(result, u); }
  }
  if (!isEmpty(not_in_sql_db)) add_users_to_sql_db(not_in_sql_db);
  return result;
}
function tableLayoutMR(dParent, m = 7, r = 1) {
  let ui = UI; ui.players = {};
  clearElement(dParent);
  let bg = 'transparent';
  let [dMiddle, dRechts] = [ui.dMiddle, ui.dRechts] = mColFlex(dParent, [m, r], [bg, bg]);
  mCenterFlex(dMiddle, false);
  let dOben = ui.dOben = mDiv(dMiddle, { w: '100%', display: 'block' }, 'dOben');
  let dSelections = ui.dSelections = mDiv(dOben, {}, 'dSelections');
  for (let i = 0; i <= 5; i++) { ui[`dSelections${i}`] = mDiv(dSelections, {}, `dSelections${i}`); }
  let dActions = ui.dActions = mDiv(dOben, { w: '100%' });
  for (let i = 0; i <= 5; i++) { ui[`dActions${i}`] = mDiv(dActions, { w: '100%' }, `dActions${i}`); }
  ui.dError = mDiv(dOben, { w: '100%', bg: 'red', fg: 'yellow', hpadding: 12, box: true }, 'dError');
  let dSubmitOrRestart = ui.dSubmitOrRestart = mDiv(dOben, { w: '100%' });
  let dOpenTable = ui.dOpenTable = mDiv(dMiddle, { w: '100%', padding: 10 }); mFlexWrap(dOpenTable);
  return [dOben, dOpenTable, dMiddle, dRechts];
}
function take_turn(write_fen = true, write_player = false, clear_players = false, player_status = null) {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly };
  if (isdef(Z.fen)) o.fen = Z.fen;
  if (write_fen) { assertion(isdef(Z.fen) && isdef(Z.fen.turn), 'write_fen without fen!!!!'); o.write_fen = true; }
  if (write_player) { o.write_player = true; o.state = Z.state; }
  if (clear_players) o.clear_players = true;
  o.player_status = player_status;
  let cmd = 'table';
  send_or_sim(o, cmd);
}
function take_turn_clear() {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, players: Z.playerlist };
  let cmd = 'clear';
  send_or_sim(o, cmd);
}
function take_turn_collect_open() {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, state: Z.state, write_player: true };
  let cmd = 'table';
  send_or_sim(o, cmd);
}
function take_turn_fen() { take_turn(); }
function take_turn_fen_clear() { take_turn(true, false, true); }
function take_turn_fen_write() { take_turn(true, true); }
function take_turn_multi() { if (isdef(Z.state)) take_turn(false, true); else take_turn(false, false); }
function take_turn_resolve(notes) {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: notes };
  let cmd = 'table';
  send_or_sim(o, cmd);
}
function take_turn_spotit() { take_turn(true, true); }
async function test0() {
  candidates = selectItems(M.allItems, ['entertainment'], CANDIDATES_PER_PAGE); console.log('candidates', candidates)
  let json = M.json = getModel();
  json.elements = [
    {
      "type": "imagepicker",
      "name": "bilder",
      "title": "Which of these items would fit your criteria?",
      "description": "Please select all that apply, at least 2-4.",
      "isRequired": true,
      "choices": generateChoices(),
      "showLabel": true,
      "multiSelect": true
    }
  ];
  let survey = M.survey = new Survey.Model(json);
  survey.applyTheme(SurveyTheme.FlatLight);
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });
  survey.onAfterRenderQuestion.add(function (survey, options) {
    if (options.question.getType() === "imagepicker") {
      console.log('HALLO!!!')
      let imgs = marrTag('img');
      for (const img of imgs) {
        let parent = img.parentNode;
        let [w, h] = [img.naturalWidth, img.naturalHeight];
        let wgoal = 240;
        let factor = wgoal / w;
        let hgoal = h * factor;
        mStyle(img, { h: hgoal, w: wgoal })
        mStyle(parent, { bg: rColor(), padding: 20 });
        let p1 = parent.parentNode;
        mStyle(p1, { wmax: wgoal + 40 });
        let ch = arrChildren(p1);
        console.log(ch)
      }
      let spans = marrTag('span');
      spans = spans.filter(x => hasParentWithDescendant(x, 'img'))
      spans.forEach(span => {
        if (isEmptyOrWhiteSpace(span.textContent)) return;
        console.log('textContent', span.textContent)
        mDom(span.parentNode, { 'white-space': 'normal', 'word-wrap': 'break-word', wmax: 260, color: rColor(), display: 'flex', wrap: true, }, { html: span.innerHTML });
        span.remove();
      });
    }
  });
  survey.onValueChanged.add(function (sender, options) {
    console.log('______valueChanged!', sender, options);
    let imgs = marrTag('img');
    for (const img of imgs) {
      let parent = img.parentNode;
      let [w, h] = [img.naturalWidth, img.naturalHeight];
      let wgoal = 240;
      let factor = wgoal / w;
      let hgoal = h * factor;
      mStyle(img, { h: hgoal, w: wgoal })
      mStyle(parent, { bg: rColor(), padding: 20 });
      let p1 = parent.parentNode;
      mStyle(p1, { wmax: wgoal + 40 });
      let ch = arrChildren(p1);
      console.log(ch)
    }
  });
  $("#surveyElement").Survey({ model: survey });
}
function testHelpers() {
  if (activatedTests.includes('helpers')) {
    console.log(...arguments);
  }
}
function timeConversion(duration, format = 'Hmsh') {
  const portions = [];
  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (format.includes('H')) portions.push((hours < 10 ? '0' : '') + hours);
  duration = duration - (hours * msInHour);
  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (format.includes('m')) portions.push((minutes < 10 ? '0' : '') + minutes);
  duration = duration - (minutes * msInMinute);
  const msInSecond = 1000;
  const seconds = Math.trunc(duration / 1000);
  if (format.includes('s')) portions.push((seconds < 10 ? '0' : '') + seconds);
  duration = duration - (seconds * msInSecond);
  const hundreds = duration / 10;
  if (format.includes('h')) portions.push((hundreds < 10 ? '0' : '') + hundreds);
  return portions.join(':');
}
function to_aristocard(ckey, sz = 100, color = RED, w) {
  let info = jsCopy(C52Cards[ckey.substring(0, 2)]);
  info.key = ckey;
  info.cardtype = ckey[2];
  let [r, s] = [info.rank, info.suit];
  info.val = r == 'A' ? 1 : 'TJQK'.includes(r) ? 10 : Number(r);
  info.color = color;
  info.sz = info.h = sz;
  info.w = valf(w, sz * .7);
  info.irank = 'A23456789TJQK'.indexOf(r);
  info.isuit = 'SHCD'.indexOf(s);
  info.isort = info.isuit * 13 + info.irank;
  return info;
}
function to_commissioncard(ckey, sz = 40, color = GREEN, w) { return to_aristocard(ckey, sz, color); }
function to_luxurycard(ckey, sz = 100, color = 'gold', w) { return to_aristocard(ckey, sz, color); }
function to_rumorcard(ckey, sz = 40, color = GREEN, w) { return to_aristocard(ckey, sz, color); }
function to_server(req, type, to_php = true) {
  where(type);
  if (!to_php) {
    server_offline(req, type);
  } else if (is_online()) {
    server_online(req, type);
  } else {
    if (type == 'chat') { alert('no internet!'); mClassReplace(mBy("label_chat"), 'enabled', 'disabled'); }
    server_offline(req, type);
  }
}
function to_words(x) {
  let list = x.split('\n');
  let di = {};
  list.map(x => di[x.toLowerCase()] = x);
  return di;
}
function toElem(d) { return isString(d) ? mBy(d) : d; }
function toggleDebug() {
  DEBUG = !DEBUG;
  localStorage.setItem('DEBUG', DEBUG);  // Store flag in localStorage
  location.reload();  
}
function toLetters(s) { return [...s]; }
function too_many_string_items(A) { return A.items.filter(x => nundef(x.o)).length >= 8; }
function toWords(s, allow_ = false) {
  let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
  return arr.filter(x => !isEmpty(x));
}
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
function turtle() {
  background(51);
  stroke(255);
  translate(width / 2, height);
  for (let i = 0; i < sentence.length; i++) {
    let x = sentence.charAt(i);
    if ('ABF'.includes(x)) { line(0, 0, 0, -len); translate(0, -len); }
    else if (x == '+') rotate(angle);
    else if (x == '-') rotate(-angle);
    else if (x == '[') push();
    else if (x == ']') pop();
  }
}
function ui_add_cards_to_hand_container(cont, items, list) {
  if (nundef(list)) list = items.map(x => x.key);
  for (const item of items) {
    mAppend(cont, iDiv(item));
    mItemSplay(item, list, 2, Card.ovw);
  }
}
function ui_add_container_title(title, cont, items, show_if_empty) {
  if (isdef(title) && (!isEmpty(items) || show_if_empty)) {
    let st = get_containertitle_styles();
    let stmeasure = jsCopy(st); delete stmeasure.position;
    let elem = mText(title, cont, stmeasure);
    let sz = getSizeNeeded(elem);
    let offsetx = valf(st.left, 0);
    let cont_wmin = mGetStyle(cont, 'wmin');
    let my_min = sz.w + offsetx * 1.5;
    let wmin = !isNumber(cont_wmin) ? my_min : Math.max(valf(cont_wmin, 0), my_min);
    mStyle(cont, { wmin: wmin });
    mStyle(elem, st);
  }
}
function ui_game_menu_item(g, g_tables = []) {
  function runderkreis(color, id) {
    return `<div id=${id} style='width:20px;height:20px;border-radius:50%;background-color:${color};color:white;position:absolute;left:0px;top:0px;'>` + '' + "</div>";
  }
  let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
  if (!isEmpty(g_tables)) {
    let t = g_tables[0];
    let have_another_move = t.player_status == 'joined';
    color = have_another_move ? 'green' : 'red';
    id = `rk_${t.id}`;
  }
  return `
  <div onclick="onclick_game_menu_item(event)" gamename=${g.id} style='cursor:pointer;border-radius:10px;margin:10px;padding:5px;padding-top:15px;width:120px;height:90px;display:inline-block;background:${bg};position:relative;'>
  ${nundef(color) ? '' : runderkreis(color, id)}
  <span style='font-size:50px;font-family:${sym.family}'>${sym.text}</span><br>${g.friendly.toString()}</div>
  `;
}
function ui_get_buy_or_pass_items() {
  let items = [], i = 0;
  if (!isEmpty(UI.deck_discard.items)) items.push(ui_get_deck_item(UI.deck_discard));
  items = items.concat(ui_get_string_items(['pass']));
  reindex_items(items);
  return items;
}
function ui_get_deck_item(uideck) {
  let topdeck = uideck.get_topcard();
  let item = { o: topdeck, a: topdeck.key, key: topdeck.key, friendly: topdeck.short, path: uideck.path, index: 0 };
  return item;
}
function ui_get_ferro_items() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  let items = ui_get_hand_items(uplayer);
  for (const plname of plorder) {
    let jlist = UI.players[plname].journeys;
    for (const jitem of jlist) {
      for (const o of jitem.items) {
        if (!is_joker(o)) { continue; }
        let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: jitem.path, index: 0 };
        items.push(item);
      }
    }
  }
  for (const plname of plorder) {
    let jlist = UI.players[plname].journeys;
    for (const jitem of jlist) {
      let o = jitem.items[0];
      let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: jitem.path, index: 0 };
      items.push(item);
    }
  }
  let cmds = ui_get_submit_items(['discard', 'auflegen', 'jolly', 'anlegen']);
  items = items.concat(cmds);
  reindex_items(items);
  return items;
}
function ui_get_hand_items(uplayer) {
  let items = [], i = 0;
  let hand = UI.players[uplayer].hand;
  for (const o of hand.items) {
    o.index = i;
    let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: hand.path, index: i };
    i++;
    items.push(item);
  }
  return items;
}
function ui_get_string_items(commands) {
  let items = [], i = 0;
  for (const cmd of commands) {
    let item = { o: null, a: cmd, key: cmd, friendly: cmd, path: null, index: i };
    i++;
    items.push(item);
  }
  return items;
}
function ui_get_submit_items(commands) {
  let items = [], i = 0;
  for (const cmd of commands) {
    let item = { o: null, a: cmd, key: cmd, friendly: cmd, path: null, index: i, submit_on_click: true, itemtype: 'submit' };
    i++;
    items.push(item);
  }
  return items;
}
function ui_make_container(dParent, styles = { bg: 'random', padding: 10 }) {
  let id = getUID('u');
  let d = mDiv(dParent, styles, id);
  return d;
}
function ui_make_hand_container(items, dParent, styles = { bg: 'random', padding: 10 }) {
  let id = getUID('u');
  let d = mDiv(dParent, styles, id);
  if (!isEmpty(items)) {
    let card = items[0];
    mContainerSplay(d, 2, card.w, card.h, items.length, card.ov * card.w);
  }
  return d;
}
function ui_player_info(dParent, outerStyles = { dir: 'column' }, innerStyles = {}) {
  let fen = Z.fen;
  if (nundef(outerStyles.display)) outerStyles.display = 'flex';
  mStyle(dParent, outerStyles);
  let items = {};
  let styles = jsCopy(innerStyles); addKeys({ rounding: 10, bg: '#00000050', margin: 4, padding: 4, patop: 12, box: true, 'border-style': 'solid', 'border-width': 6 }, styles);
  let order = get_present_order();
  for (const plname of order) {
    let pl = fen.players[plname];
    let uname = pl.name;
    let imgPath = `../base/assets/users/${uname}.jpg`;
    styles['border-color'] = get_user_color(uname);
    let item = mDivItem(dParent, styles, name2id(uname));
    let d = iDiv(item);
    let picstyle = { w: 50, h: 50, box: true };
    let ucolor = get_user_color(uname);
    if (pl.playmode == 'bot') {
      copyKeys({ rounding: 0, border: `double 6px ${ucolor}` }, picstyle);
    } else {
      copyKeys({ rounding: '50%', border: `solid 2px white` }, picstyle);
    }
    let img = mImage(imgPath, d, picstyle, 'img_person');
    items[uname] = item;
  }
  if (DA.SIMSIM || is_advanced_user()) activate_playerstats(items)
  return items;
}
function ui_type_deck(list, dParent, styles = {}, path = 'deck', title = 'deck', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont);
  let items = [];
  ensure_ui(list, cardcont, items, get_card_func);
  ui_add_container_title(title, cont, items, show_if_empty);
  function get_topcard() { return isEmpty(list) ? null : items[0]; }
  function get_bottomcard() { return isEmpty(list) ? null : arrLast(items); }
  function ensure_ui(list, cardcont, items, get_card_func) {
    clearElement(cardcont); arrClear(items); if (isEmpty(list)) return;
    let n = Math.min(2, list.length); let ct = get_card_func(list[0]); items.push(ct); if (n > 1) { let cb = get_card_func(arrLast(list)); items.push(cb); }
    mStyle(cardcont, { position: 'relative', wmin: ct.w + 8, hmin: ct.h });
    for (let i = items.length - 1; i >= 0; i--) { let x = items[i]; face_down(x); mAppend(cardcont, iDiv(x)); mStyle(iDiv(x), { position: 'absolute', top: 0, left: 0 }) }
    mText(list.length, iDiv(ct), { position: 'absolute', left: list.length >= 100 ? '10%' : '25%', top: 10, fz: ct.h / 3 });
  }
  return {
    ctype: 'deck',
    container: cont,
    cardcontainer: cardcont,
    items: items,
    list: list,
    title: title,
    path: path,
    func: get_card_func,
    get_topcard: get_topcard,
    get_bottomcard: get_bottomcard,
    get_card_func: get_card_func,
    renew: ensure_ui,
  };
}
function ui_type_hand(list, dParent, styles = {}, path = 'hand', title = 'hand', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let items = list.map(x => get_card_func(x));
  let cardcont = mDiv(cont);
  let card = isEmpty(items) ? { w: 1, h: Config.ui.card.h, ov: 0 } : items[0];
  let splay = 2;
  mContainerSplay(cardcont, splay, card.w, card.h, items.length, card.ov * card.w);
  ui_add_cards_to_hand_container(cardcont, items, list);
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    ctype: 'hand',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    splay: splay,
    items: items,
  };
}
function ui_type_lead_hand(list, dParent, styles = {}, path = 'hand', title = 'hand', get_card_func = ari_get_card, show_if_empty = false) {
  let hcard = isdef(styles.h) ? styles.h - 30 : Config.ui.card.h;
  addKeys(get_container_styles(styles), styles);
  let cont = ui_make_container(dParent, styles);
  let items = list.map(x => get_card_func(x, hcard));
  let cardcont = mDiv(cont);
  let card = isEmpty(items) ? { w: 1, h: hcard, ov: 0 } : items[0];
  let splay = 5;
  mContainerSplay(cardcont, splay, card.w, card.h, items.length, card.ov * card.w);
  ui_add_cards_to_hand_container(cardcont, items, list);
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    ctype: 'hand',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    splay: splay,
    items: items,
  };
}
function ui_type_market(list, dParent, styles = {}, path = 'market', title = 'market', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont, { display: 'flex', gap: 2 });
  let items = list.map(x => get_card_func(x));
  items.map(x => mAppend(cardcont, iDiv(x)));
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    ctype: 'market',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    items: items,
  };
}
function uid() {
  UID += 1;
  return 'a' + UID;
}
function uiGetContact(row, msgs = {}) {
  let image = get_image_path(row);
  let mydata = `
      <div class='contact' style='position:relative;text-align:center;margin-bottom:18px;' username='${row.name}' onclick='start_chat(event)'>
        <img src='${image}' draggable='true' ondragstart='drag(event)' class='img_person sz100' style='margin:0;'/>
        <br>${row.name}`;
  if (isdef(msgs[row.username])) {
    mydata += `<div style='width:20px;height:20px;border-radius:50%;background-color:orange;color:white;position:absolute;left:0px;top:0px;'>` + msgs[row.username] + "</div>";
  }
  mydata += "</div>";
  return mydata;
}
function uiGetContacts(myusers, msgs) {
  mydata = '';
  for (const r of myusers) {
    row = r;
    mydata += uiGetContact(row, msgs);
  }
  return mydata;
}
function uiGetContactStylesAndStart() {
  let mydata = `
  <style>
    @keyframes appear{
      0%{opacity:0;transform: translateY(50px)}
      100%{opacity:1;transform: translateY(0px)}
     }
     .contact{
       cursor:pointer;
       transition: all .5s cubic-bezier(0.68, -2, 0.265, 1.55);
     }
     .contact:hover{
       transform: scale(1.1);
     }
  </style>
  <div style="text-align: center; animation: appear 1s ease both">
  `;
  return mydata;
}
function unpack_table(table) {
  for (const k of ['players', 'fen', 'options', 'scoring']) {
    let val = table[k];
    if (isdef(table[k])) table[k] = if_stringified(val); if (nundef(table[k])) table[k] = {};
  }
  if (isdef(table.modified)) { table.modified = Number(table.modified); table.timestamp = new Date(table.modified); table.stime = stringBeforeLast(table.timestamp.toString(), 'G').trim(); }
  assertion(isdef(window[table.game]), 'game function for ' + table.game + ' not defined in window');
  if (isdef(table.game)) { table.func = window[table.game](); }
  if (isdef(table.options.mode)) { table.mode = table.options.mode; }
  delete table.action; delete table.expected;
  return table;
}
function untie_card(card) {
  remove_from_selection(card);
  clear_selection();
  let oldgroupid = card.groupid;
  if (isdef(oldgroupid)) delete card.owner;
  let oldgroup = Items[oldgroupid];
  let oldindex = isdef(oldgroup) ? oldgroup.ids.indexOf(card.id) : null;
  if (isdef(oldgroup)) removeInPlace(oldgroup.ids, card.id);
  return [oldgroup, oldindex];
}
function update_cur_table(obj, color) {
  let t = Session.cur_table;
  let tnew = obj.table;
  if (isdef(obj.player_record)) copyKeys(obj.player_record, tnew);
  copyKeys(tnew, t);
  if (isdef(color)) {
    let d = mBy(`rk_${obj.table.id}`);
    if (isdef(d)) mStyle(d, { bg: color });
  }
}
function update_db_user_from_pl_options(fen, game) {
  let parts = fen.split(',');
  for (const p of parts) {
    let [name, startlevel, lang] = p.split(':');
    startlevel = Number(startlevel);
    set_startlevel(name, game, startlevel);
    set_preferred_lang(name, lang);
  }
}
function update_game_status(players) {
  let d = dTitle;
  clearElement(d);
  let d1 = mDiv(d, { display: 'flex', 'justify-content': 'center', 'align-items': 'space-evenly' });
  for (const plname in players) {
    let pl = players[plname];
    let d2 = mDiv(d1, { margin: 4, align: 'center' }, null, `<img src='${pl.imgPath}' style="display:block" class='img_person' width=50 height=50>${pl.score}`);
  }
}
function update_session(obj) {
  for (const k in obj) { if (isdef(Session[k])) copyKeys(obj[k], Session[k]); else Session[k] = obj[k]; }
  if (isdef(obj.table)) {
    Session.cur_table = Session.table;
    Session.cur_funcs = window[Session.cur_game]();
    if (!isEmpty(obj.playerdata)) make_players(Session.table.players);
    console.assert(isdef(Session.cur_user) && Session.cur_game == Session.table.game && Session.cur_tid == Session.table.id, "SESSION MISMATCH IN GAME_OPEN_FOR_MOVE!!!!!!!!!!!!!!!!!!!!!");
  }
  if (isdef(obj.playerdata)) {
    let o = Session.cur_players;
    for (const rec of obj.playerdata) {
      if (rec.state == 'null') rec.state = null;
      copyKeys(rec, o[rec.name]);
    }
  }
}
function update_table() {
  assertion(isdef(U), 'NO USER LOGGED IN WHEN GETTING TABLE FROM SERVER!!!!!!!!!!!!!!!!!!!!', U);
  if (nundef(Z) || nundef(Z.prev)) Z = { prev: {} };
  for (const wichtig of ['playerdata', 'notes', 'uplayer', 'uname', 'friendly', 'step', 'round', 'phase', 'stage', 'timestamp', 'modified', 'stime', 'mode', 'scoring']) {
    if (isdef(Z[wichtig])) Z.prev[wichtig] = jsCopy(Z[wichtig]);
  }
  Z.prev.turn = Clientdata.last_turn = Clientdata.this_turn;
  copyKeys(Serverdata, Z);
  if (isdef(Serverdata.table)) { copyKeys(Serverdata.table, Z); Z.playerlist = Z.players; copyKeys(Serverdata.table.fen, Z); }
  assertion(isdef(Z.fen), 'no fen in Z bei cmd=table or startgame!!!', Serverdata);
  Clientdata.this_turn = Z.turn;
  set_user(U.name);
  assertion(!isEmpty(Z.turn), 'turn empty!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Z.turn);
  let fen = Z.fen;
  Z.role = !is_playing(Z.uname, fen) ? 'spectator' : fen.turn.includes(Z.uname) ? 'active' : 'inactive';
  let [uname, turn, mode, host] = [Z.uname, fen.turn, Z.mode, Z.host];
  let upl = Z.role == 'active' ? uname : turn[0];
  if (mode == 'hotseat' && turn.length > 1) { let next = get_next_human_player(Z.prev.uplayer); if (next) upl = next; }
  if (mode == 'multi' && Z.role == 'inactive' && (uname != host || is_human_player(upl))) { upl = uname; }
  set_player(upl, fen);
  let pl = Z.pl;
  Z.playmode = pl.playmode;
  Z.strategy = uname == pl.name ? valf(Clientdata.strategy, pl.strategy) : pl.strategy;
  let [uplayer, friendly, modified] = [Z.uplayer, Z.friendly, Z.modified];
  Z.uplayer_data = firstCond(Z.playerdata, x => x.name == Z.uplayer);
  let sametable = !FORCE_REDRAW && friendly == Z.prev.friendly && modified <= Z.prev.modified && uplayer == Z.prev.uplayer;
  let sameplayerdata = isEmpty(Z.playerdata_changed_for);
  let myplayerdatachanged = Z.playerdata_changed_for.includes(Z.uplayer);
  let specialcase = !i_am_host() && !i_am_acting_host() && !i_am_trigger() && !myplayerdatachanged;
  Z.skip_presentation = sametable && (sameplayerdata || specialcase);
  if (DA.TEST0 && (!sametable || !sameplayerdata)) {
    console.log('======>Z.skip_presentation', Z.skip_presentation, '\nplayerdata_changed_for', Z.playerdata_changed_for);
    console.log('_______ *** THE END *** ___________')
  }
  FORCE_REDRAW = false;
}
function userUpdate(proplist, val) {
  lookupSetOverride(U, proplist, val);
  saveUser();
}
function valf() {
  for (const arg of arguments) if (isdef(arg)) return arg;
  return null;
}
function valnwhite() {
  for (const arg of arguments) {
    if (nundef(arg) || isEmpty(arg) || isWhiteSpace(arg)) {
      continue;
    }
    return arg;
  }
  return null;
}
function verify_min_req() {
  let [fen, uplayer] = [Z.fen, Z.uplayer];
  let pl = fen.players[uplayer];
  let jsorted = jsCopy(pl.journeys).sort((a, b) => b.length - a.length);
  let di = {
    '3': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 3,
    '33': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 3
      && is_group(jsorted[1]) && jsorted[1].length >= 3,
    '4': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 4,
    '44': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 4
      && is_group(jsorted[1]) && jsorted[1].length >= 4,
    '5': jsorted.length > 0 && is_group(jsorted[0]) && jsorted[0].length >= 5,
    '55': jsorted.length > 1 && is_group(jsorted[0]) && jsorted[0].length >= 5
      && is_group(jsorted[1]) && jsorted[1].length >= 5,
    '7R': jsorted.length > 0 && is_sequence(jsorted[0]) && jsorted[0].length >= 7,
  };
  let goals = is_fixed_goal() ? [get_round_goal()] : get_available_goals(uplayer);
  for (const g of goals) {
    if (di[g] == true) { return true; }
  }
  return false;
}
function whenSoundPaused() {
  _sndPlayer = null;
  _sndPlayerIdle = true;
  _loaded = false;
  if (!isEmpty(_qSound)) { _deqSound(); } else { _idleSound = true; }
}
function where(o) {
  let fname = getFunctionsNameThatCalledThisFunction();
}
function without(arr, elementToRemove) {
  return arr.filter(function (el) {
    return el !== elementToRemove;
  });
}
