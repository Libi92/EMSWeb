$(document).ready(function () {
    const auth = firebase.auth();
    const database = firebase.database();

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

    function showToast() {
        const toastElList = [].slice.call(document.querySelectorAll('.toast'));
        const toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => {
            toast.show();
        });
    }

    $("#submit-doctor").click(function (e) {
        e.preventDefault();

        const name = $("#name").val();
        const phone = $("#phone").val();
        const address = $("#address").val();
        const designation = $("#designation").val();
        const email = $("#email").val();
        const password = $("#password").val();

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log({user});
                const userId = user.uid;
                console.log(userId);

                database.ref('user/' + userId).set({
                    uid: userId,
                    displayName: name,
                    phone: phone,
                    address: address,
                    designation: designation,
                    email: email,
                    userType: 'Doctor',
                    status: 'ACTIVE'
                });

                $('.doctor-form').find('input').val('');
                $('.doctor-form').find('textarea').val('');
                showToast();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(error);
            });
    })

    const userRef = database.ref('user').orderByChild('userType').equalTo('Doctor');
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        let keys = Object.keys(data);
        let doctorsTable = $("#doctors_table");
        doctorsTable.empty();
        for (let i in keys) {
            let key = keys[i];
            let user = data[key];

            const row = '<tr>\n' +
                '      <th scope="row">' + (parseInt(i) + 1) + '</th>\n' +
                '      <td>' + user['displayName'] + '</td>\n' +
                '      <td>' + user['designation'] + '</td>\n' +
                '      <td>' + user['email'] + '</td>\n' +
                '      <td>' + user['phone'] + '</td>\n' +
                '    </tr>';

            doctorsTable.append(row);
        }
    });
});
