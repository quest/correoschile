# correoschile

Check shipping status in correoschile

## Instalation

```bash
npm i --save correoschile
```

## Usage

```js
var chilexpress = require('chilexpress');

correoschile('111111111111')
    .then(function(res){
        console.log(res); // {"information":{"envio":"111111111111","entregado_a":"","fecha_entrega":"20/04/2016 13:25","rut":""},"history":[{"state":"ENVIO ENTREGADO","datetime":"20/04/2016 13:25","place":"LAS CONDES CDP 10"},..]}
    })
    .catch(funciton(res) {
        // error :(
    });

```

## View online example

http://correoschile.herokuapp.com/
