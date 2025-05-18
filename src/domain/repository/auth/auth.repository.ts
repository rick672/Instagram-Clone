import type { UserCredential } from 'firebase/auth'

export abstract class AuthRepository {
    abstract signInEmailPassword(email: string, password: string): Promise<UserCredential>
    abstract signInWithGoogle(): Promise<UserCredential>
    abstract signOut(): Promise<void>
    abstract registerEmailPassword(email: string, password: string): Promise<UserCredential>
}