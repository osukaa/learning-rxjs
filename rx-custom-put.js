const Rx = require('rxjs/rx')
const wreck = require('wreck')

const operation = (uri) => Rx.Observable.create((observable) => {
    observable.next('Trying to do a PUT')
    wreck.put(uri, { json: true }, (err, response, payload) => {
        if (err) {
            return observable.error(err)
        }
        observable.complete()
    })
})

// operation('https://jsonplaceholder.typicode.com/users/1')
// .retryWhen((attempts) => {
    
// })
// .subscribe(
//     (message) => console.log(message),
//     (err) => console.log(err),
//     () => console.log('Operation is complete')
// )

operation('https://jsonplaceholder.typicode.com/malformed')
.retryWhen((attempts) => {
	return attempts.zip(Rx.Observable.range(1,5), (a, i) => i * 1000)
		.flatMap((i) => Rx.Observable.of(1).delay(i))
})
.subscribe(
    (message) => console.log(message),
    (err) => console.log(err),
    () => console.log('Operation is complete')
)
