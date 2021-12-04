class Speedometer extends GameObject{
  constructor(){
    const margin = 20;
    const r = 80;
    super([
      canvas.width - r - margin,
      canvas.height - 0.7 * r - margin,
    ]);
    this.r = r;
  }

  draw(){
    for(let [i, degree] of enumerate(range(0.8, 2.2, 0.05))){
      this.preDraw();
      ctx.rotate(degree * Math.PI);
      let fr = 10;
      ctx.lineWidth = 1;
      if(i % 4 === 0) {
        fr = 6;
        ctx.lineWidth = 2;
      }
      if(i % 4 !== 0 && i > 16){
        ctx.strokeStyle = 'red';
      }
      ctx.moveTo(this.r / fr * (fr - 1), 0);
      ctx.lineTo(this.r, 0);
      ctx.stroke();
      this.postDraw();
    }

    this.preDraw();
    ctx.arc(0, 0, this.r, 0.8 * Math.PI, 2.2 * Math.PI);
    ctx.stroke();
    this.postDraw();

    const speed = gameObjects[0].instantaneousVelocity;
    const angle = (speed / 24) * (2.2 - 0.8) + 0.8;
    const markerLength = this.r - 20;
    this.preDraw();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(markerLength * Math.cos(angle * Math.PI), markerLength * Math.sin(angle * Math.PI));
    ctx.stroke();
    this.postDraw();

    this.preDraw();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
    this.postDraw();
  }
}
