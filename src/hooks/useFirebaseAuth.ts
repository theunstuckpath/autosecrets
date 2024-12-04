import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthStore } from '../store/useAuthStore';
import type { User } from '../types';

export function useFirebaseAuth() {
  const [loading, setLoading] = useState(true);
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data() as Omit<User, 'id'>;
          
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || userData.displayName,
            photoURL: firebaseUser.photoURL || userData.photoURL,
            subscriptionTier: userData.subscriptionTier || 'free',
            createdAt: userData.createdAt || new Date().toISOString(),
            lastLogin: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        clearUser();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(firebaseUser, { displayName });
      
      const userData: Omit<User, 'id'> = {
        email,
        displayName,
        photoURL: null,
        subscriptionTier: 'free',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      setUser({
        id: firebaseUser.uid,
        ...userData
      });
    } catch (error) {
      throw new Error('Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error('Error sending password reset email');
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      clearUser();
    } catch (error) {
      throw new Error('Error signing out');
    }
  };

  return {
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };
}
