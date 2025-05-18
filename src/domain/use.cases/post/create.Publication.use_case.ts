import type { PostEntity } from "@/domain/entities/post.entity";
import { PostService } from "@/services/postService";
import { PostModel } from "@/database/posts/post.model";

export class CreatePublicationUseCase {

    static async execute(post: PostEntity): Promise<PostEntity> {
        return new PostService(new PostModel()).create(post)
    }
}