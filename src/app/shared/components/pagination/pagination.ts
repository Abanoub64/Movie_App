import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { ZardPaginationModule } from './pagination.module';

@Component({
  selector: 'app-pagination',
  standalone: true,
  styleUrl: './pagination.css',
  imports: [ZardPaginationModule, FormsModule],
  template: ` <z-pagination [zPageIndex]="currentPage" [zTotal]="5" [(ngModel)]="currentPage" /> `,
})
export class Pagination {
  protected currentPage = 2;
}
