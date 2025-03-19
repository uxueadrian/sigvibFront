import { useFetch } from "../../services/useFetch";
import "../../styles/App.css";

const DashboardAdmin = () => {
    const {data, loading, error } = useFetch(
        ""
    );
    return (
        <>
        <div className="container">
            
            <h1 className="Titulo">DashBoard de Bienes</h1>
            <input type="text" placeholder="buscar" className="buscador"/>
        </div>
            
        <button>Agregar bien</button>    
        </>
    );
}

export default DashboardAdmin;


