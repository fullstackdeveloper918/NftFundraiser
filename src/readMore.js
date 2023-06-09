
import React, { useState } from "react";

const ReadMore = ({ data }) => {

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className="text">
            <span className="mt-0 mb-2" dangerouslySetInnerHTML={{ __html: isReadMore ? data?.slice(0, 1000) : data }} />
            {data?.length > 1000 &&

                <span onClick={toggleReadMore} className="read-or-hide">
                    {isReadMore ? "...read more" : " show less"}
                </span>
            }
        </p>
    );
};

export default ReadMore