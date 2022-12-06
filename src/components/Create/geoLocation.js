import React, { useEffect, useState, useRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Geonames from "geonames.js";
import PropTypes from "prop-types";
import axios from "axios";
import { Api } from "@mui/icons-material";
const geonames = new Geonames({
    username: "fullstackdeveloper91",
    lan: "en",
    encoding: "JSON"
});
const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: "100%",
        // background: 'black',
        // color: "#FFF"
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));
export default function GeoLocation(props) {
    const classes = useStyles();
    const { locationTitle, geoId, onChange, isCountry } = props;
    const [options, setOptions] = useState([]);
    console.log(options, 'opttt')
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
                    ? axios.get(`http://api.geonames.org/countryInfoJSON?username=fullstackdeveloper91&lang=en`)?.then(res => {
                        // debugger
                        setOptions(res);
                    })
                    // "https://secure.geonames.org/childrenJSON?geonameId=" + id
                    : axios.get(`http://api.geonames.org/childrenJSON?username=fullstackdeveloper91&lang=en&geonameId=${geoId}`)?.then(res => {
                        setOptions(res);
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
        <FormControl className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {locationTitle}
            </InputLabel>
            <select
                labelId="demo-simple-select-outlined-label"
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
        </FormControl>
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