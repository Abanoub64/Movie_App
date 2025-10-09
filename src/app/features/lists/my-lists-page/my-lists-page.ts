import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListsService, UserList } from '@shared/services/lists.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-lists-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-lists-page.html',
  styleUrls: ['./my-lists-page.css'],
})
export class MyListsPage {
  private lists = inject(ListsService);
  lists$!: Observable<UserList[]>;

  constructor() {
    this.lists$ = this.lists.lists$();
  }

  async deleteList(list: UserList) {
    if (confirm(`Are you sure you want to delete list "${list.name}"?`)) {
      await this.lists.deleteList(list.id);
    }
  }
}
