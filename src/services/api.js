const baseURL = 'http://localhost:4000'

async function request(url, method, data) {
    const response = await fetch(`${baseURL}${url}`, {
        method,
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    })

    const jsonRespones = await response.json()

    return jsonRespones.data;
}

export function create(data){  
    return request('/todo', 'POST', data)
}
export function read(){
    return request('/todo', 'GET')
}
export function update(id, data){
    return request(`/todo/${id}`, 'POST', data)
}
export function remove(id){
    return request(`/todo/${id}`, 'DELETE')
}