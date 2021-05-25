var _ = require('lodash');
var amqp = require("amqplib");

class MessageBroker {
  constructor() {
    this.queues = {};
  }

  async init() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel()
  }

  async close() {
    if (this.channel) await this.channel.close();
    await this.connection.close();
  }

  /**
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */
  async send(queue, msg) {
    if (!this.connection) {
      await this.init();
    }
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.sendToQueue(queue, msg);
  }

  /**
   * @param {String} queue Queue name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe(queue, handler) {
    if (!this.connection) {
      await this.init();
    }

    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues[queue], (h) => h === handler);
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }
      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.queues[queue] = [handler];
    this.channel.consume(queue, async (msg) => {
      const ack = _.once(() => this.channel.ack(msg));
      this.queues[queue].forEach((h) => h(msg, ack));
    });
    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue, handler) {
    _.pull(this.queues[queue], handler);
  }
}

module.exports = {MessageBroker};