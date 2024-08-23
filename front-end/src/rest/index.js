const customerAPI = 'http://localhost:8080/api/customers';
const accountAPI = 'http://localhost:8081/account';

const myHeaders = new Headers(
    {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
    }
);

export function getAll(setCustomers) {
    const myInit = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders
    };

    fetch(customerAPI, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setCustomers(data))
        .catch(error => {
            alert(error);
        });
}

export function deleteById(id, postOpCallback) {
    const myInit = {
        method: 'DELETE',
        mode: 'cors',
        headers: myHeaders
    };

    fetch(customerAPI + "/" + id, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            postOpCallback();
        })
        .catch(error => {
            alert(error);
        });
}

export function post(customer, postOpCallback) {
    delete customer.id;

    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    fetch(customerAPI, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(() => postOpCallback())
        .catch(error => {
            alert(error);
        });
}

export function put(customer, postOpCallback) {
    const myInit = {
        method: 'PUT',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    fetch(customerAPI + "/" + customer.id, myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(() => postOpCallback())
        .catch(error => {
            alert(error);
        });
}

export function getToken(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    return fetch(accountAPI + '/token', myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(token => {
            if (!token || !token.token) {
                throw new Error('Invalid email or password');
            }
            return token;
        })
        .catch(error => {
            console.error(error);
            return null; // Return null in case of any error
        });
}

export function registerAccount(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    fetch(accountAPI + '/register', myInit)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then(account => {
            console.log(account);
        })
        .catch(error => {
            alert(error);
        });
}
