import React from 'react';

// create meme component to house all meme data
const Meme = ({ template, onClick}) => {
    return (
    <img className="meme"
        style={{ width:300}}
        key={template.id} 
        src={template.url} 
        alt={template.name} 
        onClick={onClick}
        />
    );
};

export default Meme;