import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="custom-card">
      <mat-card-header *ngIf="title">
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="mt-4">
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions *ngIf="hasActions" class="mt-4">
        <ng-content select="[actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .custom-card {
      margin: 1rem 0;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    
    .custom-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  `],
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hasActions = false;
}
