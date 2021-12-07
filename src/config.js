var endpoint = 'http://localhost:4000/api/'
if (process.env.NODE_ENV === 'production') {
   endpoint = 'https://ogidipharm.herokuapp.com/api/';
}

module.exports = endpoint;