import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { ForumThread } from '../../models/forum-thread';

@Component({
  selector: 'app-forum-thread',
  imports: [PostComponent],
  templateUrl: './forum-thread.component.html',
  styleUrl: './forum-thread.component.css'
})
export class ForumThreadComponent {
  @Input() thread!: ForumThread;

}
