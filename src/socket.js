class Socket {
  constructor() {
    this.socket = new WebSocket('wss://227.0.0.1');
    this.socket.onmessage = this.listen;
    this.socket.onopen = () => {
      console.log('connection ready');
      this.sendName('sai');
    };
    this.socket.onclose = event => {
      if (!event.wasClean) {
        console.log(`Connection aborted, code ${event.code}`);
      }
    };

    window.addEventListener('beforeunload', () => {
      this.socket.close(1000);
    });
  }

  sendMessage(message) {
    this.socket.send(message);
  }

  sendName(name) {
    const message = JSON.stringify({
      action: 'name',
      payload: {
        newName: name
      }
    });
    this.sendMessage(message);
  }

  sendSeat(color) {
    const message = JSON.stringify({ action: 'seat', payload: { color } });
    this.sendMessage(message);
  }

  sendMove(color, coords) {
    const message = JSON.stringify({
      action: 'move',
      payload: {
        color,
        coords,
      }
    });
    this.sendMessage(message);
  }

  requestRevert() {
    const message = JSON.stringify({ action: 'revert' });
    this.sendMessage(message);
  }

  confirmRevert() {
    const message = JSON.stringify({ action: 'confirm' });
    this.sendMessage(message);
  }

  // eslint-disable-next-line class-methods-use-this
  listen(event) {
    const message = event.data;
    console.log(message);
  }
}

export default new Socket();
