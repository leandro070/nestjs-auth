export class UserProfileRequest {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
