class Dot extends GameObject {
  constructor(pos) {
    super(pos);
  }

  draw() {
    this.preDraw();
    ctx.fillStyle = 'blue';
    const hw = 1;
    const hh = 1;
    ctx.fillRect(-hw, -hh, hw * 2, hh * 2);
    this.postDraw();
  }
}
