import { LoginPayload, LoginResponse } from '../types/auth.type';

const BASE_URL = 'http://localhost:3001/books'; // Make sure your backend is running on this

export async function getAllBooks() {
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  console.log('the data is here', data);
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Failed to get all book');
  }
}

export async function DeleteaBook(id: string) {
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

export async function getaBook(id: string) {
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
    throw new Error(data.message || 'Failed to get a book');
  }
}
// services/authServices.ts

export async function EditaBook(id: string, payload: any) {
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
    throw new Error(data?.message || 'Book update failed');
  }

  return data;
}

// services/authServices.ts

export async function createBook(payload: any) {
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
    throw new Error(data?.message || 'Book creation failed');
  }

  return data;
}


export async function fetchBookQRCode(bookId: string) {
  const res = await fetch(`${BASE_URL}/${bookId}/qrcode`);
  if (!res.ok) throw new Error("Failed to fetch QR code");
  return res.json(); // returns { qrCode: "data:image/png;base64..." }
}
