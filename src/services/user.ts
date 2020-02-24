import axios from 'axios';

export async function queryUsers(): Promise<any> {
  return axios('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return axios('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return axios('/api/notices');
}
