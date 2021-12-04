class DisplacementLine extends GameObject{
  constructor(pos, carPos) {
    super(pos.slice());
    this.carPos = carPos.slice();
  }

  draw(){
    const targetPos = this.carPos.map((value, i) => value - this.pos[i]);
    const lineMagnitude = vectorMagnitude(targetPos);

    this.preDraw();
    ctx.translate((this.carPos[0] - this.pos[0]) / 2, (this.carPos[1] - this.pos[1]) / 2);
    const angle = Math.atan2(targetPos[1], targetPos[0]);
    ctx.rotate(angle);
    ctx.font = '13px Roboto';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    const text = `ΔX: ${Math.round(lineMagnitude)} px`;
    ctx.fillText(text, 0, 4);
    this.postDraw();

    const textWidth = ctx.measureText(text).width;
    if(lineMagnitude > textWidth + 40){
      this.preDraw();
      ctx.strokeStyle = 'rgba(0,0,0,.3)';
      ctx.moveTo(0, 0);
      ctx.lineTo(targetPos[0] / 2 - (textWidth - 10) * Math.cos(angle), targetPos[1] / 2 - (textWidth - 10) * Math.sin(angle));
      ctx.moveTo(targetPos[0] / 2 + (textWidth - 10) * Math.cos(angle), targetPos[1] / 2 + (textWidth - 10) * Math.sin(angle));
      ctx.lineTo(targetPos[0], targetPos[1]);
      ctx.stroke();
      this.postDraw();
    }
  }
}
