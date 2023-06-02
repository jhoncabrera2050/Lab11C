import { Component, Input, Output } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  nombre: string = 'Sin Nombre';
  
  constructor(private loginServices: DataLoginService){
      this.nombre = this.loginServices.nombreUsuario
  }

}
