'use strict';

const {createServer: serve} = require('http');
const {get} = require('https')
const { PORT: port = 3000} = process.env;
const pug = require('pug')


// request('http://api.chucknorris.io/jokes/random', (res) => {
//   console.log(res)
// })
const tmpl = `
html
  head
    title
  body
    img(src=icon_url)
    p.center=value
`;

const home = (r, w) => {
  let data = ''

  get('https://api.chucknorris.io/jokes/random', (resp) => {
  // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const options = JSON.parse(data);
      w.end(pug.render(tmpl, options));
    });
  });
};


serve(home)
  .listen(port, () => {
    console.log(`Server now running on port: ${port}...`)
  })
