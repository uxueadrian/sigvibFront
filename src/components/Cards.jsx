import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardComponent = ({ image, title, description }) => {
    return (
        <Card>
            <CardContent>
                <img src={image} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                
                <h3 variant="h5" component="div">{title}</h3>

                <p variant="body2" color="text.secondary">{description} </p>

            </CardContent>

            <button size="small">Solicitar</button>

        </Card>
    );
};

export default CardComponent;

