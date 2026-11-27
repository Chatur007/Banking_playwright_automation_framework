import{test} from '@playwright/test'
import data from '../JsonData/bankingCustomerData.json'
import Login from '../POM/login'
import Transfer from '../POM/transfer'
import GetDetails from '../POM/getTranctionDetails'
test("Test case 2",async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()

    const url = data.testcase2.url
    await page.goto(url)
    let login = new Login(page)
    let username = data.testcase2.userName
    let password = data.testcase2.password
    await login.login(username,password)
    
    let transferto  = data.testcase2.transferDetails.transferType.my
    let transfer = new Transfer(page,transferto)
    let from = data.testcase2.transferDetails.from
    let to =  data.testcase2.transferDetails.to
    let amt = data.testcase2.transferDetails.amount
    await transfer.moneyTransfer(from,to,amt,password)
    let getDetails = new GetDetails(page)
    await getDetails.getDetails(to)
})