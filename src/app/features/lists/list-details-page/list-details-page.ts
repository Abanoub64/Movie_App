import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListsService } from '@shared/services/lists.service';

@Component({
  selector: 'app-list-details-page',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './list-details-page.html',
  styleUrls: ['./list-details-page.css']
})
export class ListDetailsPage {
  private route = inject(ActivatedRoute);
  private lists = inject(ListsService);

  listId = this.route.snapshot.paramMap.get('id')!;
  list$ = this.lists.list$(this.listId);
  items$ = this.lists.listItems$(this.listId);

  async remove(itemId: number) {
    await this.lists.removeItem(this.listId, itemId);
  }

  posterUrl(p: string | null) {
    return p ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${p}` : '/assets/placeholder-poster.png';
  }
}
