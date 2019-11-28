import { apiClientService } from 'services';

export const login = (email: string, password: string) =>
  apiClientService.post('/users/login', {
    data: {
      email,
      password
    }
  });

export const signup = (name: string, email: string, password: string) =>
  apiClientService.post('/users', {
    data: {
      name,
      email,
      password
    }
  });

export const getUserData = () => apiClientService.get('/user');