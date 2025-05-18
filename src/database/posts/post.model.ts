import { firestore } from "@/config/firebaseConfig";
import type { PostEntity } from "@/domain/entities/post.entity";
import { PostRepository } from "@/domain/repository/post/post.repository";
import { addDoc, collection, limit, orderBy, query, where, getDocs } from "firebase/firestore";

export class PostModel implements PostRepository {

    async findAll(): Promise<PostEntity[]> {
        const querySnapshot = await getDocs(
            query(
                collection(firestore, 'posts'),
                orderBy('createdAt', 'desc'),
                limit(10),
                where('active', '==', true)
            )
        );
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }) as PostEntity);
    }
    async create(post: PostEntity): Promise<PostEntity> {
        const ref = collection(firestore, 'posts');
        const docRef = await addDoc(ref, post);
        return {
            id: docRef.id,
            ...post,
        } as PostEntity;
    }
}