import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type UserCredential,
} from 'firebase/auth'
import { AuthRepository } from '@/domain/repository/auth/auth.repository'
import { auth, googleProvider } from '@/config/firebaseConfig'

export class AuthModel implements AuthRepository {
    async signInEmailPassword(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    async signInWithGoogle(): Promise<UserCredential> {
        return await signInWithPopup(auth, googleProvider)
    }

    async signOut(): Promise<void> {
        return await signOut(auth)
    }

    
    async registerEmailPassword(email: string, password: string): Promise<UserCredential> {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
    // async getCurrentUser(): Promise<User | null> {
    //     return await auth.currentUser
    // }
}