import { Zone } from '../../models/zone.model';
import { Img } from '../../models/img.model';
import { Organism } from '../organism';
import { ScalePhases } from '../../enums/scalePhases.enum';

export class Me extends Organism {
  amount: ScalePhases;
  img: Img;
  loadedImg: any;
  treshold: number;

  constructor(amount: ScalePhases, pHeight: number) {
    super(
      amount,
      pHeight,
      {
        size: 12,
        ratio: 0.35,
        file: './assets/img/me.png'
      },
      100
    );
  }

  loadImage(p5: any) { this.loadedImg = p5.loadImage(this.img.file); }

  getZone(amount: ScalePhases): Zone {
    const zone = {
      x: 0,
      z: 0.2,
      width: 0.25,
      length: 0.25
    };
    zone.x = zone.x * this.pHeight;
    zone.z = zone.z * this.pHeight;
    zone.width = zone.width * this.pHeight;
    zone.length = zone.length * this.pHeight;
    return zone;
  }
}
