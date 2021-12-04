class Info {
  constructor() {
    this._time = 0;
    this._velocity = 0;
    this._speed = 0;
  }

  updateAttribute(name, value) {
    document.getElementById('info').querySelector(`[data-info-key="${ name }"]`).innerText = value;
  }

  updateFPS = throttle((fps) => this.updateAttribute('fps', fps), 100);

  set time(value) {
    this._time = value;
    document.getElementById('time').innerText = value;
  }

  set velocity(value) {
    this._velocity = value;
    document.getElementById('velocity').innerText = value;
  }

  set speed(value) {
    this._speed = value;
    document.getElementById('speed').innerText = value;
  }
}
