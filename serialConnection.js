const {SerialPort} = require('serialport')

const serialport = new SerialPort({ path: 'COM3', baudRate: 19200 })
serialport.write(Buffer.from('0201FF4CFF01FF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF03', 'hex'))