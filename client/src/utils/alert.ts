import eventBus, { Events } from "./EventBus"

const showAlert = (title: string, text: string) => {
    eventBus.publish(Events.ALERT, {
        title,
        text
    });
}

export default showAlert;