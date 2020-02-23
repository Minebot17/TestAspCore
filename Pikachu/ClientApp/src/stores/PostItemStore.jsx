import { observable, action } from 'mobx';

class PostItemStore {
    @observable id;
    @observable title;
    @observable rating;
    @observable text;
    @observable date;

    constructor() {
        this.setAll(0, "", 0, "", new Date());
    }

    @action
    setAll(id, title, rating, text, date){
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.text = text;
        this.date = date;
        return this;
    }
}

export default PostItemStore;
