import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  id: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Fundamentos de Programação', description: "Usando JavaScript para explorar a sintaxe central de uma linguagem de programação, aprenda a escrever e executar sua primeira aplicação e entenda o que ..." },
  { id: 2, name: 'Programação Paralela', description: "O modelo de programação paralela é um conjunto de tecnologias de software para expressar algoritmos paralelos e criar aplicações compatíveis com sistemas ..." },
  { id: 3, name: 'Ética e cidadania', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
  { id: 4, name: 'Humanismo e cultura religiosa', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
  { id: 5, name: 'Fundamentos de programação', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[]
  dataSource: {}[]

  constructor() {
    this.displayedColumns = ['id', 'name', 'description'];
    this.dataSource = ELEMENT_DATA;
  }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'description'];
    this.dataSource = ELEMENT_DATA;
  }
}
