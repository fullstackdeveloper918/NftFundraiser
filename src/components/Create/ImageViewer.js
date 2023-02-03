import React, { useEffect } from "react";
import { dataURLtoBlob } from "../../utils/blobfromurl";

export default function ImageViewer(props) {
    const { width, height } = props;
    const { vdo } = props

    const inputRef = React.useRef();

    const [source, setSource] = React.useState(null);

    // .mov,.mp4,.mp3

    useEffect(() => {
        // debugger
        const file = vdo;
        // const url = dataURLtoBlob(file)
        setSource(URL.createObjectURL(file))
        // if (file.length) {
        //     const url = window.URL?.createObjectURL(file);
        //     setSource(url);
        // }

    }, [vdo])


    // const handleChoose = (event) => {
    //     inputRef.current.click();
    // };

    return (
        <div className="VideoInput">
            {/* {!vdo && <button onClick={handleChoose}>Choose</button>} */}
            {source && (
                <img
                    className="VideoInput_video"
                    width="100%"
                    height={height}
                    // controls
                    src={source}
                />
            )}
            {/* <div className="VideoInput_footer">{vdo || "Nothing selectd"}</div> */}
        </div>
    );
}
