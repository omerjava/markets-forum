import { ForumThread } from "./forum-thread";

export interface Tag {
    id: number;
    name: string;
    threads?: ForumThread[];
}

