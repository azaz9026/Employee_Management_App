const BASE_URL = 'http://localhost:8080';

// Fetch all employees with optional search, pagination, and limit
export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const result = await fetch(url, options);
        
        if (!result.ok) {
            const errorText = await result.text();
            console.error('Error fetching employees:', errorText);
            throw new Error(`Error: ${result.statusText}`);
        }

        const { data } = await result.json();
        return data;
    } catch (err) {
        console.error('GetAllEmployees Error:', err);
        throw err;
    }
};

// Fetch employee details by ID
export const GetEmployeeDetailsById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const result = await fetch(url, options);
        
        if (!result.ok) {
            const errorText = await result.text();
            console.error('Error fetching employee details:', errorText);
            throw new Error(`Error: ${result.statusText}`);
        }

        const { data } = await result.json();
        console.log('Employee Details:', data);
        return data;
    } catch (err) {
        console.error('GetEmployeeDetailsById Error:', err);
        throw err;
    }
};

// Delete an employee by ID
export const DeleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const result = await fetch(url, options);
        
        if (!result.ok) {
            const errorText = await result.text();
            console.error('Error deleting employee:', errorText);
            throw new Error(`Error: ${result.statusText}`);
        }

        const data = await result.json();
        console.log('Delete Response:', data);
        return data;
    } catch (err) {
        console.error('DeleteEmployeeById Error:', err);
        throw err;
    }
};

// Create a new employee
export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    console.log('Creating Employee URL:', url);

    const formData = new FormData();
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }

    const options = {
        method: 'POST',
        body: formData,
    };

    try {
        const result = await fetch(url, options);
        
        if (!result.ok) {
            const errorText = await result.text();
            console.error('Error creating employee:', errorText);
            throw new Error(`Error: ${result.statusText}`);
        }

        const data = await result.json();
        console.log('Create Response:', data);
        return data;
    } catch (err) {
        console.error('CreateEmployee Error:', err);
        throw err;
    }
};

// Update employee details by ID
export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    console.log('Updating Employee URL:', url);

    const formData = new FormData();
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }

    const options = {
        method: 'PUT',
        body: formData,
    };

    try {
        const result = await fetch(url, options);
        
        if (!result.ok) {
            const errorText = await result.text();
            console.error('Error updating employee:', errorText);
            throw new Error(`Error: ${result.statusText}`);
        }

        const data = await result.json();
        console.log('<---Update Response--->', data);
        return data;
    } catch (err) {
        console.error('UpdateEmployeeById Error:', err);
        throw err;
    }
};
