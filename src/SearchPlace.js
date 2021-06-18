import React, { useState } from "react";
import MapContainer from "./MapContainer.js";

const SearchPlace = () => {
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputText.replace(/^\s+|\s+$/g, '')) {
            alert('검색어를 입력해주세요!');
            return false;
        }

        setPlace(inputText);
    };

    return (
        <>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    placeholder="Search Place..."
                    onChange={onChange}
                    value={inputText}
                />
                <button type="submit">검색</button>
            </form>
            <MapContainer searchPlace={place} />
        </>
    );
};

export default SearchPlace;