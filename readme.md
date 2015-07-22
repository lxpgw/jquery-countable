# jquery-countable

> A plugin make counter of an dom easy.


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/lichunqiang/jquery-jquery-countable/master/dist/jquery.jquery-countable.min.js
[max]: https://raw.githubusercontent.com/lichunqiang/jquery-jquery-countable/master/dist/jquery.jquery-countable.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-countable.min.js"></script>
<script>
  jQuery(function ($) {
    $('#counter').countable({
      from: 0,
      to: 100,
    });
  });
</script>
```

## APIs

### from 

the start number

### to

the destination number

### duration

the duration of the counter to finish.

### decimals

default is 0, if your want count like to 10.2, you should point it out as 1, otherwise it will counter with integer.

### Promise

This support promise, like this:

```
var promise = $('#counter').countable('start').data('counter').$promise;
promise.then(function() {
  console.log('finished');
  });
````

## Demo

Maybe, you can look at the [demo]() directly.....


## Test

```bash
$ npm run test
```

## License

MIT © [lxpgw](http://www.lxpgw.com)
