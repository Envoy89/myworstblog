import React, { useState } from 'react';
import eventBus, { Events, IEventData } from '../../utils/EventBus';

interface IAlert {
    title: string,
    text: string
}

const Alert = () => {
    const [data, setData] = useState<IEventData | null>(null);

    eventBus.subscribe(Events.ALERT, (data) => { setData(data); })

    if (data) {
        return (
            <div className="popupcontainer">
                <div className="row popup">
                    <div className="col s12 m6">
                    <div className="card blue-grey darken-1 popupcontent">
                        <div className="card-content white-text">
                            <span className="card-title">{data["title"]}</span>
                            <p>{`${data["text"]}`}</p>
                        </div>
                        <div className="card-action">
                        <a onClick={() => setData(null)}>Ok</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Alert;