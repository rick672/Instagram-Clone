<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const { authForm, resetAuthForm, Register } = useAuthStore();

const handleRegister = async () => {
    const userCredential = await Register();
    if (userCredential) {
        router.replace('/login');
    }
}

defineOptions({
    name: 'register-view'
})

</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-black">
        <div class="w-88 shadow-xl m-3 pb-8 border border-white/30 bg-black">
            <div class="text-center p-8">
                <div class="flex justify-center">
                    <i 
                        class=" my-2"
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
                <p class="text-[#a8a8a8] font-medium text-md ">Regístrate para ver fotos y vídeos de tus amigos.</p>
                <div class="divider text-lg font-bold text-gray-300" >o</div>
                
            </div>
            <div class="px-10">
                <form 
                    class="space-y-2 text-center" 
                    @submit.prevent="handleRegister"
                >
                    <input
                        v-model="authForm.name"
                        type="text" 
                        placeholder="Nombre de Usuario" 
                        class="input input-bordered  w-full bg-white/5 text-xs focus:outline-none"
                    />
                    <input 
                        v-model="authForm.email"
                        type="text" 
                        placeholder="Número de movil o correo electrónico"
                        class="input input-bordered w-full bg-white/5 text-xs focus:outline-none"
                    >
                    <input 
                        v-model="authForm.password"
                        type="password" 
                        placeholder="Contraseña" 
                        class="input input-bordered w-full bg-white/5 text-xs focus:outline-none"
                    >
                    <input 
                        v-model="authForm.confirmPassword"
                        type="password" 
                        placeholder="Confirmar contraseña" class="input input-bordered w-full bg-white/5 text-xs focus:outline-none"
                    >
                    <button 
                        type="submit" 
                        class="btn btn-primary w-full text-white hover:bg-base-300 mt-2"
                    >
                        Registrar
                    </button>
                    <p class="text-center text-sm">
                    ¿Ya tienes una cuenta?
                    <RouterLink to="/login" class="text-blue-500 font-semibold">Iniciar sesión</RouterLink>
                </p>
                </form>

            </div>
        </div>
    </div>
</template>