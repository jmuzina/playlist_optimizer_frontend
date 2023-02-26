import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = [];

  private loadMenuItems(): void {
    this.items = [
      { label: 'Playlist Optimizer', routerLink: '/' },
      { label: 'About', routerLink: 'about', icon: 'pi pi-book' },
      {
        label: 'Statistics',
        routerLink: 'statistics',
        icon: 'pi pi-chart-line',
      },
      { label: 'Contact', routerLink: 'contact', icon: 'pi pi-comment' },
    ];

    if (false) {
      this.items.push({ label: 'Name Here' });
    }
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }
}
