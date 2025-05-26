import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexeddbService {
  private db: IDBDatabase | null = null;

  constructor() {
    this.openDB();
  }

  private openDB() {
    const request = indexedDB.open('MyDb', 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('tarefas')) {
        db.createObjectStore('tarefas', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      console.log('Banco de dados aberto com sucesso', this.db);
    };

    request.onerror = (event: any) => {
      console.error('Erro ao abrir o banco de dados:', event);
    };
  }
}
