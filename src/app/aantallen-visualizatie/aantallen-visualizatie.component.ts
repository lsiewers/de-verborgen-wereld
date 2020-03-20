import { Component, OnInit, HostListener } from '@angular/core';
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

  @HostListener('window:resize', ['$event'])
  resize(e: Event) {
    this.p5.height = window.innerHeight;
    this.p5.width = window.innerWidth;
  }
}
