<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user.store'

const router = useRouter();

const userStore = useUserStore()
const authStore = useAuthStore()

const imageError = ref(false)
const imageLoaded = ref(false)

const user = computed(() => userStore.getUser)

const logout = async () => {
    await authStore.Logout();
    router.replace('/Login')
}

const getUserName = computed(() => {
    return user.value?.displayName || 'Mi perfil'
})

const handleImageError = () => {
    imageError.value = true
    imageLoaded.value = true
}

const handleImageLoaded = () => {
    imageLoaded.value = true
}


</script>

<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Instagram</a>
        </div>
        <div class="flex gap-2" v-if="user">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div v-if="!imageLoaded">
                        <img 
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                            alt="Tailwind CSS Navbar component" 
                            class="w-10 rounded-full"
                        />
                    </div>
                    <div 
                        class="w-10 rounded-full" 
                    >
                        <img 
                            v-if="user?.photoURL"
                            :src="user?.photoURL"
                            @error="handleImageError"
                            @load="handleImageLoaded"
                        />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <a class="justify-between">
                            {{ getUserName }}
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a @click="logout" >Logout</a></li>
                </ul>
            </div>
        </div>
        <div v-else>
            <div>
                <RouterLink to="/login">
                    <button class="btn btn-primary">Login</button>
                </RouterLink>
                <RouterLink to="/register">
                    <button class="btn btn-primary">Register</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>