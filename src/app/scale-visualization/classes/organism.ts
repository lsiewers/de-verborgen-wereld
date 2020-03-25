import { Zone } from '../models/zone.model';
import { Img } from '../models/img.model';

export class Organism {
  pHeight: number;
  amount: number;
  loadedImg: any;
  takenPositions: Array<{x: number, z: number, lookDirection: number}> = [];
  img: Img;
  treshold: number;

  constructor(amount: number, pHeight: number, img: Img, treshold: number) {
    this.amount = amount;
    this.pHeight = pHeight;
    this.img = img;
    this.img.size = pHeight * this.img.size * 0.03;
    this.treshold = treshold / this.amount;
  }

  loadImage(p5: any) { this.loadedImg = p5.loadImage(this.img.file); }

  drawZone(p5: any, zone: Zone) {
    p5.push();
    p5.translate(zone.x, this.pHeight / 2, zone.z);
    p5.rotateX(1.570796); // 90 graden in radian
    p5.fill('#fff');
    p5.stroke('#999');
    p5.plane(zone.width, zone.length);
    p5.pop();
  }
}
