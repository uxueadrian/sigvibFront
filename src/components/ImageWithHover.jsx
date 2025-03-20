import React, { useState } from "react";
import "../styles/imagenes.css";

const ImageWithHover = ({ image }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="image-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={image.url} alt={image.alt} />
            {isHovered && (
                <button className="add-button" onClick={() => console.log("Agregar imagen")}>
                    Agregar
                </button>
            )}
        </div>
    );
};

export default ImageWithHover;