import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { PokedexService } from 'src/app/services/pokedex.service';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{
  public pokemon: any 
  public id: string= this.activateRoute.snapshot.paramMap.get('id')!
  constructor(private activateRoute: ActivatedRoute, private pokedexService : PokedexService){}

ngOnInit(){

  this.pokedexService.getPokedexes("https://pokeapi.co/api/v2/pokemon/"+this.id+"/").subscribe({next:(response)=>{
  this.pokemon = response
  console.log(this.pokemon)
   
  },
  error:(error)=>{ 
  }})

}
}
