const baseURL = 'http://localhost:8081/account';

export async function getToken(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    };

    const postRequest = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }

            const token = await response.json();
            console.log(token);
        } catch (error) {
            alert(error);
        }
    }
    
    postRequest(baseURL + '/token');
}

export async function registerAccount(customer) {
    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
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
    
    postRequest(baseURL + '/register');
}