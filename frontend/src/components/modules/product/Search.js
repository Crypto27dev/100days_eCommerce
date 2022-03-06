import './Search.css';
import { useState } from 'react';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';

function Search() {

    let navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <div>

            <MetaData title="Search A Product -- Ecommerce" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>

        </div>
    )
}

export default Search;
