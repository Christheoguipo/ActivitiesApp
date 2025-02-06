import { makeAutoObservable, runInAction } from 'mobx';
import { Profile } from '../models/profile';
import agent from '../api/agent';
import { store } from './store';

export default class ProfileStore {
  profile: Profile | null = null;
  isLoadingProfile: boolean = false;

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
        this.isLoadingProfile = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingProfile = false;
      });
    }
  }
}