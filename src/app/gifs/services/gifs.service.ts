import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})



export class GifsService {




  public  gifsList: Gif[] = [];
  private _tagsHistory: string[] = []
  private apikey: string = 'cHR4muvsebp1p2MPJ4DoxRARoXf2XujO';
  private serviceUrl:string = 'http://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.LoadLocalStorage();
   }


  get tagsHistory(){
    return[...this._tagsHistory]
  }




  private organizedHistory( tag:string){

    tag = tag.toLowerCase();
    if( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory
      .filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 12);
    this.saveLocalStorage();


  }
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private LoadLocalStorage(){
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length ===0) return;
    this.firstSearch();
  }

  private firstSearch(){
    this.searchTag(this.tagsHistory[0]);
  }

  async searchTag( tag:string):Promise<void>{
    this.organizedHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{params})
    .subscribe(resp =>{
      this.gifsList = resp.data;
      console.log({gifs : this.gifsList});
    })

  }






}
