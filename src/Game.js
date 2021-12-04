class Game{
  constructor() {
    this.assets = {};
    this.keys = {};

    this.pressedKeys = {};
    this.keyEvents = {
      press: {},
      release: {},
    };

    this.loop = null;
    this.lastFrameId = null;
    this.lastFrameTime = null;
    this.startTime = null;
    this.status = 'stopped';
    this.fpsInterval = 1000 / 1000;
  }
  get duration(){
    if(this.startTime === null) return 0;
    return Date.now() - this.startTime;
  }
  get fps(){
    return 1 / ((performance.now() - this.lastFrameTime) / 1000);
    return 1 / ((performance.now() - this.lastFrameTime) / 1000);
  }
  set fps(fps){
    this.fpsInterval = 1000 / fps;
  }
  _mainLoop = () =>{
    if(performance.now() - this.lastFrameTime > this.fpsInterval){
      this.loop();
      this.lastFrameTime = performance.now();
    }

    this.lastFrameId = requestAnimationFrame(this._mainLoop);
  }
  start(){
    this.status = 'running';
    this.startTime = Date.now();
    this._mainLoop();
  }
  stop(){
    this.status = 'stopped';
    cancelAnimationFrame(this.lastFrameId);
  }

  _translateKeys(...keys){
    return keys.flat(Infinity).map(key => {
      if(key.length > 1 && this.keys[key]) return this.keys[key];
      return key;
    }).flat(Infinity);
  }
  registerKeyGroup(name, keys){
    if(name.length < 2) throw new Error('name at least must be 2 characters');
    this.keys[name] = keys;
    return this;
  }
  unregisterKeyGroup(name, keys){
    if(name.length < 2) throw new Error('name at least must be 2 characters');
    delete this.keys[name];
    return this;
  }

  _onWindowKeyDown = (e) => {
    this.pressKey(e.key);
  }
  _onWindowKeyUp = (e) => {
    this.releaseKey(e.key);
  }
  register(){
    window.addEventListener('keydown', this._onWindowKeyDown);
    window.addEventListener('keyup', this._onWindowKeyUp);
  }
  unregister(){
    window.removeEventListener('keydown', this._onWindowKeyDown);
    window.removeEventListener('keyup', this._onWindowKeyUp);
  }

  _addKeyEvent(type, keys, callback){
    keys = this._translateKeys(keys);

    for(const key of keys){
      if(!this.keyEvents[type][key]) this.keyEvents[type][key] = [];
      this.keyEvents[type][key].push(callback);
    }
  }
  _fireKeyEvent(type, key){
    if(!Array.isArray(this.keyEvents[type][key])) return;

    for(const callback of this.keyEvents[type][key]){
      try{
        callback(key);
      }catch (e){
        console.error(e);
      }
    }
  }
  onKeyPress(keys, callback){
    return this._addKeyEvent('press', keys, callback);
  }
  onKeyRelease(keys, callback){
    return this._addKeyEvent('release', keys, callback);
  }
  pressKey(key){
    this._fireKeyEvent('press', key);
    this.pressedKeys[key] = true;
  }
  releaseKey(key){
    this._fireKeyEvent('release', key);
    delete this.pressedKeys[key];
  }

  isKeyPressed(key){
    if(key.length > 1 && this.keys[key]) return this.keys[key].some(k => this.pressedKeys[k]);
    return Boolean(this.pressedKeys[key]);
  }
  areAllKeysPressed(...keys){
    return keys.flat(Infinity).every(key => this.isKeyPressed(key));
  }
  isAnyKeyPressed(...keys){
    return keys.flat(Infinity).some(key => this.isKeyPressed(key));
  }

  _loadImage(src){
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  async addAsset(name, src){
    this.assets[name] = null;
    this.assets[name] = await this._loadImage(src);
  }
  getAsset(name){
    return this.assets[name];
  }
}
