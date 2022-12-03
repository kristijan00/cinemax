import { makeAutoObservable, observable, action } from 'mobx';


export class SearchStore {
  searchText: string = '';

  constructor() {
    makeAutoObservable(this, {
      searchText: observable,
      setSearchText: action,
    });
  }

  setSearchText(text: string) {
    this.searchText = text;
  }
}

const searchStore = new SearchStore();

export default searchStore;