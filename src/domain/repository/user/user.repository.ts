import  type { User } from "firebase/auth";

export abstract class UserRepository {
    abstract createUser(user: User): void;

    abstract getUser(uid: string): Promise<User | null>;
}