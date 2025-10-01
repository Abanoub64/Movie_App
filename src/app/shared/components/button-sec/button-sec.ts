import { Component } from '@angular/core';

import { ZardButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-button',

  standalone: true,
  imports: [ZardButtonComponent],
  template: ` <button z-button>Default</button> `,
})
export class ZardDemoButtonDefaultComponent {}
