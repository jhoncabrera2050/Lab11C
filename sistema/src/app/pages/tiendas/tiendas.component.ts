import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { Tienda } from 'src/app/models/tiendas';

interface MarkerProperties {
  position: google.maps.LatLngLiteral;
  label: google.maps.MarkerLabel;
  title: string;
  info: string;
}

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})
export class TiendasComponent implements OnInit {
  listTiendas: Tienda[] = [];
  newTienda: any = {};
  selectedTienda: any = {};
  elementos: number = 0;
  latitud: number = -12.03581;
  longitud: number = -76.958392;
  mapOptions: google.maps.MapOptions = {
    center: { lat: this.latitud, lng: this.longitud },
    zoom: 15,
    mapTypeControl: false,
  };

  markers: MarkerProperties[] = [
    {
      position: { lat: -12.0491625, lng: -76.9554737 },
      label: {
        color: 'black',
        text: 'Tienda N°25',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      title: 'ciudad',
      info: 'ciudad de los reyes',
    },
    {
      position: { lat: -12.0331625, lng: -76.9554737 },
      label: {
        color: 'black',
        text: 'Tienda N°2',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      title: 'ciudad',
      info: 'ciudad de los reyes',
    },
    {
      position: { lat: -12.0331625, lng: -76.9689937 },
      label: {
        color: 'black',
        text: 'Tienda N°3',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      title: 'ciudad',
      info: 'ciudad de los reyes',
    },
  ];

  constructor(private _tiendaService: TiendaService) {}

  ngOnInit() {
    this.getTiendas();
  }

  handleMapInitialized(map: google.maps.Map) {
    this.markers.forEach(({ position, label }) => {
      new google.maps.Marker({
        position,
        label,
        map,
      });
    });
  }

  verSantaAnita() {}

  verSanMiguel() {}

  verSanIsidro() {}

  verTiendas() {
    this._tiendaService.getTiendas().subscribe((data) => {
      console.log(this.markers);
      console.log(this.mapOptions.center);
      console.log(data);
      this.listTiendas = data;
      this.elementos = this.listTiendas.length;
    });
  }

  verTiendaEnMapa(tienda: Tienda) {
    this.mapOptions.center = {
      lat: tienda.latitud,
      lng: tienda.longitud,
    };
    console.log(this.mapOptions.center);
    this.markers.push({
      position: { lat: tienda.latitud, lng: tienda.longitud },
      label: {
        color: 'black',
        text: tienda.tienda,
        fontSize: '20px',
        fontWeight: 'bold',
      },
      title: 'ciudad',
      info: 'ciudad de los reyes',
    });
    console.log(this.markers);
  }

  getTiendas() {
    this._tiendaService.getTiendas().subscribe(
      (response) => {
        this.listTiendas = response;

        // Construir los marcadores
        this.markers = this.listTiendas.map((tienda) => {
          console.log(tienda);
          return {
            position: { lat: tienda.latitud, lng: tienda.longitud },
            label: {
              color: 'black',
              text: tienda.tienda,
              fontSize: '20px',
              fontWeight: 'bold',
            },
            title: 'ciudad',
            info: 'ciudad de los reyes',
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.markers);
  }

  createTienda() {
    this._tiendaService.guardarTienda(this.newTienda).subscribe(
      (response) => {
        this.getTiendas();
        this.newTienda = {}; // Limpiar los campos del formulario
      },
      (error) => {
        console.log(error);
      }
    );
    const nuevoMarker: MarkerProperties = {
      position: { lat: this.newTienda.latitud, lng: this.newTienda.longitud },
      label: {
        color: 'black',
        text: this.newTienda.tienda,
        fontSize: '20px',
        fontWeight: 'bold',
      },
      title: 'ciudad',
      info: 'ciudad de los reyes',
    };

    this.markers.push(nuevoMarker);
    console.log(this.markers);
  }

  updateTienda() {
    this._tiendaService.actualizarTienda(this.selectedTienda).subscribe(
      (response) => {
        this.getTiendas();
        this.selectedTienda = {}; // Limpiar los campos del formulario
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTienda(tiendaId: any) {
    console.log(tiendaId);
    this._tiendaService.deleteTienda(tiendaId).subscribe(
      (response) => {
        this.getTiendas(); // Actualizar la lista de tiendas
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectTienda(tienda: any) {
    this.selectedTienda = { ...tienda }; // Crear una copia de la tienda seleccionada para evitar modificarla directamente en la lista
  }
}
