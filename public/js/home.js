$(document).ready(function () {
    const auth = firebase.auth();
    const database = firebase.database();

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
        $("#loading").hide();
        const data = snapshot.val();
        console.log(data);
        let keys = Object.keys(data);
        let doctorsTable = $("#doctors_table");
        doctorsTable.empty();
        for (let i in keys) {
            let key = keys[i];
            let user = data[key];
            let status = user['status'];
            let button = '<td><button class="btn btn-outline-danger" onclick=\'enableUser(' + JSON.stringify(user) + ', "DISABLED")\'>Disable</button></td>\n';
            if (status !== 'ACTIVE') {
                button = '<td><button class="btn btn-outline-success" onclick=\'enableUser(' + JSON.stringify(user) + ', "ACTIVE")\'>Enable</button></td>\n';
            }

            const row = '<tr>\n' +
                '      <th scope="row">' + (parseInt(i) + 1) + '</th>\n' +
                '      <td><img src="../images/outline_account_circle_black_18dp.png" style="margin-right: 20px">' +
                user['displayName'] +
                '       </td>\n' +
                '      <td>' + user['designation'] + '</td>\n' +
                '      <td>' + user['email'] + '</td>\n' +
                '      <td>' + user['phone'] + '</td>\n' +
                button +
                '    </tr>';

            doctorsTable.append(row);
        }
    });
});

function enableUser(user, status) {
    user['status'] = status;
    const database = firebase.database();
    database.ref('user/' + user['uid']).set(user);
}
