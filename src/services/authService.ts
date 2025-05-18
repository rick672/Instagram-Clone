import { AuthRepository } from '../domain/repository/auth/auth.repository'
import { UserModel } from '@/database/user/user.model'
import { updateProfile } from 'firebase/auth'

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    // Email Login
    public async signInEmailPassword(email: string, password: string) {
        console.log('Email', email, 'Password', password)
        try {
            const user = await this.authRepository.signInEmailPassword(email, password)
            const userModel = new UserModel(user.user)
            await userModel.createUser(user.user)
            return user
            
        } catch (error) {
            console.error('Error al iniciar sesión con email y password', error)
        }
    }
    public async registerEmailPassword(email: string, password: string, name: string) {
        console.log('Register Email', email, 'Password', password)
        try {
            const userCredential = await this.authRepository.registerEmailPassword(email, password)

            // Aqui pondemos al usuario en la base de datos
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: '' // o una URL por defecto
            })


            const userModel = new UserModel(userCredential.user)
            await userModel.createUser(userCredential.user)
            return userCredential
        } catch (error) {
            console.error('Error al registrar usuario con email y password', error)
        }
    }
    public signOut() {
        console.log('Sign Out')
        return this.authRepository.signOut()
    }

    // Google Login
    public async signInWithGoogle() {
        console.log('Sign In With Google')
        try {
            const userCredential = await this.authRepository.signInWithGoogle()
            const userModel = new UserModel(userCredential.user)
            await userModel.createUser(userCredential.user)
            return userCredential
        } catch (error) {
            console.error('Error al iniciar sesión con google', error)
        }
    }
}