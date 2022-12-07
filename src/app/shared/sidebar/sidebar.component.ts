import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxToastService } from 'ngx-toast-notifier';
import { MatDialog } from '@angular/material/dialog';
import { CarritoComponent } from 'src/app/pages/carrito/carrito.component';

@UntilDestroy()
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user:string;
  roll:string;

  constructor(private observer: BreakpointObserver, 
    private router: Router,
    private notificaciones: NgxToastService,
    private dialog: MatDialog) {
    this.user = sessionStorage.getItem('username')!;
    this.roll = sessionStorage.getItem('roll')!;
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe(resp => {
        if (resp.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
  }

  logout(){
    this.notificaciones.onSuccess('LOGOUT', 'Nos vemos pronto')
    sessionStorage.clear();
  }


  abrirCarrito(){
    this.dialog.open(CarritoComponent, {
      width: '800px',
      height: '600px'
    });
  }
}
