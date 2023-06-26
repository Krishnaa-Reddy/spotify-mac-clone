import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { token } from 'src/domain/access_token';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // access_token !:token
  access_token =
  "BQCoa_7z2DrPDmHF7F4yUsc-0p-u3e3YOTeEyLyqwoxVKlDOtlwvsMKytqZgtpqJIIkelxjNGt-JklmuAeMPdwAOBuevbPUDlgIzNI8LFWSNFj0Eiok"
  constructor(private http: HttpClient) {}

    
  
  token$ = () : Observable<any>  => {
    const client_id = '7d123534c0684bef89443389806cda86';
    const client_secret = '58b5839441e84875887f72f42932b450';
    const url = 'https://accounts.spotify.com/api/token';
    const grant_type = 'client_credentials';
    const encodedCredentials = btoa(`${client_id}:${client_secret}`);
    const params = new HttpParams().set('grant_type', grant_type);
    const headers = new HttpHeaders({
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<token>(url, params.toString(), {
      headers,
      responseType: 'json',
    });
  }

  albums$ = (): Observable<any> => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.access_token}`,
    });
    return this.http.get<any>(
      'https://api.spotify.com/v1/browse/new-releases?country=IN',
      {
        headers,
      }
    );
  };
}
