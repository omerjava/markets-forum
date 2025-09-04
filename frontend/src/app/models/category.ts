import { ForumThread } from "./forum-thread";

export interface Category {
    id: number;
    name: string;
    description?: string;
    threads?: ForumThread[];
}
