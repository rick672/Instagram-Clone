import type { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";

export interface PostEntity {
    uid: string;
    id?: string;
    active: boolean;
    img?: string;
    createdAt: Date | Timestamp | DateTime | string;
    description?: string;
    likes?: number;
    comments?: number;
}

export interface PostsEntity {
    posts: PostEntity[];
}