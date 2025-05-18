<script setup lang="ts">
import GoogleIcon from '../assets/img/Google-icon.webp';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const {
    authForm,
    resetAuthForm,
    LoginEmailPassword,
    LoginGoogle,
    Register,
    Logout
} = useAuthStore();

const Login = async () => {
    const user = await LoginEmailPassword();
    console.log(user)
    if (user) {
        router.replace('/')
        return
    }
    return router.replace('/Login')
}
const LoginGoogleAccion = async () => {
    const user = await LoginGoogle();
    console.log(user)
    if (user) {
        router.replace('/')
        return
    }
    return router.replace('/Login')
}

onMounted(() => {
    resetAuthForm();
})


defineOptions({
    name: 'form-login'
})

</script>



<template>
    <div 
        class="flex flex-col items-center justify-center min-h-screen"
    >
        <div 
            class="card w-85 bg-black border border-white/30 shadow-xl p-8 rounded-none"
        >
            <div class="flex justify-center">
                <i 
                    class=" my-6 "
                    style="
                        background-image: url(&quot;https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png&quot;); 
                        background-position: 0px 0px; 
                        background-size: auto; width: 175px; 
                        height: 51px; 
                        background-repeat: no-repeat; 
                        display: inline-block;"
                >
                </i>
            </div>
                
            <form class="space-y-2 text-center" @submit.prevent="Login">
                <input 
                    v-model="authForm.email"
                    type="text"
                    placeholder="Telefono, usuario o correo electrónico"
                    class="input input-bordered w-full bg-white/5 focus:ring-2 focus-ring-blue-500  text-xs"
                >
                <input 
                    v-model="authForm.password"
                    type="password"
                    placeholder="Contraseña"
                    class="input input-bordered w-full bg-white/5 focus:ring-2 focus-ring-blue-500  text-xs"
                >
                <button 
                    type="submit"
                    class="btn btn-primary w-full text-white hover:bg-base-300 mt-2"
                >
                    Login
                </button>
                <div class="divider text-lg font-bold text-gray-300" >o</div>
                <!-- loggin google -->
                <button 
                    @click="LoginGoogleAccion"
                    class="btn btn-outline w-full"
                >
                    <img :src="GoogleIcon" alt="google-icon" class="w-6 h-6 mr-2">
                    Iniciar sesión con Google
                </button>

                <a 
                    href="#"
                    class="text-sm text-white"
                >
                    ¿Has olvidado tu contraseña?
                </a>

            </form>
            <div class="mt-8 text-center text-sm">
                <p>¿No tienes cuenta?
                    <RouterLink 
                        to="/register"
                        class="text-[#0095f6] font-semibold "
                    >
                        Regístrate
                    </RouterLink>
                </p>
            </div>

        </div>

    </div>

</template>