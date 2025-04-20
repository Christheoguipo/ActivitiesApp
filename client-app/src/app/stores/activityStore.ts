import { makeAutoObservable, reaction, runInAction } from "mobx"
import { Activity, ActivityFormValues } from "../models/activity"
import agent from "../api/agent"
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from '../models/pagination';

export default class ActivityStore {

  activityList = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode: boolean = false;
  isLoadingList: boolean = false;
  isLoadingButton: boolean = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set('all', true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityList.clear();
        this.loadActivities();
      }
    )
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((_, key) => {
        if (key !== 'startDate') this.predicate.delete(key);
      })
    }
    switch (predicate) {
      case 'all':
        resetPredicate();
        this.predicate.set('all', true);
        break;
      case 'isGoing':
        resetPredicate();
        this.predicate.set('isGoing', true);
        break;
      case 'isHost':
        resetPredicate();
        this.predicate.set('isHost', true);
        break;
      case 'startDate':
        this.predicate.delete('startDate');
        this.predicate.set('startDate', value);

    }
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    })
    return params;
  }

  get activityListSortedByDate() {
    return Array.from(this.activityList.values())
      .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  }

  get groupedActivityByDate() {
    return Object.entries(
      this.activityListSortedByDate.reduce((activities, activity) => {
        const date = format(activity.date!, 'dd MMM yyyy');

        if (activities[date]) {
          activities[date] = [...activities[date], activity]
        } else {
          activities[date] = [activity];
        }
        return activities;

      }, {} as { [key: string]: Activity[] }));
  }

  loadActivities = async () => {
    this.setIsLoadingList(true);

    try {
      const result = await agent.Activities.list(this.axiosParams);

      result.data.forEach((activity) => {
        this.setActivityList(activity);
      });
      this.setPagination(result.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoadingList(false);
    }
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
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
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(aa => aa.username === user.username);
      activity.isHost = user.username == activity.hostUsername;
      activity.host = activity.attendees?.find(aa => aa.username === activity.hostUsername);
    }

    activity.date = new Date(activity.date!);
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

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      this.setActivityList(newActivity);

      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          const updatedActivity = { ...this.getActivity(activity.id), ...activity };
          this.activityList.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  cancelActivityToggle = async () => {
    this.isLoadingButton = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      this.selectedActivity!.isCancelled = !this.selectedActivity!.isCancelled;
      this.activityList.set(this.selectedActivity!.id, this.selectedActivity!);
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => this.isLoadingButton = false);
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

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.isLoadingButton = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(aa => aa.username !== user?.username);
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        // Updates the activity in the activity list
        this.activityList.set(this.selectedActivity!.id, this.selectedActivity!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingButton = false;
      });
    }
  }

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  updateAttendeeFollowing = (username: string) => {
    this.isLoadingButton = true;
    try {
      runInAction(() => {

        this.activityList.forEach((activity) => {

          activity.attendees?.forEach((attendee) => {
            if (attendee.username === username) {
              if (attendee.following)
                attendee.followersCount--;
              else
                attendee.followersCount++;
              attendee.following = !attendee.following;
            }
          })
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.isLoadingButton = false);
    }
  }

}