import { ForumThread } from "./forum-thread";
import { Like } from "./like";
import { Post } from "./post";
import { ProfilePhoto } from "./profile-photo";

export interface UserProfile {
    id: string;               // Keycloak sub
    username: string;
    email: string;
    roles?: string;
    createdAt?: string;
    profilePhoto?: ProfilePhoto

    threads?: ForumThread[];
    posts?: Post[];
    likes?: Like[];
}

