import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_models/pagination';
import { ListParams } from '../_models/listParam';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent  implements OnInit {
  members: Member[] | undefined
  predicate = 'liked'
  pageNumber = 1
  pageSize = 5
  pagination: Pagination | undefined 
  constructor(private memberService: MembersService) { }
  loadLikes() {
    const listParams : ListParams ={
      pageNumber : this.pageNumber,
      pageSize : this.pageSize,
      predicate : this.predicate
    }
    this.memberService.getLikes(listParams).subscribe({
      next: reponse => {
        this.members = reponse.result
        this.pagination = reponse.pagination
      }
    })
  }
  ngOnInit(): void {
    this.loadLikes()
  }
  pageChanged(event: any) {
    if (this.pageNumber === event.page) return
    this.pageNumber = event.page
    this.loadLikes()
  }
}
