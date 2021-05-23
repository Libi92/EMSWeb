$(document).ready(function () {
    const database = firebase.database();

    const userRef = database.ref('user').orderByChild('userType').equalTo('User');
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

            const row = '<tr>\n' +
                '      <th scope="row">' + (parseInt(i) + 1) + '</th>\n' +
                '      <td><img src="../images/outline_account_circle_black_18dp.png" style="margin-right: 20px">' +
                user['displayName'] +
                '       </td>\n' +
                '      <td>' + user['address'] + '</td>\n' +
                '      <td>' + user['email'] + '</td>\n' +
                '      <td>' + user['phone'] + '</td>\n' +
                '    </tr>';

            doctorsTable.append(row);
        }
    });
});