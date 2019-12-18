SSL = function (key, cert, port) {
  var httpProxy = Npm.require('http-proxy');
  var fs = Npm.require('fs');
  if (!port) {
    port = 443;
  };

  const [, , host, targetPort] = Meteor.absoluteUrl().match(/([a-zA-Z]+):\/\/([\-\w\.]+)(?:\:(\d{0,5}))?/)

  proxy = httpProxy.createServer({
    target: {
      host,
      port: targetPort
    },
    ssl: {
      key,
      cert
    },
    ws: true,
    xfwd: true
  }).listen(port);

  proxy.on('error', function (error) {
    console.error('HTTP-PROXY NPM MODULE ERROR', error);
    return;
  });
};