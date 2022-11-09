import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css'],
  providers: [NgbCarouselConfig]
})
export class VerProductoComponent implements OnInit {

	constructor(config: NgbCarouselConfig) {
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
    config.animation = false;
	}

  ngOnInit(): void {
  }

}
