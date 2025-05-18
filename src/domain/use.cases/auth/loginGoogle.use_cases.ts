import { AuthModel } from '@/database/auth/auth.model'
import { AuthService } from '@/services/authService'


export class LoginGoogleUseCases {
    static execute() {
        return new AuthService(new AuthModel()).signInWithGoogle()
    }
}