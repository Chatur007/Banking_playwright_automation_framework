import {test,expect} from '@playwright/test'
import Login from '../POM/login'
import data from '../JsonData/bankingCustomerData.json'
import Transfer from '../POM/transfer'
import GetDetails from '../POM/getTranctionDetails'


test("Test case 1",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    let url = data.testcase1.url
    await page.goto(url)

    //! Login
    let login = new Login(page)

    let userName = data.testcase1.userName
    let password = data.testcase1.password
    await login.login(userName,password)
    
    //! Transfer
    let transferDetails = data.testcase1.transferDetails.transferType.my
    let transfer = new Transfer(page,transferDetails)

    let fromAcc = data.testcase1.transferDetails.from
    let toAcc = data.testcase1.transferDetails.to
    let amount = data.testcase1.transferDetails.amount
    await transfer.moneyTransfer(fromAcc,toAcc,amount,data.testcase1.password)

    //! Get Details 

    let details = new GetDetails(page)
    await details.getDetails(data.testcase1.transferDetails.to)
    await page.waitForTimeout(3000)
})