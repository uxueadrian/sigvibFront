import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'

function Modals ({isOpen, onClose, title, children, actions}) {
    return(
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "500px", 
                    borderRadius: "10px", 
                },
            }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{
            actions || (
                <>
                    <button onClick={onClose} color="primary">Cerrar</button>
                    <button onClick={onClose} color="primary">Agregar</button>
                </>
            )}
        </DialogActions>
        </Dialog>
    );
}

export default Modals;

