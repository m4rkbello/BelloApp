import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { apiService } from './apiService';

// Configure Google Sign In
GoogleSignin.configure({
    webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase Console
});

class AuthService {
    async loginWithEmail(email, password) {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            return {
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                token,
            };
        } catch (error) {
            throw new Error(this.handleAuthError(error));
        }
    }

    async registerWithEmail(email, password, displayName) {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Update profile
            await user.updateProfile({ displayName });

            const token = await user.getIdToken();

            return {
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: displayName,
                    photoURL: user.photoURL,
                },
                token,
            };
        } catch (error) {
            throw new Error(this.handleAuthError(error));
        }
    }

    async loginWithGoogle() {
        try {
            // Check if device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in with credential
            const userCredential = await auth().signInWithCredential(googleCredential);
            const user = userCredential.user;
            const token = await user.getIdToken();

            return {
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                token,
            };
        } catch (error) {
            throw new Error(this.handleAuthError(error));
        }
    }

    async logout() {
        try {
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            throw new Error('Failed to logout');
        }
    }

    handleAuthError(error) {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No user found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/email-already-in-use':
                return 'Email address is already in use.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            default:
                return error.message || 'An error occurred during authentication.';
        }
    }
}

export const authService = new AuthService();