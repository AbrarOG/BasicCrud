import { LoginPayload, LoginResponse } from '../types/auth.type';

const BASE_URL = 'http://localhost:3001/roles'; // Make sure your backend is running on this

export async function getAllRoles() {
  const response = await fetch(`${BASE_URL}`, {
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
    throw new Error(data.message || 'Failed to get all role');
  }
}

export async function DeleteaRole(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
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

export async function getaRole(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
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
    throw new Error(data.message || 'Failed to get a role');
  }
}
// services/authServices.ts

export async function EditaRole(id: string, payload: any) {
  const response = await fetch(`${BASE_URL}/${id}`, {
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
    throw new Error(data?.message || 'Role update failed');
  }

  return data;
}

// services/authServices.ts

export async function createRole(payload: any) {
  const response = await fetch(`${BASE_URL}`, {
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
    throw new Error(data?.message || 'Role creation failed');
  }

  return data;
}

export async function assignPermissionToRole(payload: {
  roleId: string;
  permissionId: string;
}) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${BASE_URL}/assign-permission`, {
    method: 'PATCH', // ✅ Changed to PATCH
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg =
      data?.message || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

export async function updatePermissionsForRole(payload: {
  roleId: string;
  permissions: string[];
}) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${BASE_URL}/updaterolepermissions`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg =
      data?.message || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

