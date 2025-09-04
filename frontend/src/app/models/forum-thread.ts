import { UserProfile } from "./user-profile";
import { Category } from "./category";
import { Post } from "./post";
import { Tag } from "./tag";

export interface ForumThread {
    id: number;
    title: string;
    content: string;
    createdAt?: string;
    user?: UserProfile;
    category?: Category;
    posts?: Post[];
    tags?: Tag[];
}

