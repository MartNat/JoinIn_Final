// Scroll functionality for the community highlights
const prevArrow = document.querySelector('.carousel-arrow.left-arrow'); // Correct class selector
const nextArrow = document.querySelector('.carousel-arrow.right-arrow'); // Correct class selector
const scrollContainer = document.querySelector('.carousel'); // Correct container class

// Scroll left when the previous arrow is clicked
prevArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -300, // Adjust the scroll amount based on your card width
        behavior: 'smooth'
    });
});

// Scroll right when the next arrow is clicked
nextArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: 300, // Adjust the scroll amount based on your card width
        behavior: 'smooth'
    });
});

// "Sign Up" button redirection functionality
document.querySelectorAll('.signup-button').forEach(button => {
    button.addEventListener('click', (event) => {
        // Get the URL from the data-url attribute
        const url = event.target.getAttribute('data-url');

        // Redirect to the URL or show an alert if no URL is provided
        if (url) {
            window.location.href = url;
        } else {
            alert("No URL specified for this club!");
        }
    });
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY4MjMZNOhhsytU1scJ29DF5tYcnoINLI",
    authDomain: "join-in-submit.firebaseapp.com",
    projectId: "join-in-submit",
    storageBucket: "join-in-submit.appspot.com", // Fixed storage bucket URL
    messagingSenderId: "290234150708",
    appId: "1:290234150708:web:ca3fb41dc7de2e42cfbf61",
    measurementId: "G-K85PZJT993"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign-up functionality
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value.trim(); // Added .trim() to clean input
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            clubs: []
        });

        alert('Account created successfully!');
        window.location.href = 'clubs.html'; // Redirect to clubs page
    } catch (error) {
        console.error('Error during signup:', error); // Log error for debugging
        alert(`Signup failed: ${error.message}`);
    }
});

// Sign-in functionality
document.getElementById('signin-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signin-email').value.trim(); // Added .trim() to clean input
    const password = document.getElementById('signin-password').value.trim();

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        alert('Welcome back!');
        window.location.href = 'clubs.html'; // Redirect to clubs page
    } catch (error) {
        console.error('Error during signin:', error); // Log error for debugging
        alert(`Sign-in failed: ${error.message}`);
    }
});
