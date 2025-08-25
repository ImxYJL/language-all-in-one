import { ENDPOINT } from '@/apis/endpoints';
// import { MOCKED_USER_PROFILE } from '@/libs/data/users';
import { http, HttpResponse } from 'msw';

export const getUserInfo = () =>
  http.get('http://localhost:3000/api/user', () => {
    // Now the browser mock uses the same data source as the API route mock
    return HttpResponse.json();
  });

const userHandler = [getUserInfo()];

export default userHandler;
