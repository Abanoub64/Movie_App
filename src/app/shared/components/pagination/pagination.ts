import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { ZardPaginationModule } from './pagination.module';

@Component({
  selector: 'app-pagination',
  standalone: true,
  styleUrl: './pagination.css',
  imports: [ZardPaginationModule, FormsModule],
  template:  `<z-pagination  [zTotal]="5"[zPageIndex]="currentPage" (zPageIndexChange)="onPageChange($event)" /> `,
})
export class Pagination {
  protected currentPage = 2;
   onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('Page changed:', newPage);
  }
}
