import { AuthModel } from '@/database/auth/auth.model'
import { AuthService } from '@/services/authService'

export class LogoutUseCases {
    static execute() {
        try {
            return new AuthService(new AuthModel()).signOut()
        } catch (error) {
            console.log(error)
        }
    }
}