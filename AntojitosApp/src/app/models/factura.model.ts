import { ProductoModel } from "./producto.model";
import { FacDetalleModel } from './facDetalle.model';
export class FacturaModel {
  idFactura: number;
  IdCliente: string;
  FechaVenta: Date;
  ValorTotal: number;
  detalleProductos: FacDetalleModel[];

  constructor() {}
}
