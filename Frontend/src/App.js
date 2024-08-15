import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setLoading(true);
            setResults([]);
            console.log(`Searching for: ${searchQuery}`); // Log the search query
            try {
                const response = await fetch(`/api/wiki-search?search=${searchQuery}`);
                const data = await response.json();
                console.log('Received data:', data); // Log the received data
                setResults(data.search_results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="wiki-search-header text-center">
                <img className="wiki-logo" src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png" alt="wiki-logo" />
                <br />
                <input
                    placeholder="Type a keyword and press Enter to search"
                    type="search"
                    className="search-input w-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            {loading && (
                <div id="spinner">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            )}
            <div id="searchResults">
                {results.map((result, index) => (
                    <div key={index} className="search-results">
                        <a className="result-title" href={result.link}>{result.title}</a>
                        <br />
                        <a className="link-description" href={result.link}>{result.link}</a>
                        <br />
                        <p>{result.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
