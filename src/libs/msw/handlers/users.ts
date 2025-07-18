import { ENDPOINT } from '@/apis/endpoints';
import { mockUser } from '@/libs/data/users';
import { http, HttpResponse } from 'msw';

export const getUserProfile = () =>
  http.get(ENDPOINT.gettingUserProfile, () => {
    return HttpResponse.json({});

    //return HttpResponse.json({ error: '유저 프로필 가져오기 오류' }, { status: 404 });
  });

export const getUserInfo = () =>
  http.get('http://localhost:3000/api/user', () => {
    // Now the browser mock uses the same data source as the API route mock
    return HttpResponse.json(mockUser);
  });

const userHandler = [getUserProfile(), getUserInfo()];

export default userHandler;
