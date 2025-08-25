import { http, HttpResponse } from 'msw';
import { MOCKED_RANDOM_WORD } from '../mock/words';

const getRandomWord = () =>
  http.get('/api/word', () => {
    return HttpResponse.json(MOCKED_RANDOM_WORD);
  });

const wordsHandler = [getRandomWord()];

export default wordsHandler;
