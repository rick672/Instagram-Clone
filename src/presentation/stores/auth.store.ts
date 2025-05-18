import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { LoginEmailPasswordUseCases } from '@/domain/use.cases/auth/loginEmailPassword.use_cases'
import { RegisterUseCases } from '@/domain/use.cases/auth/register.use_cases'
import { LogoutUseCases } from '@/domain/use.cases/auth/logout.use_cases'
import { LoginGoogleUseCases } from '@/domain/use.cases/auth/loginGoogle.use_cases'
import { verifyPassword } from '@/helpers/verifyPassword'
import { useUserStore } from './user.store'

const AuthFormInitialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const useAuthStore = defineStore('auth', () => {
    const authForm = reactive(AuthFormInitialState)
    const userStore = useUserStore()

    // reset form
    const resetAuthForm = () => {
        authForm.name = AuthFormInitialState.name
        authForm.email = AuthFormInitialState.email
        authForm.password = AuthFormInitialState.password
        authForm.confirmPassword = AuthFormInitialState.confirmPassword
    }

    const LoginEmailPassword = async () => {
        try {
            const userCredential = await LoginEmailPasswordUseCases.execute(authForm.email, authForm.password)
            resetAuthForm()
            if (!userCredential) {
                throw new Error('Error al iniciar sesión')
            }
            await userStore.setUser(userCredential.user)
            return userCredential


        } catch (error) {
            console.log(error)
            resetAuthForm()
        }
    }

    const LoginGoogle = async () => {
        try {
            const userCredential = await LoginGoogleUseCases.execute()
            resetAuthForm()
            if (!userCredential) {
                throw new Error('Error al iniciar sesión')
            }
            await userStore.setUser(userCredential.user)
            return userCredential
        } catch (error) {
            console.log(error)
            resetAuthForm()
        }
    }

    const Logout = async () => {
        try {
            await LogoutUseCases.execute()
            userStore.clearUser()
            // resetAuthForm()
        } catch (error) {
            console.log(error)
            resetAuthForm()
        }
    }

    const Register = async () => {
        try {
            if (!verifyPassword(authForm.password, authForm.confirmPassword)) {
                alert('Las contraseñas no coinciden')
                throw new Error('Las contraseñas no coinciden')
            }

            const userCredential = await RegisterUseCases.execute(
                authForm.email, 
                authForm.password,
                authForm.name
            )
            resetAuthForm()
            if (!userCredential) {
                throw new Error('Error al registrar')
            }
            await userStore.setUser(userCredential.user)
            return userCredential

        } catch (error) {
            console.log(error)
            resetAuthForm()
        }
    }

    return {
        authForm,
        resetAuthForm,
        LoginEmailPassword,
        LoginGoogle,
        Logout,
        Register
    }


})