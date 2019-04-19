import SocketIOClient from 'socket.io-client';
export default class WSConnector {
  constructor(rootUrl, topicToSend, topicToReceive) {
    this.topicToSend = topicToSend;
    this.topicToReceive = topicToReceive;
    this.socket = SocketIOClient(rootUrl);
  }

  send(data) {
    if (this.topicToSendthis.topicToSend) this.socket.emit(this.topicToSend, JSON.stringify(data));
  }

  listen(callback) {
    this.socket.on(this.topicToReceive, callback);
  }
}
