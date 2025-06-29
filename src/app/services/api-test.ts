import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

export interface Post{
  userId:number,
  id?:number,
  title: string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiTest {
  private readonly API = 'https://jsonplaceholder.typicode.com/posts';
  constructor(
    private http: HttpClient
  ) { }

  getPosts():Observable<Post[]>
  {
    return this.http.get<Post[]>(this.API)
  }

  getPost(id:number):Observable<Post>{
    return this.http.get<Post>(`${this.API}/${id}`)
  }

  createPost(post: Post):Observable<Post>
  {
    return this.http.post<Post>(this.API, post)
  }

  updatePost(post: Post):Observable<Post>
  {
    return this.http.put<Post>(`${this.API}/${post.id}`, post)
  }

  deletePost(id:number){
    return this.http.delete(`${this.API}/${id}`)
  }

}

