import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../models/tiendas';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  url = 'http://localhost:4000/api/tienda/';

  constructor(private http: HttpClient) { 
  }

  getTiendas(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteTienda(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarTienda(tienda: Tienda): Observable<any> {
    return this.http.post(this.url, tienda);
  }

  viewTienda(id?: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  actualizarTienda(tienda: any): Observable<any> {
    return this.http.put<any>(this.url + tienda._id, tienda);
  }

}
