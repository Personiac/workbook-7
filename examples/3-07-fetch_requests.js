let promise = fetch("https://jsonplaceholder.typicode.com/users/");

function logUser(response) {

    //JSON.parse(response.body);
    response.json().then( function (body) {
        console.log(body);
    });
}

promise.then(logUser);