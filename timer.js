;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Timer = factory())
}(this, function() {

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }

  function extend (dest, src) {
    for (var k in src) {
      if (src.hasOwnProperty(k)) {
        dest[k] = src[k]
      }
    }
    return dest
  }

  function Timer (options) {
    if (this instanceof Timer) {
      this.options = {
        interval: 1000
      }
      extend(this.options, options)
    } else {
      return new Timer(options)
    }
  }

  Timer.prototype.start = function (param) {
    if (typeof param === 'number') {
      this.options.duration = param
    } else if (typeof param === 'object') {
      extend(this.options, param)
    }
    this.startTime = new Date().getTime()
    this.currentIndex = 0
    this.stopFlag = false
    requestAnimationFrame(this._tick.bind(this))
    return this
  }

  Timer.prototype.stop = function () {
    this.stopFlag = true
    return this
  }

  Timer.prototype._tick = function () {
    var o = this.options
    var now = new Date().getTime()
    var current = Math.floor((now - this.startTime)/o.interval)
    if (current >= o.duration || this.stopFlag) {
      if (typeof o.finish === 'function')
        o.finish(!this.stopFlag)
      return
    }
    if (this.currentIndex !== current) {
      if (typeof o.ticking === 'function')
        o.ticking(current, o.duration)
      this.currentIndex = current
    }
    requestAnimationFrame(this._tick.bind(this))
  }

  return Timer

}))