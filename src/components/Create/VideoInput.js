import React, { useEffect } from "react";

export default function VideoAudioPLayer(props) {
    // 
    const { width, height } = props;
    const { vdo } = props

    const inputRef = React.useRef();

    const [source, setSource] = React.useState(null);

    // .mov,.mp4,.mp3

    useEffect(() => {
        // 
        const file = vdo;
        // const url = URL?.createObjectURL(file);
        setSource(file);

    }, [vdo])


    // const handleChoose = (event) => {
    //     inputRef.current.click();
    // };

    return (
        <div className="VideoInput">
            {/* {!vdo && <button onClick={handleChoose}>Choose</button>} */}
            {source && (
                <video
                    className="VideoInput_video"
                    width="100%"
                    height={height}
                    controls
                    src={source}
                />
            )}
            {/* <div className="VideoInput_footer">{vdo || "Nothing selectd"}</div> */}
        </div>
    );
}
