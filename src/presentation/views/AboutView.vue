<script setup lang="ts">
import NavBar from '../layout/NavBar.vue'
import { ref, onMounted } from 'vue'
import { CreatePublicationUseCase } from '@/domain/use.cases/post/create.Publication.use_case'
import type { PostEntity } from '@/domain/entities/post.entity'
import { PostService } from '@/services/postService'
import { PostModel } from '@/database/posts/post.model'
import { UploadService } from '@/services/uploadService'
import type { Timestamp } from 'firebase/firestore'

defineOptions({
  name: 'about-view',
})

//? estados
const isModalOpen = ref(false)

//Estado para los post
const posts = ref<PostEntity[]>([])

//estado nuevo post
const newPost = ref<PostEntity>({
  uid: '', //usuario id
  active: true,
  createdAt: new Date(),
  img: '',
  description: '',
})

//estado para img selected
const selectedImg = ref('')
//estado archivo de img seleccionada
const selectedFile = ref<File | null>(null)
//estado de carga
const isLoading = ref(false)
//estado mensaje de error
const errorMessage = ref('')

//? funciones
onMounted(async () => {
  await loadPosts()
})

// cargar posts
const loadPosts = async () => {
  try {
    const postService = new PostService(new PostModel())
    posts.value = await postService.findAll()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

//selecion de archivo
const handleFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]

    //validar si es img
    if (!file.type.startsWith('image/')) {
      errorMessage.value = 'El archivo debe ser una imagen'
      return
    }

    //validar size max 5mb
    if (file.size > 5 * 1024 * 1024) {
      errorMessage.value = 'El archivo debe ser menor a 5MB'
      return
    }

    selectedFile.value = file
    errorMessage.value = ''

    //crear url para preview
    const reader = new FileReader()
    reader.onload = (i) => {
      selectedImg.value = i.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  //limpiar campos
  newPost.value = {
    uid: '',
    active: true,
    createdAt: new Date(),
    img: '',
    description: '',
  }
  selectedFile.value = null
  selectedImg.value = ''
  errorMessage.value = ''
}

//crear post
const createPost = async () => {
  try {
    if (!selectedFile.value || !newPost.value.description) {
      errorMessage.value = 'Todos los campos son requeridos'
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    //subir img a storage
    const imgUrl = await UploadService.uploadImage(selectedFile.value)

    //crear post
    const postData: PostEntity = {
      uid: newPost.value.uid,
      active: newPost.value.active,
      createdAt: new Date(),
      img: imgUrl,
      description: newPost.value.description,
    }

    //crear post en db
    await CreatePublicationUseCase.execute(postData)

    //actualizar lista de posts
    await loadPosts()
    
    //cerrar modal
    closeModal()
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Error al crear la publicación'
  } finally {
    isLoading.value = false
  }
}

//Formato fecha
const formatDate = (date: Date | Timestamp  | string) => {
  if (date instanceof Date) {
    return date.toLocaleDateString()
  }

  //timestamp
  if (date && typeof date === 'object' && 'toDate' in date) {
    return date.toDate().toLocaleDateString()

 
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <NavBar />

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Botón para abrir modal -->
       <div class="text-center">

         <button
           @click="openModal"
           class="mb-8 flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             class="h-6 w-6"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               stroke-linecap="round"
               stroke-linejoin="round"
               stroke-width="2"
               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
             />
           </svg>
           <span>Crear Publicación</span>
         </button>
       </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <!-- Modal content -->
        <div class="relative z-50 bg-white dark:bg-base-100 rounded-lg shadow-xl w-full max-w-2xl mx-4 transform transition-all">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 class="text-lg font-semibold text-primary">Crear Nueva Publicación</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6">
            <!-- Mensaje de error -->
            <p v-if="errorMessage" class="text-red-500 text-sm mb-4">
              {{ errorMessage }}
            </p>

            <!-- Formulario -->
            <div class="space-y-6">
              <!-- Imagen -->
              <div>
                <div
                  v-if="!selectedFile"
                  class="border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-8 text-center hover:bg-gray-50 dark:hover:bg-dark-700 transition cursor-pointer"
                >
                  <label for="img-upload" class="block mb-2 font-medium">Seleccione una imagen</label>
                  <input type="file" id="img-upload" class="hidden" @change="handleFileSelected" />
                  <label for="img-upload" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Haz click para subir una imagen
                      <br />
                      <span class="text-xs">PNG, JPG, GIF, max 5MB</span>
                    </p>
                  </label>
                </div>

                <!-- Vista previa -->
                <div v-if="selectedFile" class="mt-4">
                  <p class="mb-2 font-medium">Vista previa</p>
                  <div class="relative rounded-lg overflow-hidden border dark:border-gray-700">
                    <img
                      :src="selectedImg"
                      alt="vista previa"
                      class="w-full object-cover"
                      style="max-height: 300px"
                    />
                    <button
                      @click="selectedFile = null; selectedImg = ''"
                      class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                    >
                      <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Descripción -->
              <div>
                <label for="description" class="block mb-2 font-medium text-primary">Descripción</label>
                <textarea
                  name="description"
                  id="description"
                  v-model="newPost.description"
                  class="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition"
                  rows="4"
                  placeholder="¿Qué estás pensando?..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-end space-x-3 p-4 border-t dark:border-gray-700">
            <button
              @click="closeModal"
              class="px-4 py-2 text-gray-500 hover:text-gray-700 transition"
              :disabled="isLoading"
            >
              Cancelar
            </button>
            <button
              @click="createPost"
              :disabled="isLoading"
              class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
            >
              <span v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              <span>{{ isLoading ? 'Publicando...' : 'Publicar' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- separador -->
      <div class="flex items-center my-8">
        <div class="flex-grow h-px bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <span class="px-4 text-gray-500 dark:text-gray-400">Publicaciones</span>
        <div class="flex-grow h-px bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      <!-- lista de posts -->
      <div v-if="posts.length > 0" class="space-y-8">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white dark:bg-base-100 rounded-lg shadow-md p-4"
        >
          <!-- cabecera -->
          <div class="p-4 flex items-center border-b dark:border-gray-700">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-r from-primary flex items-center mr-3"
            >
              <span class="text-white font-bold">{{ post.uid.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <p class="font-semibold dark:text-white">Usuario</p>
              <p class="text-xs text-gray-500 dark:text-gray-200">
                {{ formatDate(post.createdAt.toString()) }}
              </p>
            </div>
          </div>
          <!-- img post -->
          <div class="p-4">
              <img :src="post.img" :alt="post.id" class="w-full object-cover"
              style="max-height: 500px;">
           </div>
           <!-- descripcion -->
           <div class="p-4">
              <p class="text-gray-600 dark:text-gray-300">{{ post.description }}</p>
            </div>
           <!-- acciones del post -->
            <div class="p-4">
              <div class="flex space-x-4 mb-3">
                <button class="text-gray-500 hover:text-red-500 dark:text-gray-400 hover:dark:text-red-500 transition flex items-center">
                  <span class="text-2xl mr-2">❤️</span>
                  <span class="text-sm">100</span>
                </button>
                <button class="text-gray-500 hover:text-blue-500 dark:text-gray-400 hover:dark:text-blue-500 transition flex items-center">
                  <span class="text-2xl mr-2">💬</span>
                  <span class="text-sm">100</span>
                </button>
                <button class="text-gray-500 hover:text-green-500 dark:text-gray-400 hover:dark:text-green-500 transition flex items-center">
                  <span class="text-2xl mr-2">🔄</span>
                  <span class="text-sm">100</span>  
                </button>
              </div>
            </div>
            
        </div>
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 class="text-lg font-medium">No hay publicaciones</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Sé el primero en publicar</p>
      </div>
    </div>
  </div>
</template>