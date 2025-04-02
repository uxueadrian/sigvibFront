import { PDFDownloadLink } from "@react-pdf/renderer"
import { Button } from "@mui/material"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import BienPDFDocument from "./pdf-generator"

const DownloadPDFButton = ({ bienes, user }) => (
  <PDFDownloadLink
    document={<BienPDFDocument bienes={bienes} user={user} />}
    fileName={`reporte-bienes-${new Date().toISOString().split("T")[0]}.pdf`}
    style={{ textDecoration: "none" }}
  >
    {({ blob, url, loading, error }) => (
      <Button
        variant="contained"
        color="primary"
        startIcon={<PictureAsPdfIcon />}
        disabled={loading}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {loading ? "Generando PDF..." : "Descargar Reporte PDF"}
      </Button>
    )}
  </PDFDownloadLink>
)

export default DownloadPDFButton

