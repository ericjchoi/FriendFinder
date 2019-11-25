var friends = require("../data/friends.js");

module.exports = function (app) {

    // read friendData from friends.js file
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // post back the updated friendData into friends.js
    app.post("/api/friends", function (req, res) {

        var userSubmit = req.body;
        var friendFound = {};
        // storing user's score
        for (var i = 0; i < userSubmit.scores.length; i++) {
            switch (userSubmit.scores[i]) {
                case "1 (Strongly Disagree)":
                    userSubmit.scores[i] = 1;
                    break;
                case 2:
                    userSubmit.scores[i] = 2;;
                    break;
                case 3:
                    userSubmit.scores[i] = 3;;
                    break;
                case 4:
                    userSubmit.scores[i] = 4;;
                    break;
                case "5 (Strongly Agree)":
                    userSubmit.scores[i] = 5;
                    break;
            }
        }
        // calculate the difference
        var minimumDifference = 1000;
        var bestCompatible = 0;
        for (var j = 0; j < friends.length; j++) {
            var difference = 0;
            for (var k = 0; k < friends[j].scores.length; k++) {
                var tempDifference = Math.abs(userSubmit.scores[k] - friends[j].scores[k]);
                difference += tempDifference;
            }
            // update minimum difference
            if (difference < minimumDifference) {
                minimumDifference = difference;
                bestCompatible = j;
            }
        }

        // best compatible friend found
        friendFound = friends[bestCompatible];

        // adding user submitted data into friendData in friends.js file
        friends.push(userSubmit);

        // send json response
        res.json(friendFound);
    });
};