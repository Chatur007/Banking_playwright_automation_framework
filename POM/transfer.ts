import { Page,Locator ,expect} from "@playwright/test";
class Transfer{
    page:Page
    transferButton:Locator
    transferType:Locator
    fromAccountButton:Locator
    fromAccountOptions:Locator
    toAccountButton:Locator
    toAccountOption:Locator
    amountInput:Locator
    reviewTransfer:Locator
    confirmPay:Locator
    enterPassword:Locator
    continuee:Locator
    close:Locator
    constructor(page:Page)
    constructor(page:Page,transferTypeLable:string)
    constructor(page:Page,transferTypeLable?:string)
    {
        this.page = page
        this.transferButton = page.locator('//a[@title="Transfers"]')
        this.transferType = page.locator(`//label[text()='${transferTypeLable||'Between my accounts'}']/child::input`)
        this.fromAccountButton = page.locator(`//button[@id="from-account"]`)
        this.fromAccountOptions = page.locator(`//button[@id="from-account"]/following-sibling::select`)
        this.toAccountButton =page.locator(`//button[@id="to-account"]`)
        this.toAccountOption = page.locator('//button[@id="to-account"]/following-sibling::select')
        this.amountInput = page.getByLabel('Amount (INR)')
        this.reviewTransfer = page.getByRole('button',{name:"Review transfer"})
        this.confirmPay = page.getByRole('button',{name:"Confirm & pay"})
        this.enterPassword=page.getByLabel('Password')
        this.continuee = page.getByRole('button',{name:"Continue"})
        this.close = page.locator(`//button[@data-testid="modal-close"]`)
    }
    async moneyTransfer(fromAccount:string,toAccount:string,amount:string,password:string){
        await this.transferButton.click()
        await this.fromAccountButton.click({force:true})
        let selectFrom=this.fromAccountOptions
        await selectFrom.selectOption({value:fromAccount})
        await this.toAccountButton.click({force:true})
        await this.toAccountButton.click()
        await this.toAccountOption.selectOption(toAccount)
        await this.amountInput.click({force:true})
        await this.amountInput.fill(amount)
        await this.reviewTransfer.click()
        await this.confirmPay.click()
        if(amount>="50000"){
            await this.enterPassword.fill(password)
            await this.continuee.click()
        }
        await expect(this.close).toBeVisible()
        await this.page.waitForTimeout(5000)
        await this.close.click()

    }
}

export default Transfer