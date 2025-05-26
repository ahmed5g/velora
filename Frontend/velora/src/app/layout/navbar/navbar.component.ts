import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {CategoryComponent} from './category/category.component';
import {AvatarComponent} from './avatar/avatar.component';
import {MenuItem} from 'primeng/api';
import {RouterLink} from '@angular/router';
import {ToastService} from '../toast.service';

@Component({
  selector: 'app-navbar',
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{


  location = "Anywhere";
  guests = "Add guests";
  dates= "Any week";


  toastService = inject(ToastService);

  //login () => this.authService.login();
  //logout () => this.authService.logout();

  currentMenuItems: MenuItem[] |undefined = [];

  ngOnInit(): void {
    this.currentMenuItems = this.fetchMenu();
    this.toastService.sendMessage({
      severity: 'info',
      summary: 'Welcome to the app!'
    })
  }




  private fetchMenu() {
    return[
      {
        label:"Sign up",
        styleClass:"font-bold"
      },
      {
        label:"Log in"
      }
    ]
  }


}
