import puppeteer from "puppeteer";

type TCurrency = {
  won: number,
  dollar: number
}

export default async function getCurrency(): Promise<TCurrency> {

  // Launch the browser
  const browser = await puppeteer.launch({ headless: 'new'});
  const page = await browser.newPage(); 

  const currencyUrl = (currency: string, isDollar: boolean) =>  `https://www.google.com/search?q=${isDollar ? 'dollar' : 'yen'}+to+${isDollar? 'yen': currency}+currency`
  const currencySelector = '#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.gsrt > span.DFlfde.SwHCTb'
  const waitUntil = 'networkidle2'
  
  await page.goto(currencyUrl('won', false), { waitUntil });
  const KRWcurrency = await page.$(currencySelector)
  const KRW = await KRWcurrency?.evaluate((cal: HTMLSpanElement) => cal.textContent)
  
  await page.goto(currencyUrl('dollar', true), { waitUntil });
  const USDcurrency = await page.$(currencySelector)
  const USD = await USDcurrency?.evaluate((cal: HTMLSpanElement) => cal.textContent)
  
  await page.close()
  await browser.close()

  const currencyrRes: TCurrency = {
    won: Number(KRW),
    dollar: Number(USD)
  }

  return currencyrRes
}