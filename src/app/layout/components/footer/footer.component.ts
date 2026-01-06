import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p class="footer-text">
        © {{ currentYear }} Angular Template. Todos los derechos reservados.
      </p>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 1rem;
      text-align: center;
      background-color: var(--bg-surface);
      border-top: 1px solid var(--border-subtle);
    }

    .footer-text {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0;
    }
  `],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
