const serverUrl = 'http://localhost:4000';

export const booksApiUrl = id => 
    id ? `${serverUrl}/books/${id}` : `${serverUrl}/books`;

export const authorsApiUrl = id =>
    `${serverUrl}/authors/${id}`;

export const createUserApiUrl = () =>
    `${serverUrl}/users/signup`;

export const loginUserApiUrl = () =>
    `${serverUrl}/users/login`;
export const reviewsApiUrl = id =>
    `${serverUrl}/reviews/${id}`;
export const editUserApiUrl = id =>
    `${serverUrl}/users/${id}`;
