import React, { useState } from 'react';

export function BoxMovies({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box-movies">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}