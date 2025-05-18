import type { PostEntity } from "@/domain/entities/post.entity";
import { PostRepository } from "@/domain/repository/post/post.repository";

export class PostService {
    
    //inyeccion de dependencias
    constructor(private readonly postRepository: PostRepository) {}

    //? find all posts
    public async findAll(): Promise<PostEntity[]> {
        return this.postRepository.findAll()
    }

    //? create post
    public async create(post: PostEntity): Promise<PostEntity> {
        return this.postRepository.create(post)
    }
}