import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ClienteModel } from "../../models/cliente.model";
import { ProductoModel } from "../../models/producto.model";
import { FacturaModel } from "../../models/factura.model";
import Swal from "sweetalert2";
import { FacDetalleModel } from "../../models/facDetalle.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  fechaVenta: any;
  cliente: any = {};
  existe: boolean;
  productos: any[] = [];
  facDetalle: FacDetalleModel[] = [];
  prdFacDetalle: FacDetalleModel;
  producto: ProductoModel;
  consecutivo: number;
  totalAPagar = 0;
  factXPagar: FacturaModel;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.existe = true;
    this.getFechaVenta();
  }

  /** Para cerrar sesion se debe limpiar eliminar el token del locarlStarge y redireccionar
   * a la pagina del login
   */
  salir() {
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  // Antojitos App ------------------------------------------------------------------------------------------
  getFechaVenta() {
    this.fechaVenta = new Date();
  }

  getCliente(identificacion: number) {
    // console.log('Identificacion: ' + identificacion);
    if (`${identificacion}` === '') {
      Swal.fire({
        icon: 'error',
        title: 'Identificacion Cliente',
        text: 'Por favor ingresar un numero de identificacion.',
      });
    } else {
      Swal.fire({
        allowOutsideClick: false, // No permite que el usuario cierre la ventana por fuera del alert
        icon: "info",
        text: "Cargando cliente...",
      });
      Swal.showLoading();

      this.auth.getCliente(identificacion).subscribe(
        (cliente) => {
          Swal.close();
          console.log(cliente);
          this.cliente = cliente;
          this.existe = false;
          this.getProductos();
          this.getFactConsecutivo();
        },
        (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            icon: "error",
            title: "Error de conexión :(",
            text: "Ocurrio lo siguiente: " + err.error.error.message,
          });
        }
      );
    }
  }

  getProductos() {
    this.auth.getProductos().subscribe((lst: any) => {
      this.productos = lst;
      console.log(this.productos);
    });
  }

  getFactConsecutivo() {
    this.auth.getFactCons().subscribe((factCons: number) => {
      this.consecutivo = factCons;
      console.log(this.consecutivo);
    });
  }

  addProducto(codigo: number, cantidad: number) {
    console.log(this.consecutivo + "," + codigo);
    this.producto = this.productos.find((x) => x.id === codigo);

    this.prdFacDetalle = new FacDetalleModel();
    this.prdFacDetalle.idFactura = this.consecutivo;
    this.prdFacDetalle.idProducto = codigo;
    this.prdFacDetalle.Cantidad = cantidad;
    this.prdFacDetalle.valorUnidad = this.producto.valor;
    this.prdFacDetalle.valorTotal = cantidad * this.producto.valor;
    this.facDetalle.push(this.prdFacDetalle);
    this.getTotalFact(this.facDetalle);
  }

  getTotalFact(productosVenta: FacDetalleModel[]) {
    for (let producto of productosVenta) {
      this.totalAPagar += producto.valorTotal;
    }
    // console.log('Total a pagar: ' + totalAPagar);
  }

  pagarFacT() {
    if (this.facDetalle.length !== 0) {
      console.log("Pagando detalle: " + this.facDetalle);
      this.factXPagar = new FacturaModel();

      this.factXPagar.idFactura = this.consecutivo;
      this.factXPagar.IdCliente = this.cliente.IdCliente;
      this.factXPagar.FechaVenta = this.fechaVenta;
      this.factXPagar.ValorTotal = this.totalAPagar;
      this.factXPagar.detalleProductos = this.facDetalle;
      console.log(this.factXPagar);

      Swal.fire({
        allowOutsideClick: false, // No permite que el usuario cierre la ventana por fuera del alert
        icon: "info",
        text: "Facturando venta...",
      });
      Swal.showLoading();

      this.auth.vender(this.factXPagar).subscribe((res) => {
        console.log(res);
        Swal.fire({
          allowOutsideClick: false, // No permite que el usuario cierre la ventana por fuera del alert
          icon: "success",
          text: "Venta realizada!",
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al facturar",
        text: "Por favor agregue productos a la lista.",
      });
    }
  }

  // Antojitos App ------------------------------------------------------------------------------------------
}
