import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text" class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #Tag

  >`,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('Tag')
  public TagChild!: ElementRef<HTMLInputElement>;



  constructor(private gifsService:GifsService){

  }

  searchTag(){
    const newTag = this.TagChild.nativeElement.value;
    if( !(newTag==='') ){

      this.gifsService.searchTag(newTag);

    }
    this.TagChild.nativeElement.value = '';
  }




}
