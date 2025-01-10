import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setProject(conf.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const account = await this.account.create(ID.unique(),email,password,name);
            if(account) {
              //Call another method
              return this.Login({email,password});
            } else {
                return account;
            }
        } catch (error) {
            throw error;
        }
    }

    async Login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async Logout(){
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log("Logout:",error);
        }
    }

    async userStatus(){
        try {
            return await this.account.get();
        } catch (error) {
           console.log('Account Status:',error);
        }
        return null;
    }

} 


const authService = new AuthService()

export default authService;