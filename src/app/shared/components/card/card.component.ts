import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card 
      class="bg-[#111111] border border-[#1f1f1f] rounded-xl transition-all duration-300 ease-out overflow-hidden h-full hover:-translate-y-1 hover:shadow-2xl hover:border-[#3ecf8e]/30"
    >
      <mat-card-header *ngIf="title" class="!pb-3 !px-6 !pt-6">
        <mat-card-title class="!text-lg !font-bold !text-white !tracking-tight !mb-0">
          {{ title }}
        </mat-card-title>
        <mat-card-subtitle *ngIf="subtitle" class="!text-xs !text-[#a0a0a0] !mt-1 !mb-0">
          {{ subtitle }}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="!px-6 !pb-6" [class.!pt-6]="!title" [class.!pt-4]="title">
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions *ngIf="hasActions" class="!px-6 !pb-6 !pt-0">
        <ng-content select="[actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hasActions = false;
}
