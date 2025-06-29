import { 
  TestBed
 } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

import { ApiTest, Post } from './api-test';

describe('APITest (HTTP)', () => {
  const API = 'https://jsonplaceholder.typicode.com/posts';
  let service: ApiTest
  let httpMock: HttpTestingController

  beforeEach(()=>{

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiTest]
    })

    service = TestBed.inject(ApiTest)
    httpMock = TestBed.inject(HttpTestingController)

  })

  it('deve buscar todos os posts via GET', () => {
    //dados simulados
    const mockPosts: Post[] = [
      {userId: 1, id: 1, title: 'A', body: 'Texto A'},
      {userId: 2, id: 2, title: 'B', body: 'Texto B'}
    ]

    let result: Post[] | undefined
    service.getPosts().subscribe(posts => result = posts)

    //intercepta 1 chamada GET/post
    const req = httpMock.expectOne(API)
    expect(req.request.method).toBe('GET')

    //responde com mockPosts
    req.flush(mockPosts)
    expect(result).toEqual(mockPosts)

  })

  it('deve buscar um post por ID', ()=>{
    const mockPost: Post = {userId: 1, id: 10, title: 'X', body: 'Texto X'}
    let result: Post | undefined
    service.getPost(10).subscribe(post => result = post)

    const req = httpMock.expectOne(`${API}/10`)
    expect(req.request.method).toBe('GET')

    req.flush(mockPost)
    expect(result).toEqual(mockPost)
  })

  it('deve criar um novo post via POST', ()=>{
    const newPost: Post = {userId: 3, title: 'Novo', body: 'Corpo'}
    const savedPost:Post = {...newPost, id: 101}
    
    let result: Post | undefined
    service.createPost(newPost).subscribe(post => result = post)

    const req = httpMock.expectOne(API)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(newPost)

    req.flush(savedPost)
    expect(result).toEqual(savedPost)
  })

  it('deve atualizar e um post via PUT', () => {
    const updated: Post = {userId: 1, id: 5, title: 'Atualizado', body: 'Novo corpo'}
    let result: Post | undefined

    service.updatePost(updated).subscribe(post => result = post)

    const req = httpMock.expectOne(`${API}/5`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual(updated)

    req.flush(updated)
    expect(result).toEqual(updated)
  })

  it('deve deletar um post via DELETE', () => {
    let response:any 
    service.deletePost(7).subscribe(res => response = res)

    const req = httpMock.expectOne(`${API}/7`)
    expect(req.request.method).toBe('DELETE')

    //resposta vazia
    req.flush(null)
    expect(response).toBeNull()
  })

  it('deve tratar erro 404 no getPosts', () => {
    let errorResponse:any 
    service.getPosts().subscribe({
      next: () => fail('esperava erro 404'),
      error: err => errorResponse = err
    })

    const req = httpMock.expectOne(API)
    req.flush('Não encontrado', {
      status: 404,
      statusText: 'Not found'
    })

    expect(errorResponse.status).toBe(404)

  })

  afterEach(()=>{
    httpMock.verify()
  })

})
