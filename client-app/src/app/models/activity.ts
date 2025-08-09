import { Profile } from "./profile";

export interface IActivity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isHost: boolean;
  host?: Profile;
  isGoing: boolean;
  isCancelled: boolean;
  attendees: Profile[]
}

export class Activity implements IActivity {
  constructor(init: ActivityFormValues) {
    this.id = init.id!;
    this.title = init.title;
    this.date = init.date
    this.description = init.description;
    this.category = init.category;
    this.city = init.city;
    this.venue = init.venue;
  }

  id: string;
  title: string = '';
  date: Date | null = null;
  description: string = '';
  category: string = '';
  city: string = '';
  venue: string = '';

  hostUsername: string = '';
  isHost: boolean = false;
  host?: Profile;
  isGoing: boolean = false;
  isCancelled: boolean = false;
  attendees: Profile[] = [];

}

export class ActivityFormValues {

  id?: string;
  title: string = '';
  date: Date | null = null;
  description: string = '';
  category: string = '';
  city: string = '';
  venue: string = '';

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.date = activity.date;
      this.description = activity.description;
      this.category = activity.category;
      this.city = activity.city;
      this.venue = activity.venue;
    }
  }

}
