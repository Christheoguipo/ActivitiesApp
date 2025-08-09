import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isUserLoggedIn() {
    return !!this.user;
  }

  private initializeUserSession = (user: User) => {
    store.commonStore.setToken(user.token);
    runInAction(() => this.user = user);
    router.navigate('/activities');
    store.modalStore.closeModal();
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    this.initializeUserSession(user);
  }

  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    this.initializeUserSession(user);
  }

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate('/');
  }

  getUser = async () => {
    try {
      const user = await agent.Account.currentUser();
      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }

  setMainImage = (image: string) => {
    if (this.user)
      this.user.image = image;
  }

  setDisplayName = (displayName: string) => {
    if (this.user)
      this.user.displayName = displayName;
  }

}