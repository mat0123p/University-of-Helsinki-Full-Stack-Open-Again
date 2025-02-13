import axios from 'axios'

const getAll = () => {
    const request = axios.get('/api/persons')
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post('/api/persons', newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`/api/persons/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`/api/persons/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }