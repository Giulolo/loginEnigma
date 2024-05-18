// firestore.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    // Define the Firestore collection
    this.itemsCollection = this.afs.collection('items');
    // Get the items with the ID
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Get all items
  getItems(): Observable<any[]> {
    return this.items;
  }

  // Add item
  addItem(item: any) {
    this.itemsCollection.add(item);
  }

  // Update item
  updateItem(item: any) {
    const id = item.id;
    delete item.id;
    this.itemsCollection.doc(id).update(item);
  }

  // Delete item
  deleteItem(id: string) {
    this.itemsCollection.doc(id).delete();
  }
}
