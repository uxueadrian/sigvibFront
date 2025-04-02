import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1976d2",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    color: "#0d47a1",
    borderBottom: "1px solid #DDDDDD",
    paddingBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  bienContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 12,
    width: "70%",
  },
  image: {
    width: 150,
    height: 100,
    objectFit: "contain",
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
    borderTop: "1px solid #DDDDDD",
    paddingTop: 10,
  },
  barcode: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    alignSelf: "center",
  },
})

const BienPDFDocument = ({ bienes, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Reporte de Bienes</Text>

      <View style={styles.section}>
        <Text style={styles.subheader}>Información del Lugar</Text>
        <View style={styles.row}>
          <Text style={styles.label}>ID del Lugar:</Text>
          <Text style={styles.value}>{user?.idLugar || "No especificado"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha del Reporte:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Listado de Bienes ({bienes.length})</Text>

        {bienes.map((bien, index) => (
          <View key={index} style={styles.bienContainer}>
            {bien.modelo.foto && <Image src={bien.modelo.foto || "/placeholder.svg"} style={styles.image} />}

            <View style={styles.row}>
              <Text style={styles.label}>Tipo:</Text>
              <Text style={styles.value}>{bien.tipoBien.nombre}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Marca:</Text>
              <Text style={styles.value}>{bien.marca.nombre}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Modelo:</Text>
              <Text style={styles.value}>{bien.modelo.nombreModelo}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Número de Serie:</Text>
              <Text style={styles.value}>{bien.nSerie || "No disponible"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={styles.value}>{bien.estado || "No especificado"}</Text>
            </View>

            {bien.codigoBarras && (
              <View style={styles.row}>
                <Text style={styles.label}>Código de Barras:</Text>
                <Text style={styles.value}>{bien.codigoBarras}</Text>
              </View>
            )}

            {bien.descripcion && (
              <View style={styles.row}>
                <Text style={styles.label}>Descripción:</Text>
                <Text style={styles.value}>{bien.descripcion}</Text>
              </View>
            )}

            {bien.observaciones && (
              <View style={styles.row}>
                <Text style={styles.label}>Observaciones:</Text>
                <Text style={styles.value}>{bien.observaciones}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <Text style={styles.footer}>Documento generado el {new Date().toLocaleString()}</Text>
    </Page>
  </Document>
)

export default BienPDFDocument

