$(document).ready(function () {
    const auth = firebase.auth();

    auth.onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = 'index.html'
        }
    });

    $("#link-logout").click(function (e) {
        e.preventDefault();
        auth.signOut();
        window.location.href = 'index.html'
    });
});