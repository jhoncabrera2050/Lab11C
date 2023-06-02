import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

//Libreria para crear el pdf
import * as pdfMake from  'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  
  listProductos: Producto[] = [];
  elementos: number = 0;
  
  constructor(private _productoService: ProductoService) {

  }
  
  ngOnInit(): void {
    
    this.obtenerProductos();

  }

  openPdfTables() {
    
      const documentDefinition: any = {
        content: [
          {
            table: {
              
              headerRows: 1,
              widths: ['*', 'auto', 100, '*'],
  
              body: [
                [{ text: 'Nombre', bold: true }, { text: 'Categoria', bold: true }, { text: 'Ubicacion', bold: true }, { text: 'Precio', bold: true }],
                [this.listProductos[0].producto, this.listProductos[0].categoria, this.listProductos[0].ubicacion, this.listProductos[0].precio],
                [this.listProductos[1].producto, this.listProductos[1].categoria, this.listProductos[1].ubicacion, this.listProductos[1].precio],
                [this.listProductos[2].producto, this.listProductos[2].categoria, this.listProductos[2].ubicacion, this.listProductos[2].precio]
              ]

              
            }
          }
        ]
      };
      pdfMake.createPdf(documentDefinition).open();
  }


  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
      this.elementos = this.listProductos.length;
    })
  }

  eliminarProducto(id: any){
    this._productoService.deleteProducto(id).subscribe(data => {

      Swal.fire({
        title: 'Eliminacion de Producto',
        text: "¿Desea eliminar el producto?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          this.obtenerProductos();
          this.elementos = this.listProductos.length;
        }
      })
    })
  }

}
