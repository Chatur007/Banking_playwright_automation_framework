import { Page,Locator,expect } from "@playwright/test";
import data from '../JsonData/bankingCustomerData.json'

class GetDetails{
    page:Page
    statementButton:Locator
    selectAccount:Locator
    selectAccountOption:Locator
    table:Locator
    rowData:Locator
    constructor(page:Page){
        this.page=page
        this.statementButton = page.locator(`//a[@title="Statements"]`)
        this.selectAccount = page.locator(`//button[@id="stmt-account"]`)
        this.selectAccountOption=page.locator(`//button[@id="stmt-account"]/following-sibling::select`)
        this.table=page.locator(`//table[@data-testid="statement-table"]`)
        this.rowData = page.locator(`//tr[@class="border-t border-border"]`)
    }

    async getDetails(accountOption:string){
        await this.statementButton.click()
        await this.selectAccount.click()
        await this.selectAccountOption.selectOption(accountOption)
        await this.table.click({force:true})
        let content = await this.rowData.nth(0).innerText()
        let format = Number(data.testcase1.transferDetails.amount).toLocaleString('en-IN')
        expect(content).toContain('Credit');
        expect(content).toContain(`₹${format}.00`);
        expect(content).toContain('completed');
    }
}


export default GetDetails