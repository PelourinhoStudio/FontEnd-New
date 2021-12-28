import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZeyQFqLfMqeVnuHu1_5_hec7IDv6gOao",
    authDomain: "pelourinho-studio-cfbf6.firebaseapp.com",
    projectId: "pelourinho-studio-cfbf6",
    storageBucket: "pelourinho-studio-cfbf6.appspot.com",
    messagingSenderId: "852771256332",
    appId: "1:852771256332:web:ec840a8fbb3941cb769629"
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp)

export { storage, ref, uploadBytesResumable, getDownloadURL }