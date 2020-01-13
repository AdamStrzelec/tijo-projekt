import { booksApiUrl, authorsApiUrl,reviewsApiUrl } from './routes';
import * as api from './api';

export const getAllBooks = () =>
    api.get(booksApiUrl())

export const getBookById = id =>
    api.get(booksApiUrl(id))

export const getAuthorById = id =>
    api.get(authorsApiUrl(id))
    
export const getReviewsByBookId = id =>
    api.get(reviewsApiUrl(id))

