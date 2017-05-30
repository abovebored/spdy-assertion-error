var spdy = require('spdy')
var fs = require('fs')

var options = {
  key: fs.readFileSync(__dirname + '/keys/server.key'),
  cert: fs.readFileSync(__dirname + '/keys/server.crt')
}

var server = spdy.createServer(options, (req, res) => {
  res.writeHead(200)

  var images = ''

  for (i = 0; i <= 500; i++) { 
    let file = '/images/' + i + '.jpg'
    let readfile = fs.readFileSync(__dirname + file)
    let stream = res.push(file, {
      status: 200,
      method: 'GET',
      request: {
        accept: '*/*'
      },
      response: {
        'content-type': 'image/jpeg'
      }
    })

    stream.on('error', err => {})

    images += '<img src="./images/' + i + '.jpg">'

    console.log('Pushed: '+file)

    stream.end(readfile)
  }

  res.end('<html><body>'+images+'</body></html>')
})

server.listen(3000)

console.log('Server running at http://127.0.0.1:3000/');
