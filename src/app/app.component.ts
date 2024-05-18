import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonCard, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
