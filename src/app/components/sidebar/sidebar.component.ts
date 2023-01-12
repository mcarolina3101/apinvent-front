import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    //{ path: '/add-device', title: 'Nuevo Dispositivo',  icon:'add_circle_outline', class: '' },
    { path: '/equipos', title: 'Equipos',  icon:'router', class: '' },
    { path: '/enlaces', title: 'Enlaces',  icon:'hub', class: '' },
    { path: '/tickets', title: 'Tickets',  icon:'book_online', class: '' },
    { path: '/actividad', title: 'Actividades',  icon:'library_books', class: '' },
    { path: '/data-base', title: 'Informacion',  icon:'info', class: '' },
    { path: '/admin', title: 'Administracion',  icon:'settings', class: '' }
    

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  async logout(){
    localStorage.removeItem("username");
    this.router.navigate(['/login']);
  }
}
