import { Page,Locator } from "@playwright/test";

class Login{
    locateBanking:Locator
    useName:Locator
    password:Locator
    loginButton:Locator
    constructor(page:Page){
        this.locateBanking = page.locator(`//a[@href="/banking"]`)
        this.useName= page.getByLabel('Username *',{exact:true})
        this.password = page.getByRole('textbox',{name:'password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
    }
    async login(username:string,password:string){
        await this.locateBanking.click()
        await this.useName.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}

export default Login