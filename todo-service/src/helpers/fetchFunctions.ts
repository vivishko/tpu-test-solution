import fetch from 'node-fetch';

export async function getUserAuth(token: string): Promise<any> {
  const url = 'http://svc_auth:8001/me';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  // console.log('response = ', data);
  return data;
}
