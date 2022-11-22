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

  codigo = localStorage.getItem("codigo");
  asignatura = localStorage.getItem("asignatura");

  cod = localStorage.getItem("cod");
  nom = localStorage.getItem("nom");

  

  constructor(private router: Router) {
  }

  ngOnInit(){
    try {
      this.cod = this.router.getCurrentNavigation().extras.state.cod;
      this.nom = this.router.getCurrentNavigation().extras.state.nom;
    } catch (error) {
      
    }
  }
}







