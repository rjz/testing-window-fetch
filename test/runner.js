var context = require.context('../src', true, /_spec\.js$/);

require('whatwg-fetch');

// Include `Function.prototype.bind` for older phantomjs installs
require('es5-shim');

context.keys().forEach(context);

