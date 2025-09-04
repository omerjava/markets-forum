import { UserProfile } from "./user-profile";
import { Post } from "./post";

export interface Like {
    id: number;
    user?: UserProfile;
    post?: Post;
}
