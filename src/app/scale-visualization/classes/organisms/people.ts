import { Zone } from '../../models/zone.model';
import { Img } from '../../models/img.model';
import { Organism } from '../organism';
import { ScalePhases } from '../../enums/scalePhases.enum';

export class People extends Organism {
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
        file: './assets/img/human.png'
      },
      100
    );
  }

  loadImage(p5: any) { this.loadedImg = p5.loadImage(this.img.file); }

  getZone(amount: ScalePhases): Zone {
    let zone: Zone;

    if (amount === ScalePhases.ONE) {
      zone = {
        x: 0,
        z: -0.2,
        width: 0.5,
        length: 0.5
      };
    } else if (amount === ScalePhases.TWO) {
      zone = {
        x: 0,
        z: -0.2,
        width: 0.5,
        length: 0.5
      };
    } else if (amount === ScalePhases.THREE) {
      zone = {
        x: 0,
        z: -0.2,
        width: 1,
        length: 1.25
      };
    }
    zone.x = zone.x * this.pHeight;
    zone.z = zone.z * this.pHeight;
    zone.width = zone.width * this.pHeight;
    zone.length = zone.length * this.pHeight;
    return zone;
  }
}
