/**
 * Created by User on 13.01.2017.
 */
var request = new XMLHttpRequest();
request.open('GET', '/phones', true);

request.onload = function() {
    //console.log("we-go");
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        data.forEach(function(item, i, arr) {
            var newLi = document.createElement('li');
            newLi.innerHTML = item.name+" "+item.phoneNumber;
            document.getElementById("phones").appendChild(newLi)
        });

    } else {
        // We reached our target server, but it returned an error

    }
};
request.onerror = function() {
    // There was a connection error of some sort
};

request.send();