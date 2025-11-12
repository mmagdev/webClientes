import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-clientes',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-clientes.html',
  styleUrl: './consultar-clientes.css',
})
export class ConsultarClientes {

  // Delcarar o http client
  private http = inject(HttpClient);

  //Atributo para guardar a lista de clientes obtida da API
  //e posteriormente exibir esses dados na página

  clientes = signal<any[]>([]); //Array de objetos => any[] = indica que é um array de objetos

  //Declarar o formulário
  formulario = new FormGroup({
    nome : new FormControl('',[Validators.required])
  });
  
  //função executada ao clicar em Pesquisar  
  consultarClientes(){
    //Fazendo uma requisição para consultar os clientes na API
    this.http.get('http://localhost:8081/api/v1/clientes?nome='+this.formulario.value.nome)
      .subscribe((clientes) => {//Capturando o retorno da API
         //Guardar os dados dos clientes obtidos
         this.clientes.set(clientes as any[]);
        })
  }

}
