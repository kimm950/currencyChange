import nodeNotifier from "node-notifier"
import dayjs from 'dayjs'
import getCurrency from './scrape'
// import sendEmail from './sendEmail'

async function getCurrencyRate(): Promise<void | null> { 
  try { 
    const border = () => console.log('='.repeat(50))
    console.clear()
    const time = dayjs().format('YYYY/MM/DD hh:mm A')
    const { won, dollar } = await getCurrency()
    const message = `1 JPY is \nKRW: ${won} \nUSD: ${dollar} \ntoday at ${time}`
    const nodeNotifierConfig = {
      title: "Today's Currency",
      message,
      sound: true, 
      wait: true,
      closeLabel: 'close'
    }
    nodeNotifier.notify(nodeNotifierConfig)
    // sendEmail(message)
    border()
    console.log('KRW:', won)
    console.log('USD:', dollar)
    console.log('Time:', time);
    border()
  } catch (e) {
    console.error(e)
    return null
  }
}

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
const HALF_DAY = ONE_HOUR * 12
const QUARTER_DAY = ONE_HOUR * 6

getCurrencyRate()

setInterval(() => { 
  getCurrencyRate()
},ONE_HOUR)
