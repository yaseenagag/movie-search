const http = require('http')
const cheerio = require('cheerio')

function queryIMDP(search) {
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${search}&s=all`
  }, (res) => {
    var html = ''
    res.on('data', (chunk) => { html += chunk })
    res.on('end', () => {
      parseHTML(html)
    })
  })
}



function parseHTML(html) {
  const $ = cheerio.load(html)
  const movieNames = $('.result_text')
    .map((index, element) => $(element).text())
    .toArray()
    // .get().join('')
  console.log('------------------------------------');
  console.log(movieNames);
  console.log('------------------------------------');
}


queryIMDP("nemo")