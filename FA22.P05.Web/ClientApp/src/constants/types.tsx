export type Error = {
  propery: string;
  message: string;
};
export type ListingDto = {
  id: number;
  name: string;
  description: string;
  price: number;
  startUtc: Date;
  endUtc: Date;
};

export type LoginDto = {
  username: string;
  password: string;
};