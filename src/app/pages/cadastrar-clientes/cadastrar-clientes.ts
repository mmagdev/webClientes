import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-clientes.html',
  styleUrl: './cadastrar-clientes.css',
})
export class CadastrarClientes {

  //Inicializando a biblioteca HTTP CLIENT
  private http = inject(HttpClient);

  //Criando a estrutura do formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    cpf : new FormControl('', [Validators.required]),
    telefone : new FormControl('', [Validators.required]),
    dataNascimento : new FormControl('', [Validators.required])
  });

  //Função para realizar o cadastro do cliente
  cadastrarCliente() {
    
    //Fazendo uma requisição HTTP POST para a API
    this.http.post('http://localhost:8081/api/v1/clientes', this.formulario.value,
    {responseType: 'text'}).subscribe((mensagem) => { //Capturando a resposta da API
      alert(mensagem); //Exibindo a mensagem retornada pela API
      this.formulario.reset(); //Limpando o formulário após o cadastro
    });

  };

}
