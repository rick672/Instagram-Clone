<script setup lang="ts">
import FormLogin from './FormLogin.vue';
import screenLogin1 from '../assets/img/screenLogin1.png';
import screenLogin2 from '../assets/img/screenLogin2.png';
import screenLogin3 from '../assets/img/screenLogin3.png';
import { ref, onMounted } from 'vue';

const images = [screenLogin1, screenLogin2, screenLogin3];
const currentImageIndex = ref(0);

// Cambia la imagen cada 3 segundos (ajusta el tiempo si quieres)
onMounted(() => {
    setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    }, 5000);
});

defineOptions({
    name: 'login-component'
})

</script>

<template>
    <div class="min-h-screen bg-black pt-10 pb-12">
        <div class="container max-w-screen flex items-center justify-center">
            <!-- Sección de teléfonos - Se oculta en móviles -->
            <div class="hidden lg:block relative">
                <!-- fondo  -->
                <img src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk"
                    alt="phones" class="" />

                <!-- Carrusel de imágenes (absolute para posicionar sobre el mockup) -->
                <div class="absolute top-[4%] left-[10%] w-[100%] h-[85%] overflow-hidden">
                    <div v-for="(image, index) in images" :key="index"
                        class="absolute inset-0 transition-opacity duration-3000"
                        :class="{ 'opacity-100': index === currentImageIndex, 'opacity-0': index !== currentImageIndex }">
                        <img :src="image" :alt="`Pantalla ${index + 1}`" class="w-full h-full object-contain" />
                    </div>
                </div>


            </div>

            <!-- Formulario de login -->
            <FormLogin />

        </div>
        <!-- Footer -->
        <div class="bg-[#000] py-6 px-4">
            <div class="max-w-6xl mx-auto">
                <!-- Menú de enlaces - Responsive con flex-wrap -->
                <ul class="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400 mb-4">
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Meta</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Información</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Blog</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Empleo</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Ayuda</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">API</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Privacidad</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Condiciones</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Ubicaciones</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Acerca de Instagram</li>
                    <li class="hover:text-gray-800 transition-colors cursor-pointer">Instagram</li>
                </ul>

                <!-- Copyright - Centrado y con mejor jerarquía -->
                <div class="text-center">
                    <p class="text-xs md:text-sm text-gray-400 mt-2">
                        © 2025 Instagram from <span class="font-medium text-gray-600">Meta</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>