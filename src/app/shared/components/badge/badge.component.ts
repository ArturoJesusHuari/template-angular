import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'purple' | 'blue' | 'gray';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <span [class]="getBadgeClasses()">
      <mat-icon *ngIf="icon" class="!text-xs !w-3 !h-3 mr-1">{{ icon }}</mat-icon>
      <ng-content></ng-content>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() icon?: string;
  @Input() dot = false;

  getBadgeClasses(): string {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-full',
      'transition-colors',
      'duration-150',
    ];

    // Size classes
    const sizeClasses = {
      sm: ['text-[10px]', 'px-2', 'py-0.5', 'gap-0.5'],
      md: ['text-xs', 'px-2.5', 'py-1', 'gap-1'],
      lg: ['text-sm', 'px-3', 'py-1.5', 'gap-1.5'],
    };

    // Variant classes
    const variantClasses = {
      success: [
        'bg-[#3ecf8e]/10',
        'text-[#3ecf8e]',
        'border',
        'border-[#3ecf8e]/20',
      ],
      error: [
        'bg-red-500/10',
        'text-red-400',
        'border',
        'border-red-500/20',
      ],
      warning: [
        'bg-orange-500/10',
        'text-orange-400',
        'border',
        'border-orange-500/20',
      ],
      info: [
        'bg-blue-500/10',
        'text-blue-400',
        'border',
        'border-blue-500/20',
      ],
      neutral: [
        'bg-[#2a2a2a]',
        'text-[#a0a0a0]',
        'border',
        'border-[#353535]',
      ],
      purple: [
        'bg-purple-500/10',
        'text-purple-400',
        'border',
        'border-purple-500/20',
      ],
      blue: [
        'bg-blue-500/10',
        'text-blue-400',
        'border',
        'border-blue-500/20',
      ],
      gray: [
        'bg-gray-500/10',
        'text-gray-400',
        'border',
        'border-gray-500/20',
      ],
    };

    return [
      ...baseClasses,
      ...sizeClasses[this.size],
      ...variantClasses[this.variant],
    ].join(' ');
  }
}
