export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Photo {
  _id?: string;
  album: string;
  imageUrl: string;
  name: string;
  created_at: string;
}

export interface Album {
  _id?: string;
  name: string;
  photos?: Photo[];
  created_at?: Date;
}
