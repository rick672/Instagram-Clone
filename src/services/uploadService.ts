import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { storage } from '../config/firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export class UploadService {
  /**
   * Sube una imagen a Firebase Storage y devuelve la URL
   * @param file: File - La imagen a subir
   * @param path: string - La ruta donde se subirá la imagen
   * @returns Promise<string> - La URL de la imagen subida
   */

  static async uploadImage(file: File, path: string = 'posts'): Promise<string> {
    try {
      //crear un nombre unico para la imagen
      const fileExtension = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExtension}`

      //crear una referencia a la imagen en el Storage
      const storageRef = ref(storage, `${path}/${fileName}`)

      //subir la imagen a Firebase Storage
      const snapshot = await uploadBytes(storageRef, file)

      //url de descarga de la imagen
      const url = await getDownloadURL(snapshot.ref)

      return url
    } catch (error) {
      throw new Error('Error al subir la imagen' + error)
    }
  }
}