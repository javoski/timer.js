### A Simplest JavaScript Timer

#### Usage

```html
<script type="text/javascript" src="..path/timer.js"></script>
```

```javascript
var timer = new Timer({
    interval: 1000, //ms
    duration: 5,
    ticking: function(current, total){
        console.log('progress on:' + current + '/' + total)
    },
    finish: function(isFinished){
        if(isFinished){
            console.log('Is finished')
        }else{
            console.log('Is stopped')
        }
    }
})
timer.start([duration | options])
```