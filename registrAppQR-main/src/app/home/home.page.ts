import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario = localStorage.getItem('nombreHome');
  apellido = localStorage.getItem("apellidoHome");

  correo = localStorage.getItem('correo');
  id_clase = localStorage.getItem("codigo");
  asignatura = localStorage.getItem("asignatura");



  

  constructor(private router: Router) {
  }

  ngOnInit(){

  }
}







