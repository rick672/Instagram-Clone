import { AuthModel } from '@/database/auth/auth.model'
import { AuthService } from '@/services/authService'
import type { UserCredential } from 'firebase/auth'

export class RegisterUseCases {
    static execute(email: string, password: string, name: string): Promise<UserCredential | undefined> {
        return new AuthService(new AuthModel()).registerEmailPassword(email, password, name)
    }
}