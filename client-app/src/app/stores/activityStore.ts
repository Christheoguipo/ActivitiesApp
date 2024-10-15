import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent"

export default class ActivityStore {

  activityList = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode: boolean = false;
  isLoadingList: boolean = false;
  isLoadingButton: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get ActivityListSortedByDate() {
    return Array.from(this.activityList.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.setIsLoadingList(true);

    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        this.setActivityList(activity);
      });

    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoadingList(false);
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) this.selectedActivity = activity;
    else {
      this.setIsLoadingList(true);
      try {
        activity = await agent.Activities.details(id);
        if (activity) {
          runInAction(() => {
            this.setActivityList(activity!);
            this.selectedActivity = activity;
          });
        } else {
          console.log(`Activity of id ${id} couldn't be found.`);
        }

      } catch (error) {
        console.log(error);
      } finally {
        this.setIsLoadingList(false);
      }
    }

    return activity;
  }

  private setActivityList = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityList.set(activity.id, activity);
  }

  private getActivity = (id: string) => {
    return this.activityList.get(id);
  }

  private setIsLoadingList = (value: boolean) => {
    this.isLoadingList = value;
  }

  private cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  createActivity = async (activity: Activity) => {

    this.isLoadingButton = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.setActivityList(activity);
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingButton = false;
        this.editMode = false;
      });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.isLoadingButton = true;
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
        this.isLoadingButton = false;
      });
    }
  }

  deleteActivity = async (id: string) => {

    runInAction(() => {
      this.isLoadingButton = true;
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
        this.isLoadingButton = false;
      });
    }
  }
}