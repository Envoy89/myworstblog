export interface IEventData {
    [key: string]: string
}

type f = (data: IEventData) => void;

export enum Events {
    ALERT
}

class EventBus {
    channels: Map<Events, f[]>;

    constructor() {
        this.channels = new Map();
    }

    subscribe (channelName: Events, listener: (data: IEventData) => void) {
        if (!this.channels.get(channelName)) {
            this.channels.set(channelName, []);
        }
        this.channels.get(channelName)?.push(listener);
    }
  
    publish (channelName: Events, data: IEventData) {
      const channel = this.channels.get(channelName);
      if (!channel || !channel.length) {
        return
      }
  
      channel.forEach(listener => listener(data))
    }
}

const eventBus = new EventBus();

export default eventBus;