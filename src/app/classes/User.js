export default class User {
    token:string;

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }

}
