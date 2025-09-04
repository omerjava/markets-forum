import { UserProfile } from "./user-profile";
import { ForumThread } from "./forum-thread";
import { Like } from "./like";
import { Attachment } from "./attachment";

export interface Post {
    id: number;
    content: string;
    createdAt?: string;
    user?: UserProfile;
    thread?: ForumThread;
    likes?: Like[];
    attachments?: Attachment[];
}

