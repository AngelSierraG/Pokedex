
import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PokedexService } from 'src/app/services/pokedex.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';


export interface PokedexTable {
  name: string
  url: number
 
}

export interface PokedexF {
  name: string
 
}

var pokedexes: PokedexTable[] = []

var next :string 
var previous: string

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,RouterModule, MatExpansionModule, CommonModule],
})
export class PokedexComponent implements OnInit{
  displayedColumns: string[] = ['name', 'url'];
  dataSource : any ; 
  panelOpenState = false;
  pokedexF: PokedexF[] = []
  
  constructor(private pokedexService : PokedexService){}
  
    ngOnInit(): void {
    this.getPokedexes() 
    if(localStorage.getItem("pokedexF") != null)
    {
    this.pokedexF = JSON.parse(localStorage["pokedexF"])
    }
   
    console.log(this.pokedexF)
    }
    
  getPokedexes(){

    this.pokedexService.getPokedexes("https://pokeapi.co/api/v2/pokemon?limit=100").subscribe({next:(response)=>{
      console.log(response)
      pokedexes = response.results
      next = response.next
      previous = response.previous
      console.log(pokedexes)
      this.dataSource =new MatTableDataSource(pokedexes)
    },
    error:(error)=>{ 
    }})
 }  
 
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

 next(){
  this.pokedexService.getPokedexes(next).subscribe({next:(response)=>{
    console.log(response)
    pokedexes = response.results
    next = response.next
    previous = response.previous
    console.log(pokedexes)
    this.dataSource =new MatTableDataSource(pokedexes)
  },
  error:(error)=>{ 
  }})
 }

 previous(){
  this.pokedexService.getPokedexes(previous).subscribe({next:(response)=>{
    console.log(response)
    pokedexes = response.results
    next = response.next
    previous = response.previous
    console.log(pokedexes)
    this.dataSource =new MatTableDataSource(pokedexes)
  },
  error:(error)=>{ 
  }})
 }

addFav(newFav : string){
  let m =this.pokedexF.find((element) => element.name == newFav)
  if(m?.name != newFav){
    this.pokedexF.push({"name": newFav})
  localStorage.setItem("pokedexF", JSON.stringify(this.pokedexF));

  console.log(localStorage.getItem('pokedexF'))
  }
  
}

} 

