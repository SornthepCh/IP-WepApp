import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { of, map, take } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';
import { ListParams } from '../_models/listParam';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
 // paginationResult: PaginationResult<Member[]> = new PaginationResult<Member[]> 
  baseUrl = environment.apiUrl
  members: Member[] = [] 
  memberCache = new Map()
  //userParams: UserParams | undefined
  user: User | undefined

   constructor( private http: HttpClient) { //private accountService:AccountService,
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => {
    //     if (user) {
    //       //this.userParams = new UserParams(user)
    //       this.user = user
    //     }
    //   }
    // })
  }
  // getUserParams() {
  //   return this.userParams
  // }
  // setUserParams(params: UserParams) {
  //   this.userParams = params
  // }
  // resetUserParams() {
  //   if (!this.user) return
  //   this.userParams = new UserParams(this.user)
  //   return this.userParams
  // }
  private _key(userParams: UserParams) {
    return Object.values(userParams).join('_');
  }
  getMembers(userParams: UserParams) {
    const key = this._key(userParams)
    const response = this.memberCache.get(key) 
    if (response) return of(response)
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    params = params.append('minAge', userParams.minAge)
    params = params.append('maxAge', userParams.maxAge)
    params = params.append('gender', userParams.gender)
    params = params.append('orderBy', userParams.orderBy)
    const url = this.baseUrl + 'users'
    return getPaginationResult<Member[]>(url, params,this.http).pipe(
      map(response => {
          this.memberCache.set(key, response)
          return response
      })
  )
  }
  
  // private getPaginationHeaders(pageNumber: number, pageSize: number) {
  //   let params = new HttpParams()
  //   params = params.append('pageNumber', pageNumber)
  //   params = params.append('pageSize', pageSize)
  //   return params
  // }

  getMember(username: string) {
    const cache = [...this.memberCache.values()]
    const members = cache.reduce((arr, item) => arr.concat(item.result), [])
    const member = members.find((member: Member) => member.userName === username)
    if (member) return of(member)
    return this.http.get<Member>(this.baseUrl + 'users/username/' + username)
  }

  updateProfile(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(_ => {
        const index = this.members.indexOf(member)
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }
  setMainPhoto(photoId: number) {
    const endpoint = this.baseUrl + 'users/set-main-photo/' + photoId
    return this.http.put(endpoint, {})
  }
  deletePhoto(photoId: number) {
    const endpoint = this.baseUrl + 'users/delete-photo/' + photoId
    return this.http.delete(endpoint)
  }
  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(listParams: ListParams) {
    let httpParams = getPaginationHeaders(listParams.pageNumber, listParams.pageSize)
    const url = this.baseUrl + 'likes'
    return getPaginationResult<Member[]>(url, httpParams, this.http)  
  }
}