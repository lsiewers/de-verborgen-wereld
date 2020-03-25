import { ScalePhases } from '../enums/scalePhases.enum';

export class Camera {
  setCamera(p5: any, amount: ScalePhases) {
    let x: number;
    let y: number;

    if (amount === ScalePhases.ONE) {
      y = 0;
      x = 0;
    } else if (amount === ScalePhases.TWO) {
      y = -400;
      x = -100;
    } else if (amount === ScalePhases.THREE) {
      y = -1000;
      x = -400;
    } else if (amount === ScalePhases.FOUR) {
      y = -1200;
      x = -500;
    }

    return p5.camera(0, y, (p5.height / 2) / Math.tan(Math.PI / 6), 0, x, 0, 0, 1, 0);
  }
}
