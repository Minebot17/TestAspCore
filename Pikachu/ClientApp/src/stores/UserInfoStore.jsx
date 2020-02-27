import { observable, action } from 'mobx';
import { setCookie, getCookie } from "../cookies.jsx";

class UserInfoStore {
    @observable login;
    @observable email;
    @observable password;
    @observable rating;

    @action
    setUserData(user){
        this.login = user.login;
        this.email = user.email;
        this.password = user.password;
        this.rating = user.rating;
    }

    @action
    logout(){
        this.login = undefined;
        this.email = undefined;
        this.password = undefined;
        this.rating = undefined;
    }

    updateUserInfo(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/user/lk', true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200){
                this.setUserData(JSON.parse(xhr.response));
            }
        }.bind(this);
        xhr.send();
    }
}

export default UserInfoStore;
