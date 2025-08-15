import { LoginPayload, LoginResponse } from '../types/auth.type';

const BASE_URL = 'http://localhost:3001'; // Make sure your backend is running on this

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  } else {
    localStorage.setItem('token', data.access_token);
  }
}

export async function getAllUsers({
  type,
  search,
  page = 1,
  limit = 5,
}: {
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());

  const response = await fetch(`${BASE_URL}/users?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to get all users');
  }
}

export async function DeleteaUser(id: string) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }
  alert('Delete successful');
}

export async function getaUser(id: string) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to get a users');
  }
}
// services/authServices.ts

export async function EditaUser(id: string, payload: any) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

  let data;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(data?.message || 'User update failed');
  }

  return data;
}

// services/authServices.ts

export async function createUser(payload: any) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

  let data;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(data?.message || 'User creation failed');
  }

  return data;
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }), // send as an object
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}

export async function resetPassword(payload: {
  token: string;
  newPassword: string;
}) {
  console.log('i am inisde herezzzz', payload);
  const response = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  console.log('i am inisde herezzzz', response);

  return response.json();
}
