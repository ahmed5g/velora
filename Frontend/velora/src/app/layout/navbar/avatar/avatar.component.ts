import {Component, input, InputFunction, InputSignal} from '@angular/core';
import {NgClass} from '@angular/common';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-avatar',
  imports: [
    NgClass,
    FontAwesomeModule
  ],
  templateUrl: './avatar.component.html',
  standalone: true,
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {


  imageUrl= input<string>();
  avatarSize= input<'avatar-sm'| "avatar-xl">
}
