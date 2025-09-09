import { Component, Input } from '@angular/core';
import { ForumThreadComponent } from '../forum-thread/forum-thread.component';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [ForumThreadComponent, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input() category!: Category;

}
