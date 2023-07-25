import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { log } from "console";

function App() {
    const [data, setData] = useState([]);
    const [getCountry, setCountry] = useState();
    const [getState, setState] = useState([]);
    const [selectedState, setSelectedState] = useState();
    const [cities, setCities] = useState([]);


    useEffect(() => {
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json').then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const country = [... new Set(data.map(item => item.country))];
    country.sort();


    const handleCountry = (e) => {
        let states = data.filter(state => state.country === e.target.value);
        states = [...new Set(states.map(item => item.subcountry))];
        states.sort();
        setState(states);
    }

    const handlState = (e) => {
        let cities = data.filter(city => city.subcountry === e.target.value);
        setCities(cities)
    }

    return (
        <div>
            <div>
                <label>Country:</label>
                <select onChange={(e) => handleCountry(e)}>
                    <option value="">Select Country</option>
                    {country.map(items => <option key={items} value={getCountry}>{items}</option>)}
                </select>
            </div>

            <div>
                <label>State:</label>
                <select onChange={(e) => handlState(e)}>
                    <option value="">Select State</option>
                    {getState.map(items => <option key={items} value={selectedState}>{items}</option>)}
                </select>
            </div>

            <div>
                <label>City:</label>
                <select >
                    <option value="">Select State</option>
                    {cities.map(items => <option key={items.name} >{items.name}</option>)}
                </select>
            </div>
        </div>
    )
}