import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "src/app/models/usuario.model";

import { map } from "rxjs/operators";
import { FacturaModel } from '../models/factura.model';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userToken: string;
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey = "AIzaSyBUA-Q61-ylqyrz6Kljnqp_ZU42jFdp8O8";

  private urlAntojitosWS = "http://localhost:53569/api";

  // Crea nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken(); // Para saber si hay un token en el localStorage o no
  }

  /** A nivel de servicio lo unico que hacemos es eliminar el token que guarda el locarlStorage */
  logOut() {
    localStorage.removeItem("token");
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map((resp) => {
          // console.log('Entro al map del rxjs');
          this.guardarToken(resp["idToken"]);
          return resp; // Se debe retornar de nuevo para que el pipe no se quede con la respuesta
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    /** Informacion que voy a enviar a traves del http */
    const authData = {
      /** En vez de usar el siguiente codigo para pasarle las propiedades/valores del usuario a firebase:  */
      /*email: usuario.email,
      password: usuario.password,*/

      /** Se puede utiliar el siguiente codigo, la unica diferencia es que se le va a enviar el atributo
       * nombre la cual no pertenece al modelo de firebase, pero no afecta en nada la funcionalidad a implementar
       */
      ...usuario,
      returnSecureToken: true,
    };

    console.log(`${this.url}signUp?key=${this.apiKey}`);

    return this.http
      .post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map((resp) => {
          // console.log('Entro al map del rxjs');
          this.guardarToken(resp["idToken"]);
          return resp; // Se debe retornar de nuevo para que el pipe no se quede con la respuesta
        })
      );
  }

  /** Permite leer el token generado desde firebase para ese usuario en el localStorage */
  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem("expira", hoy.getTime().toString());
  }

  /** Permite validar si en el localStorage existe un token */
  private leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  /** Este metodo permite validar si el tokenId existe o tiene una longitud
   * mayor a 2 caracteres, es decir, si tiene un valor cualquiera
   */
  estaAutenticado(): boolean {
    // return this.userToken.length > 2;
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem("expira"));
    const expiraDate = new Date();
    expiraDate.setTime(expira); // Se setea para poder hacer la comparacion de la fecha/hora actual

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  // Capturar datos del cliente que va a realizar la compra
  getCliente(identificacion: number) {
    return this.http.get(
      `${this.urlAntojitosWS}/Clientes?identificacion=${identificacion}`
    );
  }

  // Capturar los productos registrados
  getProductos() {
    return this.http.get(`${this.urlAntojitosWS}/Productos`);
  }

  getFactCons() {
    return this.http.get(`${this.urlAntojitosWS}/Facturas`);
  }

  vender(factXPagar: FacturaModel) {
    return this.http.post(`${this.urlAntojitosWS}/Facturas`, factXPagar);
  }
}
