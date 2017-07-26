const http = require('http')
const cheerio = require('cheerio')

function queryIMDP(search, callBack) {
  const request = http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${search}&s=all`
  }, (res) => {
    var html = ''
    res.on('data', (chunk) => { html += chunk })
    res.on('end', () => {
      const movieTitles = getMovieTitles(html)
      callBack(null, movieTitles)
    })
  })
  request.on('error', callBack)
}



function getMovieTitles(html) {
  const $ = cheerio.load(html)
  const movieNames = $('.findSection')
    // .first()
    .find('.result_text')
    .map((index, element) => $(element).text())
    .toArray()
    // .get().join('')
  // console.log('------------------------------------');
  // console.log(movieNames);
  // console.log('------------------------------------');
  return movieNames
}

function run() {
  const search = process.argv.slice(2).join('+')

  queryIMDP(search, (error, movieNames) => {
    if (error) throw error 
    console.log(movieNames.join('\n'))
  }) 
}

if (!module.parent) {
  run()
}