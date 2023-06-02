export class Tienda {

    _id?: string;
    tienda: string;
    departamento: string;
    latitud: number;
    longitud: number;
    
    distrito: string;
    cantidad: number;

    constructor(tienda:string,latitud: number ,longitud: number, departamento:string, distrito: string, cantidad: number){
        this.tienda = tienda;
        this.departamento = departamento;
        this.distrito = distrito;
        this.latitud = latitud;
        this.longitud = longitud;
        this.cantidad = cantidad;

    }

}