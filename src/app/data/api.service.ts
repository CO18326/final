import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postdata(data:any){
    return this.http.post<any>('https://fake-server-json-jw.herokuapp.com/posts',data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getdata(){
    return this.http.get<any>('https://fake-server-json-jw.herokuapp.com/posts').pipe(map((res:any)=>{
      return res;
    }))
  }

  updatedata(data:any,id:number){
    return this.http.put<any>('https://fake-server-json-jw.herokuapp.com/posts/'+id,data).pipe(map((res:any)=>{
    return res;
    }))
  }

  deletedata(id:number){
    return this.http.delete<any>('https://fake-server-json-jw.herokuapp.com/posts/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}
