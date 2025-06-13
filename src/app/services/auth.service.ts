import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioLogado$ = new BehaviorSubject<User | null>(null);
  private perfilUsuario: any = null; // você pode depois tipar com uma interface

  // injete o Firestore
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const docRef = doc(this.firestore, 'usuarios', user.uid);
        const snap = await getDoc(docRef);
        this.usuarioLogado$.next(snap.exists() ? (snap.data() as any) : null);
      } else {
        this.usuarioLogado$.next(null);
      }
    });
  }

  // Login padrão + carregamento do perfil do Firestore
  async login(email: string, senha: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        senha
      );
      await this.carregarPerfil(userCredential.user.uid);
      return userCredential;
    } catch (error: any) {
      if (error.code === 'auth/visibility-check-was-unavailable') {
        console.warn(
          '⚠️ Erro de visibilidade detectado. Tentando novamente...'
        );
        // Retry uma única vez
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          email,
          senha
        );
        await this.carregarPerfil(userCredential.user.uid);
        return userCredential;
      } else {
        console.error('❌ Erro ao fazer login:', error);
        throw error;
      }
    }
  }
  // async login(email: string, senha: string) {
  //   const userCredential = await signInWithEmailAndPassword(
  //     this.auth,
  //     email,
  //     senha
  //   );
  //   const uid = userCredential.user.uid;
  //   await this.carregarPerfil(uid); // Garante que o perfil esteja carregado
  //   return userCredential;
  // }

  // Método privado que busca o perfil do Firestore
  private async carregarPerfil(uid: string) {
    const ref = doc(this.firestore, 'usuarios', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      this.perfilUsuario = snap.data();
      console.log('✅ Perfil carregado:', this.perfilUsuario);
    } else {
      console.warn(
        '⚠️ Usuário autenticado, mas perfil não encontrado no Firestore'
      );
    }
  }

  // Logout e redirecionamento
  logout() {
    this.perfilUsuario = null;
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  getUsuarioAtual() {
    return this.usuarioLogado$.asObservable();
  }

  estaLogado() {
    return this.usuarioLogado$.value !== null;
  }

  getPerfilUsuario() {
    return this.perfilUsuario;
  }

  async cadastrar(email: string, senha: string, dadosExtras: any) {
    const credencial = await createUserWithEmailAndPassword(
      this.auth,
      email,
      senha
    );
    const uid = credencial.user.uid;

    // 🔥 Salva os dados extras no Firestore, em `/usuarios/{uid}`
    const ref = doc(this.firestore, 'usuarios', uid);
    await setDoc(ref, {
      uid,
      email,
      ...dadosExtras, // exemplo: nome, perfil, etc.
    });

    return credencial;
  }
}
