import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { SpotifyService } from 'src/service/spotify.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements AfterViewInit {
  albumBanners: any = [];
  responsiveOptions: any[] = [];
  isPaused = true
  showData = false;

  @ViewChild('playButton') playButton!: ElementRef;

  constructor(
    private spotify: SpotifyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    console.log(this.playButton.nativeElement);
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.spotify.albums$().subscribe((response) => {
      this.albumBanners = response.albums.items.map(
        (item: any) => item.images[1].url
      );
      this.showData = true;
      this.cdr.detectChanges();
    });
  }

  handlePlay(){
    console.log("Clicked");
    
  }

  togglePlay() {
    this.isPaused = this.isPaused ? false : true 
}
}
