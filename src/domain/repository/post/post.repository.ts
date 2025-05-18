import  type { PostEntity } from '@/domain/entities/post.entity'

export abstract class PostRepository {
    abstract findAll(): Promise<PostEntity[]>
    abstract create(post: PostEntity): Promise<PostEntity>
}