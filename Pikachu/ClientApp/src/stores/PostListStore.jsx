import { observable, action } from 'mobx';

class PostListStore {
    @observable page;
    @observable type;
    @observable posts;

    constructor() {
        this.page = false;
        this.posts = [];
        this.type = "";
    }

    @action
    setPage(page){
        this.page = page;
    }

    @action
    setPosts(posts){
        this.posts = posts;
    }

    loadPosts(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/lent/' + this.type, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE){
                this.setPosts(JSON.parse(xhr.response));
            }
        }.bind(this);
        xhr.send();
    }

    @action
    setType(type){
        this.type = type;
        //this.posts = [];
        this.loadPosts();
    }
}

export default PostListStore;
