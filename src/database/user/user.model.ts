import type { User } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";

export class UserModel {
    private readonly COLLECTION_NAME = 'users';

    constructor(private readonly user: User) {}

    // Crear Usuario
    public async createUser(user: User): Promise<void> {
        try {
            const userCollection = collection(firestore, this.COLLECTION_NAME);
    
            const userRef = doc(userCollection, user.uid);
    
            const userData = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
                provider: user.providerData[0]?.providerId || 'email',
                isActive: true,
            }
    
            await setDoc(userRef, userData, { merge: true });
            console.log('Usuario creado correctamente', this.user);
            
        } catch (error) {
            console.error('Error al crear usuario', error);
            throw error;
        }
    }

    // Obtener Usuarios
    public async getUser() {
        try {
            const userRef = doc(firestore, this.COLLECTION_NAME, this.user.uid)
            const userDoc = await getDoc(userRef)

            if (userDoc.exists()){
                return userDoc.data() as User
            } else {
                console.log('No existe el usuario', this.user);
                return null;
            }

        } catch (error) {
            console.error('Error al obtener usuario', error);
            throw error;
        }
    }
}