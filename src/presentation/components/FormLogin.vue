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
                    class="input focus:outline-none w-full bg-white/5 text-xs"
                >
                <input 
                    v-model="authForm.password"
                    type="password"
                    placeholder="Contraseña"
                    class="input focus:outline-none w-full bg-white/5 text-xs"
                >
                <button 
                    type="submit"
                    class="btn bg-blue-500 w-full text-white mt-2 hover:bg-blue-600"
                >
                    Entrar
                </button>
                <div class="divider text-lg font-bold text-gray-300" >o</div>
                <!-- loggin google -->
                <button 
                    @click="LoginGoogleAccion"
                    class="bg-black w-full flex items-center justify-center px-4 py-2 text-sm rounded outline-none border-none cursor-pointer text-[#0095f6] hover:font-medium"
                >
                    <img :src="GoogleIcon" alt="google-icon" class="w-7 h-7 mr-2">
                    Iniciar sesión con Google
                </button>

                <a 
                    href="https://www.instagram.com/accounts/password/reset/"
                    class="text-sm text-white"
                >
                    ¿Has olvidado tu contraseña?
                </a>

            </form>
            <div class="mt-12 text-center text-sm">
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