<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
// on mount 
import { onMounted } from 'vue'
// current user
import { getCurrentUser } from 'vuefire';
import { useUserStore } from './presentation/stores/user.store'

const router = useRouter()
const userStore = useUserStore()

onMounted( async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
        await userStore.setUser(currentUser)
        router.push('/')
    }
    else {
        userStore.clearUser()
        router.push('/login')
    }
})




</script>

<template>

    <div>
        <RouterView />
    </div>

</template>
