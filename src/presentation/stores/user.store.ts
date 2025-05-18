import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'
import { UserModel } from '@/database/user/user.model'
import { updateProfile } from 'firebase/auth'

interface UserState {
    currentUser: User | null
    isLoading: boolean
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        currentUser: null,
        isLoading: false,
    }),

    getters: {
        getUser: (state) => {
            console.log('Current User', state.currentUser)
            return state.currentUser
        },
        getUserPhotoURL: (state) => {
            console.log('Photo URL', state.currentUser?.photoURL)
            return state.currentUser?.photoURL
        },
        getUserDisplayName: (state) => {
            console.log('User Display Name', state.currentUser?.displayName)
            return state.currentUser?.displayName
        },
        getUserEmail: (state) => {
            console.log('User Email', state.currentUser?.email)
            return state.currentUser?.email
        },
        getUserUid: (state) => {
            console.log('User UID', state.currentUser?.uid)
            return state.currentUser?.uid
        },
        getIsLoading: (state) => state.isLoading,
    },

    actions: {
        async setUser(user: User) {
            console.log('setUser', user)
            this.isLoading = true
            try {
                this.currentUser = user
                this.isLoading = false

                const userModel = new UserModel(user)
                await userModel.createUser(user)
                this.currentUser = {...user}
                console.log('Usuario actualizado', this.currentUser)
            } catch (error) {
                console.error('Error al actualizar usuario', error)
                this.isLoading = false
            }            
        },
        clearUser() {
            this.currentUser = null
            this.isLoading = false
        },

        async updateUserProfile(displayName?: string, photoURL?: string) {
            if (!this.currentUser) {
                console.log('No hay usuario actualmente')
                return
            }

            console.log('Actualizar user profile', displayName, photoURL)
            this.isLoading = true
            try {
                await updateProfile(this.currentUser, {
                    displayName,
                    photoURL,
                })
                console.log('Usuario actualizado', this.currentUser)
                
            } catch (error) {
                console.error('Error al actualizar usuario', error)
                this.isLoading = false
            } finally {
                this.isLoading = false
            }
        }
    },
})