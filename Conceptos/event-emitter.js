// Esta es la forma nativa que maneja NodeJS para los eventos
const EventEmitter = require('events');

class Payment extends EventEmitter {
  pay(callback) {
    console.log('Iniciando Pago...');
    this.emit('inicio');
    callback();
  }
}

const payment = new Payment();

// ? Escuchando eventos

payment.on('inicio', () => {
  console.log('Realizando pago, espere..');
});

payment.on('completado', () => {
  console.log('Pago realizado ... Gracias');
  console.log('Finalizando pago...');
});

payment.pay(() => {
  return setTimeout(() => {
    console.log('LISTO gracias por su pago');
    payment.emit('completado');
  }, 500);
});
