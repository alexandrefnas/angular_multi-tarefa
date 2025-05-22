import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'ale-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  imports: [ReactiveFormsModule, FormsModule, TableComponent],
})
export class CadastroComponent {
  tamanhosColunas = {
    descricao: '500px',
    dataCadastro: '100px',
    mostrarAcoes: '90px',
  };

  colunasProdutos = ['codigo', 'descricao','descricao2', 'preco', 'dataCadastro'];
  dadosProdutos = [
    {
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },

{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
{
      codigo: 'P001',
      descricao: 'Teclado   Browser application bundle generation complete.',
      descricao2: 'Teclado   Browser application bundle generation complete.',
      preco: 99.9,
      dataCadastro: '2024-01-10',
    },
    {
      codigo: 'P002',
      descricao: 'Mouse',
      descricao2: 'Mouse',
      preco: 49.5,
      dataCadastro: '2024-02-15',
    },
  ];

  formatoProdutos = {
    preco: 'moeda',
    dataCadastro: 'data',
  } as const;

  editarProduto(produto: any) {
    console.log('Editar:', produto);
  }

  excluirProduto(produto: any) {
    console.log('Excluir:', produto);
  }
}
