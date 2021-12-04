class Button extends Rectangle{
  constructor(pos, char){
    const size = 50;
    super(pos, size, size);
    this.char = char;
    this.active = false;
  }

  draw() {
    this.preDraw();
    ctx.fillStyle = this.active ? 'red' : '#000';
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.postDraw();

    this.preDraw();
    // write text on canvas
    ctx.font = '16px Roboto';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(this.char.toUpperCase(), 0, 7);
    this.postDraw();
  }
}