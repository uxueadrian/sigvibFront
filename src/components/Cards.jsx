import React from 'react';
import "../styles/Vista-BR.css";

const CardComponent = ({ image, title, description }) => {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            <button>Solicitar</button>
        </div>
    );
};

export default CardComponent;

