import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '@shared/services/lists.service';

@Component({
  selector: 'app-create-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-list-page.html',
  styleUrls: ['./create-list-page.css']
})
export class CreateListPage {
  private fb = inject(FormBuilder);
  private lists = inject(ListsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  movieParam = this.route.snapshot.queryParamMap;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: [''],
    isPublic: [true],
  });

  saving = false;
  error = '';

  async submit() {
    if (this.form.invalid || this.saving) return;
    this.saving = true; this.error = '';
    try {
      const listId = await this.lists.createList(this.form.value as any);

      const movieId = Number(this.movieParam.get('movieId') || '');
      const title = this.movieParam.get('title') || '';
      const poster = this.movieParam.get('poster') || '';
      const score = Number(this.movieParam.get('score') || '');

      if (movieId && title) {
        await this.lists.addItem(listId, {
          id: movieId,
          title,
          poster_path: poster || null,
          vote_average: isNaN(score) ? null : score,
        });
      }

      this.router.navigate(['/lists', listId]);
    } catch (e: any) {
      this.error = e?.message || String(e);
    } finally {
      this.saving = false;
    }
  }

  cancel() { this.router.navigate(['/lists']); }
}
