//import axios from 'axios'
import config from '../config/apiConfig'
/*
export function getService (serviceName) {
    const getUrl = config.commonPath + serviceName
    return axios.get(getUrl)
        .then(resp => {
            return resp.data
        })
}

export function postService (serviceName, payload) {
    const postUrl = config.commonPath + serviceName
    return axios.post(postUrl, payload)
        .then(resp => {
            return resp.data
        })
}

export function putService (serviceName, payload) {
    const postUrl = config.commonPath + serviceName
    return axios.put(postUrl, payload)
        .then(resp => {
            return resp.data
        })
}
*/
export function getServiceFetch (serviceName) {
    let getUrl = config.commonPath + serviceName
    return fetch(getUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}

export async function postServiceFetch(serviceName, payload) {
    // Simple POST request with a JSON body using fetch
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    let postUrl = config.commonPath + serviceName
    try {
        let response = await fetch(postUrl, requestOptions)
            .then(async response => { 
                let responseData = await response.json()
                console.log('post stvice response')
                console.log(responseData)
                return responseData
            })
            .catch((error) => {
                console.error(error);
            });
        return response
    } catch (error) {
        console.error(error);
    }
}

export async function putServiceFetch(serviceName, payload) {
    // Simple POST request with a JSON body using fetch
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    let putUrl = config.commonPath + serviceName
    try {
        let response = await fetch(putUrl, requestOptions)
            .then(async response => { 
                let responseData = response
                return responseData
            })
            .catch((error) => {
                console.error(error);
            });
        return response
    } catch (error) {
        console.error(error);
    }
}

export function deleteServiceFetch (serviceName) {
    let deleteUrl = config.commonPath + serviceName
    return fetch(deleteUrl, { method: 'DELETE',
      })
        .then((response) => response )
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}


