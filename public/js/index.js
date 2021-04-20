$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = 'home.html';
        } else {
            console.log("User not logged in");
        }
    });
});
