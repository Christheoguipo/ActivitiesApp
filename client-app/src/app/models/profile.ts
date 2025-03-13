import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
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
  followingCount = 0;
  photos?: IPhoto[];
}