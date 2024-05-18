import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  items: any[];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem() {
    const newItem = { name: 'New Item' };
    this.firestoreService.addItem(newItem);
  }

  updateItem(item: any) {
    this.firestoreService.updateItem(item);
  }

  deleteItem(id: string) {
    this.firestoreService.deleteItem(id);
  }
}