import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

export interface Tarefa {
  id?: string;
  data: string | Date;
  servico: string;
  prioridadeSelecionada: string;
  cliente: string;
  atividade: string;
  obs: string;
  quem: string;
  dataConclusao?: string | Date | null;
  statusSelecionada: string;
  financeiroSelecionada: string;
  valor: string;
  valorNumerico: number;
}

export interface TarefaCount {
  prioridade: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

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
    if (!this.firestore) {
      console.error('Firestore ainda não está pronto!');
      return of([]); // ✅ Retorna array vazio.
    }
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

  getContagemPorPrioridade(): Observable<TarefaCount[]> {
    return this.getTarefas().pipe(
      map((tarefas: Tarefa[]) => {
        const contagem: { [key: string]: number } = {};

        tarefas.forEach((tarefa) => {
          const prioridade = tarefa.prioridadeSelecionada.toLowerCase();
          contagem[prioridade] = (contagem[prioridade] || 0) + 1;
        });

        return Object.keys(contagem).map((key) => ({
          prioridade: key,
          quantidade: contagem[key],
        }));
      })
    );
  }
}
