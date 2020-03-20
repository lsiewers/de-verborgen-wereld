import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-aantallen-visualizatie',
  templateUrl: './aantallen-visualizatie.component.html',
  styleUrls: ['./aantallen-visualizatie.component.scss']
})
export class AantallenVisualizatieComponent implements OnInit {
  private p5;
  imgPath = '../../assets/img/';
  // animals = {
  //   chicken: {
  //     img: `${this.imgPath}/chicken.png`,
  //     size: 5,
  //     getData: () => this.dataService.getDataQuery('aantal-vee', ['type', '==', 'Kippen'])
  //   },
  //   cow: {
  //     img: `${this.imgPath}/cow.png`,
  //     size: 20,
  //     getData: () => this.dataService.getDataQuery('aantal-vee', ['type', '==', 'Koeien'])
  //   },
  //   pig: {
  //     img: `${this.imgPath}/pig.png`,
  //     size: 10,
  //     getData: () => this.dataService.getDataQuery('aantal-vee', ['type', '==', 'Varkens'])
  //   }
  // };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // p5 object
    this.p5 = new p5(this.sketch);
  }

  // p5 sketch
  private sketch: p5 = p => {
    let meImg: p5.Image;

    p.preload = () => {
      meImg = p.loadImage('assets/img/me.png');
    };

    // p5 setup function
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL).parent('sketch-holder');
    };

    p.draw = () => {
      p.background('#000');
      p.translate(p.width / 2, p.height / 2, 1);
      p.texture(meImg);
      p.noStroke();
      p.plane(300);
    };
  }
}
