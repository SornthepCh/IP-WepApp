import { Component, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { faUser ,faEnvelope,faHeart} from '@fortawesome/free-regular-svg-icons'
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from 'src/app/_services/presence.service';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  faUser = faUser;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  @Input() member: Member | undefined;

  constructor(public presenceService:PresenceService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: (_) => this.toastr.success(`You have liked ${member.userName}`),
    });
  }
}