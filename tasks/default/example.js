let handlers = Symbol('handlers');

function makeObservable(target) {

	target[handlers] = [];

	target.observe = (handler) => target[handlers].push(handler);
  
  return new Proxy(target, {
    set(target, prop, val, receiver) {
    	let success = Reflect.set(target, prop, val, receiver); 
  		if (success) {
  			target[handlers].forEach((handler) => handler(prop, val));
  		}
  		return success;
  	}
  });
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John