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
    <div class="flex justify-center items-center min-h-screen bg-black p-6">
        <div class="w-88 shadow-xl m-3 pb-8 border border-none bg-black">
            <div class="text-center pt-8 px-8 pb-2 ">
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
                <!-- Iniciar sesion con facebook -->
                <button 
                    class="bg-blue-500 w-full flex items-center justify-center px-4 py-2 mt-4 text-sm rounded outline-none border-none cursor-pointer text-white hover:bg-blue-600"
                >
                    <span 
                        src="" 
                        style="
                            background-repeat: no-repeat;
                            background-position: -414px -300px;
                            height: 16px;
                            width: 16px;
                            background-image: url(https://static.cdninstagram.com/rsrc.php/v4/y5/r/TJztmXpWTmS.png);
                        "
                        alt="facebook-icon" class="w-7 h-7 mr-2">
                    </span>
                    Iniciar sesión con Facebook
                </button>
                <div class="divider text-lg font-bold text-gray-300" >o</div>
                
            </div>
            <div class="px-8">
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
                    
                    <p class="text-center text-xs m-2 text-gray-400">
                        Es posible que los usuarios de nuestro servicio hayan subido tu información de contacto en Instagram. <a href="#" class="text-blue-400">Más información</a>
                    </p>
                    <p class="text-center text-xs m-2 text-gray-400">
                        Al registrarte, aceptas nuestras <a href="#" class="text-blue-400">Condiciones</a>, nuestra <a href="#"class="text-blue-400" >Política de privacidad</a> y nuestra <a href="#" class="text-blue-400">Política de cookies</a>.
                    </p>
                    <button 
                        type="submit" 
                        class="btn bg-blue-500 hover:bg-blue-600 w-full text-white mt-2"
                    >
                        Registrar
                    </button>
                    <p class="text-center text-sm mt-6">
                        ¿Ya tienes una cuenta? <br>
                        <RouterLink to="/login" class="text-blue-400 font-semibold">Entrar</RouterLink>
                    </p>
                </form>

            </div>
        </div>
    </div>
</template>