var faker = require('faker');
var moment = require('moment');
const bcrypt = require('bcryptjs');

function randomAlphanum(num) {
    let randomId = "";
    for (let k = 0; k < num; k++) {
        randomId = randomId + faker.random.alphaNumeric();
    }
    return randomId;
}
function randomN(num) {
    return Math.floor(Math.random() * num)
}

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = function populateTab() {
    var users = [];
    var sessions = [];
    let sessionAmount = 0;
    let fullDate;
    let teacherId = [];
    let privateId=[];
    let groupId=[];
    let availableTimes=[];
    var sessionTypes = [];
    let randomDate=[];
    let temp = 0;
    var certlevel = ["social foundation", "bronze", "silver", "gold", "open"];
    var dances = ["Waltz", "Arg. Tango", "Foxtrot", "Cha-Cha", "Rumba", "Technic class", "Bachata", "Swing", "Salsa"]
    let password = encryptPassword("password");
    for (let i = 0; i < 3; i++) {
        teacherId.push(randomAlphanum(24))
        users.push({
            id: teacherId[i],
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: password,
            phoneNumber: faker.phone.phoneNumberFormat(),
            googleId: "",
            birthday: moment().set({
                'year': (moment().get('year') - randomN(45) - 18),
                'month': randomN(12),
                'date': randomN(30)
            }).format("YYYY-MM-DD"),
            profilePhotoUrl: faker.image.avatar(),
            certLevel: randomN(5),
            memberStatus: ["teacher"]
        });
        privateId.push(randomAlphanum(24));
        sessionTypes.push({
            sessionID: privateId[i],
            sessionName: "private lesson of " + users[i].firstName + " " + users[i].lastName,
            sessionType: "private",
            teachers: [users[i].id],
            price: randomN(20) + 80
        });
        temp = randomN(5);
        for (let j = 0; j < temp; j++) {
            fullDate = faker.date.between(moment().format("YYYY-MM-DD"), moment().set({
                'year': moment().get('year'),
                'month': moment().get('month') + 1,
                'date': randomN(32)
            }));
            fullDate = moment(fullDate).set({
                'hour': randomN(12) + 10,
                'minute': [0, 15, 30, 45][randomN(4)]
            }).format("YYYY-MM-DD HH:mm");
            randomDate.push(fullDate)
        }
        temp = randomN(5);
        groupId.push(randomAlphanum(24));
        sessionTypes.push({
            sessionID: groupId[i],
            sessionName: certlevel[temp] + " " + dances[randomN(10)],
            level: temp,
            inPersonLimit: 3 + randomN(5),
            adultClass: true,
            sessionType: "group class",
            teachers: [users[i].id],
            price: randomN(20) + 10,
            sessionCalendar: randomDate
        });
    }
console.log(sessionTypes)
    for (let i = 1; i < 25; i++) {
        // pulling 24 records name, email, phone, image url taken from faker.js
        // dob taken randomly between 18 and 65 years old currently
        sessionAmount = randomN(10);
        for (let j = 0; j < sessionAmount; j++) {
            fullDate = faker.date.between(moment().format("YYYY-MM-DD"), moment().set({
                'year': moment().get('year'),
                'month': moment().get('month') + randomN(3) - 1,
                'date': randomN(32)
            }));
            fullDate = moment(fullDate).set({
                'hour': randomN(12) + 10,
                'minute': [0, 15, 30, 45][randomN(4)]
            }).format("YYYY-MM-DD HH:mm");
            temp=randomN(teacherId.length)
            sessions.push(
                {
                    sessionID: privateId[temp],
                    sessionDate: fullDate,
                    length: [1, .5, 1.5][randomN(3)],
                    isPresent: [true, true, true, true, false][randomN(5)]
                });
        }

        // groups
        sessionAmount = randomN(10);
        for (let j = 0; j < sessionAmount; j++) {
            
            temp=randomN(teacherId.length)
            availableTimes=sessionTypes[temp*2+1].sessionCalendar
           
            sessions.push(
                {
                    sessionID: groupId[temp],
                    sessionDate: availableTimes[randomN(availableTimes.length)],
                    length: 1,
                    isPresent: [true, true, true, true, false][randomN(5)],
                    teacherId: teacherId[temp]
                });
        }
        users.push({
            id: randomAlphanum(24),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: password,
            phoneNumber: faker.phone.phoneNumberFormat(),
            googleId: "",
            birthday: moment().set({
                'year': (moment().get('year') - randomN(65) - 14),
                'month': randomN(12),
                'date': randomN(30)
            }).format("YYYY-MM-DD"),
            profilePhotoUrl: faker.image.avatar(),
            certLevel: randomN(5),
            memberStatus: ["student"],
            userSessions: sessions
        });
        // certlevel: social foundation, bronze, silver, gold, open
        sessions = [];
    }



    return {userObj:users, sessionsObj: sessionTypes}
}
