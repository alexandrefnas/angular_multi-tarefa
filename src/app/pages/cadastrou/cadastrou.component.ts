import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ale-cadastrou',
  imports: [FormsModule],
  templateUrl: './cadastrou.component.html',
  styleUrls: ['./cadastrou.component.css'],
})
export class CadastrouComponent {
  nome = '';
  email = '';
  senha = '';
  perfil = 'usuario';
  carregando = false;

  constructor(private auth: AuthService) {}

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    this.carregando = true;

    try {
      await this.auth.cadastrar(this.email, this.senha, {
        nome: this.nome,
        perfil: this.perfil,
      });
      alert('Usuário cadastrado com sucesso!');
      this.nome = '';
      this.email = '';
      this.senha = '';
      this.perfil = 'usuario';
    } catch (erro) {
      console.error(erro);
      alert('Erro ao cadastrar: ' + (erro as any).message);
    } finally {
      this.carregando = false;
    }
  }
}
