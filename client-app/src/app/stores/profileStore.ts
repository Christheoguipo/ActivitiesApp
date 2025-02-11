import { makeAutoObservable, runInAction } from 'mobx';
import { Profile } from '../models/profile';
import agent from '../api/agent';
import { store } from './store';

export default class ProfileStore {
  profile: Profile | null = null;
  isLoadingProfile: boolean = false;
  isUploading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (this.profile?.username === store.userStore.user?.username) {
      return true;
    }

    return false;
  }

  loadProfile = async (username: string) => {
    this.isLoadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingProfile = false;
      });
    }
  }

  uploadPhoto = async (file: Blob) => {

    this.isUploading = true;
    try {

      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setMainImage(photo.url);
          }
        }
      })

    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => this.isUploading = false);
    }

  }
}