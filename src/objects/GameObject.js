class GameObject {
  constructor(pos) {
    this.pos = pos;
    this.velocity = [0, 0];
    this.acceleration = 0.1;
    this.lastMoveTime = null;
    this.lastMovePos = null;
  }

  get moving() {
    return Date.now() - this.lastMoveTime < 10;
  }
  get instantaneousVelocity(){
    return vectorMagnitude(this.velocity);
    return Number(this.moving) * vectorMagnitude(this.velocity);
  }

  turn(degree) {
    if(Math.abs(this.instantaneousVelocity) === 0) return;

    const { angle, velocity } = this;
    const velocityMagnitude = vectorMagnitude(velocity);

    this.velocity = [
      velocityMagnitude * Math.cos((angle + degree) * Math.PI / 180),
      velocityMagnitude * Math.sin((angle + degree) * Math.PI / 180)
    ];
  }

  get angle() {
    return Math.atan2(this.velocity[1], this.velocity[0]) * 180 / Math.PI;
  }

  onMove(pos) {
    this.lastMoveTime = Date.now();
  }

  forward() {
    if(this.instantaneousVelocity > 24) return;

    this.velocity[0] += this.acceleration * Math.cos(this.angle * Math.PI / 180);
    this.velocity[1] += this.acceleration * Math.sin(this.angle * Math.PI / 180);

    // this.pos[0] += this.velocity[0];
    // this.pos[1] += this.velocity[1];

    this.onMove(this.pos);
  }

  backward() {
    if(this.instantaneousVelocity > 24) return;

    this.velocity[0] -= this.acceleration * Math.cos(this.angle * Math.PI / 180);
    this.velocity[1] -= this.acceleration * Math.sin(this.angle * Math.PI / 180);

    // this.pos[0] -= this.velocity[0];
    // this.pos[1] -= this.velocity[1];

    this.onMove(this.pos);
  }

  addDot = throttle(() => gameObjects.push(new Dot(this.pos.slice())), 50);

  process(){
    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
    this.lastMovePos = this.pos.slice();

    const epsilon = 0.01;

    if(Math.abs(this.velocity[0]) > epsilon){
      this.velocity[0] -= this.acceleration * Math.cos(this.angle * Math.PI / 180) * 0.1;
    }
    if(Math.abs(this.velocity[1]) > epsilon) {
      this.velocity[1] -= this.acceleration * Math.sin(this.angle * Math.PI / 180) * 0.1;
    }

    if(this.instantaneousVelocity > epsilon){
      this.addDot();
    }
    // this.velocity[0] -= Math.sign(this.velocity[0]) * this.acceleration * 0.1;
    // this.velocity[1] -= Math.sign(this.velocity[0]) * this.acceleration * 0.1;

    return this;
  }

  preDraw() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * Math.PI / 180);
  }

  postDraw() {
    ctx.closePath();
    ctx.restore();
  }
}