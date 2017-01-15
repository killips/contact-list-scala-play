/**
 * Created by User on 14.01.2017.
 */
function search() {
    var request = new XMLHttpRequest();
    request.open('POST', '/search-phone', true);

    request.onload = function () {
        //console.log("we-go");
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            //  console.log("success");
            // alert(data[0].name);
            document.getElementById("phones").remove();
            var ul = document.createElement('ul');
            ul.id = "phones";
            document.body.appendChild(ul);
            data.forEach(function (item, i, arr) {
                var newLi = document.createElement('li');
                newLi.innerHTML = item.name;
                document.getElementById("phones").appendChild(newLi)
            });

        } else {
            // We reached our target server, but it returned an error

        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();
}