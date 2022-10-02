let authToken = '';

export const setToken = (token: string) => (authToken = token);

export const getToken = () => authToken;
