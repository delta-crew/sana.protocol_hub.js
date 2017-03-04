let _callbacks = {};

function generateToken(size) {
  let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(size).join().split(',').map(function() {
    return s.charAt(Math.floor(Math.random() * s.length));
  }).join('');
}

class AppDispatcher {
  register(cb) {
    let token = generateToken(10);
    while(_callbacks[token]) {
      token = generateToken(10);
    }
    _callbacks[token] = cb;
    return token;
  }

  unregister(token) {
    if(!_callbacks[token]) {
      return;
    }
    delete _callbacks[token];
  }

  notify(token, action) {
    if(!_callbacks[token]) {
      return;
    }
    _callbacks[token](action);
  }
}

export default new AppDispatcher();
