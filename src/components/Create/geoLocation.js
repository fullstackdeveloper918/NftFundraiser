import React, { useEffect, useState, useRef } from "react";
import Geonames from "geonames.js";
import PropTypes from "prop-types";
import axios from "axios";
const geonames = new Geonames({
    username: "fullstackdeveloper91",
    lan: "en",
    encoding: "JSON"
});
// const useStyles = makeStyles(theme => ({
//     formControl: {
//         minWidth: "100%",
//         // background: 'black',
//         // color: "#FFF"
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2)
//     }
// }));
export default function GeoLocation(props) {
    // const classes = useStyles();
    const { locationTitle, geoId, onChange, isCountry } = props;
    const [options, setOptions] = useState([]);
    // console.log(options, 'opttt')
    const [currentItem, setCurrentItem] = useState("");
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        {
            !currentItem && (
                setCurrentItem(props?.selected)
            )
        }
    }, [props]);
    // http://api.geonames.org/countryInfoJSON?username=fullstackdeveloper91&lang=en
    // https://secure.geonames.org/countryInfoJSON?username=jhon_doe&lang=en
    useEffect(() => {
        try {
            const data = async () => {
                (await isCountry)
                    ? axios?.get(`https://secure.geonames.org/countryInfoJSON?username=fullstackdeveloper91&lang=en`)?.then(res => {
                        // 
                        setOptions(res);
                        console.log(res, "countries")
                    })
                    // "https://secure.geonames.org/childrenJSON?geonameId=" + id
                    : axios?.get(`https://secure.geonames.org/childrenJSON?username=fullstackdeveloper91&lang=en&geonameId=${geoId}`)?.then(res => {
                        setOptions(res);
                        console.log(res, "cities")
                    });
            };
            data();
        } catch (err) {
            console.error(err);
        }
    }, [geoId, isCountry]);
    const inputLabel = useRef(null);
    const handleChange = e => {
        setCurrentItem(e.target.value);
        onChange(e.target.value);
    };

    return (
        <form >
            <label ref={inputLabel} id="demo-simple-select-outlined-label" style={{ display: 'none' }}>
                {locationTitle}
            </label>
            <select
                label="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={currentItem}
                onChange={handleChange}
                labelWidth={labelWidth}
            >
                <option value="" disabled selected style={{ color: "#495057" }}>Select </option>
                {options?.data?.geonames?.map((v, index) => (
                    <option key={index} value={v?.geonameId}>
                        {isCountry ? v?.countryName : v?.name}
                    </option>
                ))}
            </select>
        </form>
    );
}
GeoLocation.propTypes = {
    locationTitle: PropTypes.string,
    geoId: PropTypes.node,
    isCountry: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};
GeoLocation.defaultProps = {
    onChange: undefined
};