export class Usuario {

    _id?: number;
    username: string;
    password: string;
    

    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}