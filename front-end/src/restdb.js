const baseURL = 'http://localhost:8080/api/customers';

export async function getAll(setCustomers) {
    const myInit = {
        method: 'GET',
        mode: 'cors'
    };
    
    const fetchData = async (url) => {
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
    
    fetchData(baseURL);
}

export async function deleteById(id, postOpCallback) {
    const myInit = {
        method: 'DELETE',
        mode: 'cors' };
    
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
    
    deleteRequest(baseURL + "/" + id);
}

export async function post(customer, postOpCallback) {
    delete customer.id;
    
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
            await response.json();
            postOpCallback();
        } catch (error) {
            alert(error);
        }
    }
    
    postRequest(baseURL);
}

export async function put(customer, postOpCallback) {
    const myInit = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
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
    
    putRequest(baseURL + "/" + customer.id);
}
