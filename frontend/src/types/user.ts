export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cnic: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string;
  passwordChangedAt: string;
  role: {
    name: string;
  };
}