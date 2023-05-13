import React, { useEffect } from "react";
import { dataURLtoBlob } from "../../utils/blobfromurl";
export default function ImageViewer(props) {
    const { width, height } = props;
    const { vdo } = props
    const [source, setSource] = React.useState(null);
    // .mov,.mp4,.mp3
    useEffect(() => {
        // 
        const file = vdo;
        // const url = dataURLtoBlob(file)
        setSource(URL.createObjectURL(file))
    }, [vdo])
    return (
        <div className="VideoInput">
            {source && (
                <img
                    className="VideoInput_video"
                    width="100%"
                    height={height}
                    // controls
                    src={source}
                />
            )}
        </div>
    );
}
