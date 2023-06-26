import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { token } from 'src/domain/access_token';
import { album } from 'src/domain/album';
import { SpotifyService } from 'src/service/spotify.service';


@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardComponent{
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private spotify: SpotifyService, private cdr: ChangeDetectorRef) {}

  access_token = '';
  albums!: any;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
      ];
    })
  );


  getToken(event: Event): any {
    // console.log((event.target as HTMLInputElement));
    
    this.spotify
      .token$()
      .subscribe((response) => (this.access_token = response.access_token));
  }

  getAlbums(): any {
    this.spotify.albums$().subscribe((response) => {
      this.albums = response.albums.items;
    });
    
  }


}



