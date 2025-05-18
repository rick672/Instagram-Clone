// Importaciones básicas
import { initializeApp } from 'firebase/app'

// Servicios de Firebase
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Configuración de Firebase (la que te proporciona la consola)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 1. Inicialización principal de Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
/*
  FirebaseApp es la instancia principal que contiene toda la configuración
  Es como el "motor" de Firebase para tu aplicación
*/

// 2. Servicio de Autenticación
export const auth = getAuth(FirebaseApp)
/*
  auth es el objeto que manejará:
  - Registro de usuarios
  - Login
  - Cierre de sesión
  - etc.
*/

// 3. Proveedor de Google para autenticación
export const googleProvider = new GoogleAuthProvider()
/*
  googleProvider configura el login con Google
  Podrías añadir configuraciones adicionales como:
  googleProvider.setCustomParameters({ prompt: 'select_account' });
*/

// 4. Servicio de Firestore (base de datos)
export const firestore = getFirestore(FirebaseApp)
/*
  firestore es tu base de datos NoSQL
  Aquí guardarás colecciones y documentos
  Ejemplo de uso: collection(firestore, 'posts')
*/

// 5. Servicio de Storage (archivos)
export const storage = getStorage(FirebaseApp)
/*
  storage es para guardar archivos (imágenes, videos, etc.)
  Ejemplo: uploadBytes(storageRef, file)
*/

// 6. Referencia de Storage (redundante, puedes usar solo 'storage')
// export const storageRef = getStorage(FirebaseApp)
/*
  storageRef hace exactamente lo mismo que 'storage'
  Es duplicado, puedes eliminar esta línea
*/

