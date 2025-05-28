import { Injectable } from '@angular/core';
// import { collectionData } from '@angular/fire/firestore';
// import { addDoc, collection, Firestore, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
// export interface Cliente {
//   id?: string;
//   nome: string;
//   email: string;
// }

export interface Tarefa {
  id?: string;
  data: Date;
  servico: string;
  prioridadeSelecionada: string;
  cliente: string;
  atividade: string;
  obs: string;
  quem: string;
  dataConclusao?: Date | string | null;
  statusSelecionada: string;
  financeiroSelecionada: string;
  valor: string;
  valorNumerico: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // ✅ Adicionar cliente
  // addCliente(cliente: Cliente) {
  //   const clientesRef = collection(this.firestore, 'clientes');
  //   return addDoc(clientesRef, cliente);
  // }

  // ✅ Listar clientes
  // getClientes(): Observable<Cliente[]> {
  //   const clientesRef = collection(this.firestore, 'clientes');
  //   return collectionData(clientesRef, { idField: 'id' }) as Observable<
  //     Cliente[]
  //   >;
  // }

  // ✅ Adicionar tarefa
  async addTarefa(tarefa: Tarefa) {
    const tarefasRef = collection(this.firestore, 'tarefas');
    const docRef = await addDoc(tarefasRef, tarefa);

    // ➡️ Atualiza o documento adicionando o ID dentro dele:
    await setDoc(docRef, { ...tarefa, id: docRef.id }, { merge: true });

    return docRef;
  }

  // ✅ Listar tarefas
  getTarefas(): Observable<Tarefa[]> {
    const tarefasRef = collection(this.firestore, 'tarefas');
    return collectionData(tarefasRef, { idField: 'id' }) as Observable<
      Tarefa[]
    >;
  }

  async updateTarefa(id: string, tarefa: Partial<Tarefa>) {
    const tarefaDocRef = doc(this.firestore, 'tarefas', id);
    return updateDoc(tarefaDocRef, tarefa);
  }

  async deleteTarefa(id: string) {
    const tarefaDocRef = doc(this.firestore, 'tarefas', id);
    return deleteDoc(tarefaDocRef);
  }
}
