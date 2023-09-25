export interface User {
  email: string;
}

export interface LoginUser extends User {
  password: string;
  // profilePictureURL: string;
}

export interface UserAccount extends User {
  id: string;
  // username: string;
  createdAt: string | null;
  isOnline: boolean;
  lastOnlineTimestamp: string | null;
}
