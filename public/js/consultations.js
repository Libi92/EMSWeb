$(document).ready(function () {
    const database = firebase.database();

    const userRef = database.ref('consultation');
    userRef.on('value', (snapshot) => {
        $("#loading").hide();
        const data = snapshot.val();
        console.log(data);
        let keys = Object.keys(data);
        let doctorsTable = $("#doctors_table");
        doctorsTable.empty();
        for (let i in keys) {
            let key = keys[i];
            let consultation = data[key];
            let requestedOn = consultation['requestedOn'];
            let schedulesOn = consultation['schedulesDateTime'];
            requestedOn = new Date(requestedOn).toLocaleString();
            let dateString = '';
            if (schedulesOn) {
                schedulesOn = new Date(schedulesOn).toLocaleString();
                dateString = '<span style="font-size: 14px">Requested On</span>\n' +
                    '         <img src="images/outline_event_black_18dp.png" width="20px">\n' +
                    '         <span style="font-size: 14px">' + requestedOn + '</span><br/>\n' +
                    '         <span style="font-size: 14px">Scheduled On</span>\n' +
                    '         <img src="images/outline_event_black_18dp.png" width="20px">\n' +
                    '         <span style="font-size: 14px">' + schedulesOn + '</span>\n';
            } else {
                dateString = '<span style="font-size: 14px">Requested On</span>\n' +
                    '         <img src="images/outline_event_black_18dp.png" width="20px">\n' +
                    '         <span style="font-size: 14px">' + requestedOn + '</span><br/>\n';
            }

            const row = '<tr>\n' +
                '                    <td>\n' +
                '                        <img src="images/outline_account_circle_black_18dp.png"\n' +
                '                             style="margin-right: 6px; width: 32px"/>\n' +
                consultation['fromUser']['displayName'] +
                '                        <br/>\n' +
                '                        <label style="font-size: 14px">Consulting <b>' +
                consultation['toDoctor']['displayName'] +
                '                        </b></label>\n' +
                '                    </td>\n' +
                '                    <td>\n' + dateString +
                '                    </td>\n' +
                '                    <td><span style="font-size: 14px">' +
                consultation['scheduleStatus'] +
                '                   </span></td>\n' +
                '                </tr>';

            doctorsTable.append(row);
        }
    });
});