import { Post } from "./post";

export interface Attachment {
    id: number;
    fileName: string;
    fileUrl: string;
    post?: Post;
}
