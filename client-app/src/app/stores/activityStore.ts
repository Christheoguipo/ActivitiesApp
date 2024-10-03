import { makeObservable, observable } from "mobx"

export default class ActivityStore {

  title = 'Sample Title'

  constructor() {
    makeObservable(this, {
      title: observable
    })
  }

}