import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  following: boolean;
  followersCount: number;
  followingsCount: number;
  photos?: IPhoto[]
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }

  username: string;
  displayName: string;
  image?: string | undefined;
  bio?: string | undefined;
  following = false;
  followersCount = 0;
  followingsCount = 0;
  photos?: IPhoto[];
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}