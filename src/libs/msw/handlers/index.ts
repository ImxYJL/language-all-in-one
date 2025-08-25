import userHandler from './users';
import wordsHandler from './words';

const handlers = [...userHandler, ...wordsHandler];

export default handlers;
