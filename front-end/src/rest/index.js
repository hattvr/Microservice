const customerAPI = 'http://localhost:8080/api/customers';
const accountAPI = 'http://localhost:8081/account';

const myHeaders = new Headers(
    {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
    }
);

export async function getAll(setCustomers) {
    const myInit = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders
    };
    
    const fetchData = async (url) => {
        console.log('fetching data, url: ', url);
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            alert(error);
        }
    }
    
    fetchData(customerAPI);
}

export async function deleteById(id, postOpCallback) {
    const myInit = {
        method: 'DELETE',
        mode: 'cors',
        headers: myHeaders
    };
    
    const deleteRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            postOpCallback();
        } catch (error) {
            alert(error);
        }
    }
    
    deleteRequest(customerAPI + "/" + id);
}

export async function post(customer, postOpCallback) {
    delete customer.id;
    
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    const postRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            await response.json();
            postOpCallback();
        } catch (error) {
            alert(error);
        }
    }
    
    postRequest(customerAPI);
}

export async function put(customer, postOpCallback) {
    const myInit = {
        method: 'PUT',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    const putRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            await response.json();
            postOpCallback();
        } catch (error) {
            alert(error);
        }
    }
    
    putRequest(customerAPI + "/" + customer.id);
}

export async function getToken(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    const postRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            
            const token = await response.json();
            
            if (!token || !token.token) {
                throw new Error('Invalid email or password');
            }

            return token;
        } catch (error) {
            console.error(error);
            return null; // Return null in case of any error
        }
    }
    
    return await postRequest(accountAPI + '/token');
}

export async function registerAccount(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify(customer)
    };

    const postRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }

            const account = await response.json();
            console.log(account);
        } catch (error) {
            alert(error);
        }
    }
    
    postRequest(accountAPI + '/register');
}