
import React from "react";

const Timer = (props) => {
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    const getTime = () => {
        const time = Date.parse(`${props.time}`) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    React.useEffect(() => {
        const interval = setInterval(() => getTime(`${props.time}`), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {days === 0 &&
                <div className="timer" role="timer">
                    {`${minutes}`.includes('-') ? (
                        <div className="col-12">
                            <div className="box main-box_count">
                                <span className="box-count">Sale Ended</span>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12">
                            <div className="box main-box_count">
                                <span className="box-count">
                                    <span id="day">{`${days}`}</span>
                                    <span className="text">DAYS</span>
                                </span>
                                <span className="box-count">
                                    <span id="hour">{`${hours}`}</span>
                                    <span className="text">HRS</span>
                                </span>
                                <span className="box-count">
                                    <span id="minute">{`${minutes}`}</span>
                                    <span className="text">MINS</span>
                                </span>
                                <span className="box-count">
                                    <span id="second">{`${seconds}`}</span>
                                    <span className="text">SECS</span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
export default Timer