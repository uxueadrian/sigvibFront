//../../../styles/feedback.js
import { styled } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";

export const CustomAlert = styled(Alert)(({ theme }) => ({
  borderRadius: '8px',
  fontWeight: 500,
  backgroundColor: theme.palette.background.paper,
}));

export const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    boxShadow: theme.shadows[6],
  },
}));
