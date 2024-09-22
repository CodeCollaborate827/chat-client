export interface User {
  userId?: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  address: UserAddress
}

export interface UserAddress {
    country?: string,
    province?: string,
    city?: string,
    district?: string,
    ward?: string
}