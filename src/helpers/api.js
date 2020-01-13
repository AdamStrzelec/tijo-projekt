import JestSnapshot from "jest-snapshot"

export const get = url => {
    const result = fetch(url)
        .then(response => response.json())
        return result
}

export const apiCall = (url, method, body) => {
    const result = fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        return response.json()
    })

    return result;
}

export const post = (url, body) => {
    apiCall(url, 'POST', body);
}
    