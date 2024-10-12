import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent"
import { v4 as uuid } from 'uuid';

export default class ActivityStore {

  activityList = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode: boolean = false;
  loadingList: boolean = true;
  loadingButton: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get ActivityListSortedByDate() {
    return Array.from(this.activityList.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {

      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        activity.date = new Date(activity.date).toISOString().split("T")[0];
        this.setActivityList(activity);
      });

    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }

  }

  setActivityList = (activity: Activity) => {
    this.activityList.set(activity.id, activity);
  }

  setLoadingInitial = (value: boolean) => {
    this.loadingList = value;
  }

  selectActivity = (id: string) => {
    if (this.editMode)
      this.closeForm();

    this.selectedActivity = this.activityList.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    if (id)
      this.selectActivity(id)
    else
      this.cancelSelectedActivity();

    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  setEditMode = (value: boolean) => {
    this.editMode = value;
  }

  createActivity = async (activity: Activity) => {

    this.loadingButton = true;
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      runInAction(() => {
        this.setActivityList(activity);
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingButton = false;
        this.editMode = false;
      });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loadingButton = true;
    try {

      await agent.Activities.update(activity);
      runInAction(() => {
        this.setActivityList(activity);
        this.selectedActivity = activity;
      });

    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editMode = false;
        this.loadingButton = false;
      });
    }
  }

  deleteActivity = async (id: string) => {

    runInAction(() => {
      this.loadingButton = true;
      this.editMode = false;
      if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
    });

    try {

      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityList.delete(id);
      });

    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingButton = false;
      });
    }
  }
}