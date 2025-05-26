import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {Category} from './category.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category',
  imports: [
    FaIconComponent
  ],
  templateUrl: './category.component.html',
  standalone: true,
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  categoryService = inject(CategoryService);
  categories: Category[] | undefined;
  currentActiveCategory = this.categoryService.getCategoryByDefault();

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.categories = this.categoryService.getCategories();
  }

}
