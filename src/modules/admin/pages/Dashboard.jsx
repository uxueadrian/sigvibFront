"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material"
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  BrandingWatermark as BrandIcon,
  ViewModule as ModelIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Fullscreen as FullscreenIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import logo1 from "../../../components/logo1.png"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBienes: 0,
    bienesBaja: 0,
    totalTipos: 0,
    totalMarcas: 0,
    totalModelos: 0,
    totalLugares: 0,
  })
  const [recentBienes, setRecentBienes] = useState([])
  const [recentBajas, setRecentBajas] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [chartData, setChartData] = useState({
    tiposBien: [],
    marcas: [],
    activosVsBajas: [],
    tendencia: [],
    modelos: [],
    lugares: [],
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  const fetchData = async () => {
    setRefreshing(true)
    try {
      // Fetch all data in parallel
      const [bienesRes, tiposRes, marcasRes, modelosRes, lugaresRes] = await Promise.all([
        axios.get("http://localhost:8080/bienes"),
        axios.get("http://localhost:8080/tipo-bien"),
        axios.get("http://localhost:8080/marca"),
        axios.get("http://localhost:8080/modelo"),
        axios.get("http://localhost:8080/lugares"),
      ])

      const bienes = bienesRes.data.result
      const activeBienes = bienes.filter((bien) => bien.status)
      const inactiveBienes = bienes.filter((bien) => !bien.status)
      const tipos = tiposRes.data.result
      const marcas = marcasRes.data.result
      const modelos = modelosRes.data.result
      const lugares = lugaresRes.data.result

      // Get 5 most recent active bienes
      const sortedActiveBienes = [...activeBienes]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5)
        .map((bien) => ({
          id: bien.idBien,
          nSerie: bien.nSerie,
          tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
          marca: bien.marca ? bien.marca.nombre : "Sin asignar",
          modelo: bien.modelo ? bien.modelo.nombreModelo : "Sin asignar",
          imagen: bien.modelo && bien.modelo.foto ? bien.modelo.foto : null,
          fecha: new Date(bien.fecha).toLocaleDateString(),
        }))

      // Get 5 most recent bajas
      const sortedBajas = [...inactiveBienes]
        .filter((bien) => bien.bajas && bien.bajas.length > 0)
        .sort((a, b) => {
          const lastBajaA = a.bajas[a.bajas.length - 1]
          const lastBajaB = b.bajas[b.bajas.length - 1]
          return new Date(lastBajaB.fecha) - new Date(lastBajaA.fecha)
        })
        .slice(0, 5)
        .map((bien) => ({
          id: bien.idBien,
          nSerie: bien.nSerie,
          tipoBien: bien.tipoBien ? bien.tipoBien.nombre : "Sin asignar",
          motivo: bien.bajas[bien.bajas.length - 1].motivo,
          fecha: new Date(bien.bajas[bien.bajas.length - 1].fecha).toLocaleDateString(),
        }))

      // Prepare chart data
      // 1. Tipos de bien chart data
      const tiposBienData = tipos
        .map((tipo) => {
          const count = activeBienes.filter((bien) => bien.tipoBien && bien.tipoBien.idTipo === tipo.idTipo).length
          return {
            name: tipo.nombre,
            value: count,
          }
        })
        .filter((item) => item.value > 0)

      // 2. Marcas chart data
      const marcasData = marcas
        .map((marca) => {
          const count = activeBienes.filter((bien) => bien.marca && bien.marca.idMarca === marca.idMarca).length
          return {
            name: marca.nombre,
            value: count,
          }
        })
        .filter((item) => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)

      // 3. Modelos chart data
      const modelosData = modelos
        .map((modelo) => {
          const count = activeBienes.filter((bien) => bien.modelo && bien.modelo.idModelo === modelo.idModelo).length
          return {
            name: modelo.nombreModelo,
            value: count,
          }
        })
        .filter((item) => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)

      // 4. Lugares chart data
      const lugaresData = lugares
        .map((lugar) => {
          const count = activeBienes.filter((bien) => bien.lugar && bien.lugar.idlugar === lugar.idlugar).length
          return {
            name: lugar.lugar || "Sin asignar",
            value: count,
          }
        })
        .filter((item) => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)

      // 5. Activos vs Bajas
      const activosVsBajasData = [
        { name: "Activos", value: activeBienes.length },
        { name: "Bajas", value: inactiveBienes.length },
      ]

      // 6. Tendencia mensual (simulada para demostración)
      // En un caso real, agruparíamos los bienes por mes de creación
      const currentDate = new Date()
      const tendenciaData = []

      for (let i = 5; i >= 0; i--) {
        const month = new Date(currentDate)
        month.setMonth(currentDate.getMonth() - i)
        const monthName = month.toLocaleString("default", { month: "short" })

        // Simulamos datos para la demostración
        // En un caso real, filtrarías los bienes por mes
        const activos = Math.floor(Math.random() * 10) + activeBienes.length / 6
        const bajas = Math.floor(Math.random() * 5) + inactiveBienes.length / 6

        tendenciaData.push({
          name: monthName,
          activos: activos,
          bajas: bajas,
        })
      }

      setStats({
        totalBienes: activeBienes.length,
        bienesBaja: inactiveBienes.length,
        totalTipos: tiposRes.data.result.length,
        totalMarcas: marcasRes.data.result.length,
        totalModelos: modelosRes.data.result.length,
        totalLugares: lugaresRes.data.result.length,
      })

      setChartData({
        tiposBien: tiposBienData,
        marcas: marcasData,
        activosVsBajas: activosVsBajasData,
        tendencia: tendenciaData,
        modelos: modelosData,
        lugares: lugaresData,
      })

      setRecentBienes(sortedActiveBienes)
      setRecentBajas(sortedBajas)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const StatCard = ({ title, value, icon, color, secondaryText }) => (
    <Card
      sx={{
        height: "100%",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        borderRadius: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        background: `linear-gradient(135deg, ${color}15 0%, white 100%)`,
        border: `1px solid ${color}30`,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px 0 rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom fontWeight="500">
              {title}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold" color={color}>
              {value}
            </Typography>
            {secondaryText && (
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {secondaryText.icon}
                <span style={{ marginLeft: "4px" }}>{secondaryText.text}</span>
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}20`,
              color: color,
              width: 60,
              height: 60,
              boxShadow: `0 4px 10px 0 ${color}30`,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )

  const ChartCard = ({ title, icon, color, children }) => (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        border: `1px solid ${color}30`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: `${color}20`, color: color, mr: 2 }}>{icon}</Avatar>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50">
            {title}
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Más información">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pantalla completa">
            <IconButton size="small">
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Más opciones">
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ height: 300, width: "100%" }}>{children}</Box>
    </Paper>
  )

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
          Cargando panel de control...
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header with Logo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "center" },
          mb: 4,
          pb: 3,
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              mr: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: 60, md: 70 },
                height: { xs: 60, md: 70 },
                borderRadius: "50%",
                backgroundColor: "rgba(157, 78, 221, 0.08)",
                border: "1px solid rgba(157, 78, 221, 0.2)",
                position: "relative",
                boxShadow: "0 4px 15px rgba(157, 78, 221, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: -3,
                  left: -3,
                  right: -3,
                  bottom: -3,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(157, 78, 221, 0.2) 0%, rgba(180, 120, 255, 0.1) 100%)",
                  zIndex: -1,
                },
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(157, 78, 221, 0.4)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 10px rgba(157, 78, 221, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(157, 78, 221, 0)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={logo1}
                alt="SIGVIB Logo"
                sx={{
                  width: "75%",
                  height: "75%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #9D4EDD 30%, #B478FF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              SIGVIB
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DashboardIcon fontSize="small" sx={{ color: "#9D4EDD" }} />
              Panel de Control y Estadísticas
            </Typography>
          </Box>
        </Box>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchData}
          disabled={refreshing}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 10px 0 rgba(157, 78, 221, 0.3)",
            background: "linear-gradient(45deg, #9D4EDD 30%, #B478FF 90%)",
            "&:hover": {
              boxShadow: "0 6px 15px 0 rgba(157, 78, 221, 0.4)",
            },
          }}
        >
          {refreshing ? "Actualizando..." : "Actualizar datos"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Bienes Activos"
            value={stats.totalBienes}
            icon={<InventoryIcon />}
            color="#4caf50"
            secondaryText={{
              icon: <ArrowUpwardIcon fontSize="small" color="success" />,
              text: "Activos",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title="Bienes de Baja"
            value={stats.bienesBaja}
            icon={<WarningIcon />}
            color="#f44336"
            secondaryText={{
              icon: <ArrowDownwardIcon fontSize="small" color="error" />,
              text: "Inactivos",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard title="Tipos de Bien" value={stats.totalTipos} icon={<CategoryIcon />} color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard title="Marcas" value={stats.totalMarcas} icon={<BrandIcon />} color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard title="Modelos" value={stats.totalModelos} icon={<ModelIcon />} color="#9c27b0" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard title="Lugares" value={stats.totalLugares} icon={<LocationIcon />} color="#607d8b" />
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              borderRadius: 3,
              mb: 3,
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  py: 2,
                  fontWeight: 500,
                },
              }}
            >
              <Tab icon={<BarChartIcon />} label="Distribución" iconPosition="start" />
              <Tab icon={<PieChartIcon />} label="Comparativas" iconPosition="start" />
              <Tab icon={<TimelineIcon />} label="Tendencias" iconPosition="start" />
            </Tabs>
            <Box sx={{ p: 3, display: tabValue === 0 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Distribución por Tipo de Bien" icon={<CategoryIcon />} color="#2196f3">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={chartData.tiposBien} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                        <YAxis />
                        <RechartsTooltip formatter={(value, name) => [`${value} bienes`, "Cantidad"]} />
                        <Bar dataKey="value" fill="#2196f3" name="Cantidad" radius={[4, 4, 0, 0]}>
                          {chartData.tiposBien.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Distribución por Marca" icon={<BrandIcon />} color="#ff9800">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart
                        data={chartData.marcas}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
                        <RechartsTooltip formatter={(value, name) => [`${value} bienes`, "Cantidad"]} />
                        <Bar dataKey="value" fill="#ff9800" name="Cantidad" radius={[0, 4, 4, 0]}>
                          {chartData.marcas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 3, display: tabValue === 1 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Distribución por Modelo" icon={<ModelIcon />} color="#9c27b0">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart
                        data={chartData.modelos}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
                        <RechartsTooltip formatter={(value, name) => [`${value} bienes`, "Cantidad"]} />
                        <Bar dataKey="value" fill="#9c27b0" name="Cantidad" radius={[0, 4, 4, 0]}>
                          {chartData.modelos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Distribución por Lugar" icon={<LocationIcon />} color="#607d8b">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={chartData.lugares} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                        <YAxis />
                        <RechartsTooltip formatter={(value, name) => [`${value} bienes`, "Cantidad"]} />
                        <Bar dataKey="value" fill="#607d8b" name="Cantidad" radius={[4, 4, 0, 0]}>
                          {chartData.lugares.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 3, display: tabValue === 2 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Activos vs Bajas" icon={<PieChartIcon />} color="#9c27b0">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={chartData.activosVsBajas}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.activosVsBajas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#4caf50" : "#f44336"} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value, name) => [`${value} bienes`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Distribución por Tipo (Donut)" icon={<PieChartIcon />} color="#4caf50">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={chartData.tiposBien}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.tiposBien.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value, name, props) => [`${value} bienes`, props.payload.name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 3, display: tabValue === 3 ? "block" : "none" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Tendencia Mensual" icon={<TimelineIcon />} color="#607d8b">
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={chartData.tendencia} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line type="monotone" dataKey="activos" stroke="#4caf50" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="bajas" stroke="#f44336" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ChartCard title="Evolución de Inventario" icon={<TimelineIcon />} color="#2196f3">
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={chartData.tendencia} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorActivos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorBajas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f44336" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="activos"
                          stroke="#2196f3"
                          fillOpacity={1}
                          fill="url(#colorActivos)"
                        />
                        <Area
                          type="monotone"
                          dataKey="bajas"
                          stroke="#f44336"
                          fillOpacity={1}
                          fill="url(#colorBajas)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Items */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
              border: "1px solid rgba(76, 175, 80, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4caf50", mr: 2 }}>
                <InventoryIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#2c3e50">
                Bienes Recientes
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {recentBienes.length > 0 ? (
              <List>
                {recentBienes.map((bien) => (
                  <ListItem
                    key={bien.id}
                    sx={{
                      mb: 1,
                      bgcolor: "rgba(76, 175, 80, 0.05)",
                      borderRadius: 2,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(76, 175, 80, 0.1)",
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={bien.imagen}
                        alt={bien.modelo}
                        variant="rounded"
                        sx={{
                          bgcolor: bien.imagen ? "transparent" : "rgba(76, 175, 80, 0.1)",
                          color: "#4caf50",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <InventoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {bien.nSerie} - {bien.modelo}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {bien.tipoBien} | {bien.marca}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {` — ${bien.fecha}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  bgcolor: "rgba(76, 175, 80, 0.05)",
                  borderRadius: 2,
                }}
              >
                <InventoryIcon sx={{ fontSize: 48, color: "rgba(76, 175, 80, 0.3)", mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  No hay bienes registrados recientemente
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Bajas */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
              border: "1px solid rgba(244, 67, 54, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: "rgba(244, 67, 54, 0.1)", color: "#f44336", mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#2c3e50">
                Bajas Recientes
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {recentBajas.length > 0 ? (
              <List>
                {recentBajas.map((baja) => (
                  <ListItem
                    key={baja.id}
                    sx={{
                      mb: 1,
                      bgcolor: "rgba(244, 67, 54, 0.05)",
                      borderRadius: 2,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(244, 67, 54, 0.1)",
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(244, 67, 54, 0.1)",
                          color: "#f44336",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <WarningIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="medium">
                          {baja.nSerie} - {baja.tipoBien}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="error">
                            Motivo: {baja.motivo}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {` — ${baja.fecha}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  bgcolor: "rgba(244, 67, 54, 0.05)",
                  borderRadius: 2,
                }}
              >
                <WarningIcon sx={{ fontSize: 48, color: "rgba(244, 67, 54, 0.3)", mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  No hay bajas registradas recientemente
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

