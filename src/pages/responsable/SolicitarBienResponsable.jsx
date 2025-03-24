import React from "react";
import "../../styles/Vista-BR.css"; 
import { useFetch } from "../../services/useFetch";
import CardComponent from "../../components/Cards";
import DownloadPDFButton from "../../components/pdf/DownloadPDFButton";

const SolicitarBienResponsable = () => {
    const items = [
        { image: "https://http2.mlstatic.com/D_NQ_NP_753757-MLA79422026448_092024-O.webp", title: "Laptop HP 15.6 pulgadas", description: "Descripción del producto" },
        { image: " https://i5.walmartimages.com/seo/HP-Stream-14-Laptop-Intel-Celeron-N4000-4GB-SDRAM-32GB-eMMC-Office-365-1-yr-Brilliant-Black_d579aa66-7e24-4eb2-9686-521be769a755_2.09283250bd5d2a12834c2d4aaca652dd.jpeg ", title: "Laptop Stream 14", description: "Descripción del producto"},
        { image: "https://m.media-amazon.com/images/I/81WSbPXB--L.jpg", title: "Lenovo ideaPad", description: "Tactica, delgada y ligera" },
        { image: "https://m.media-amazon.com/images/I/61FScKvxRFL.jpg", title: "HP Victus 15.6 pulgadas", description: "Laptop gamer" },
        { image: "https://thunderobot.mx/wp-content/uploads/2023/03/ThunderobotZeroPlata2023_4_05a6d997-d14b-415b-8aa6-1f8554f5e13d.jpg", title: "Zero i9", description: "Laptop China" },
        
        { image: "https://m.media-amazon.com/images/I/71M1DmnK9cL._AC_UF894,1000_QL80_.jpg", title: "Machenike i5", description: "Descripción del producto" },
        { image: "https://consumer.huawei.com/dam/content/dam/huawei-cbg-site/latam/mx/mkt/plp/new/laptops-new/d-series/matebook-d-16-card-1.jpg", title: "HUAWEI", description: "Lo mejor de mexico" },
        { image: "https://m.media-amazon.com/images/I/71rvYWl5fuL._AC_UF894,1000_QL80_.jpg", title: "Acer", description: "Laptop gama media" },
        { image: "https://www.xtremepc.com.mx/cdn/shop/files/fa3d8314-7900-4ea4-a9c3-afdba89fedc2_800x.png?v=1721861323", title: "Xtreme Pc gamer", description: "Tactica, delgada y ligera" },
        { image: "https://sounds.mx/cdn/shop/files/7506215939393.jpg?v=1729091618", title: "Led Ateck", description: "Monitor led de 24 pulgadas" }
    ];

    return(
        <div className="container">
            <h1 className="Titulo">Bienes becario</h1>

            <div className="top-section">
                <DownloadPDFButton data={items}/>
                <input type="text" placeholder="buscar" className="buscador"/>
            </div>

            <div className="filters-section">
                <h2 className="Subtitulo">Filtros</h2>

                <div className="filter-group">
                    <div className="filter-item">
                        <h3>Tipo</h3>
                            <select className="btnSelect">
                                <option>Seleccionar tipo de bien</option>
                            </select>  
                    </div>

                    <div className="filter-item">
                        <h3>Marca</h3>
                            <select className="btnSelect">
                                <option>Seleccionar marca</option>
                            </select>
                    </div>
                    
                    <div className="filter-item">
                        <h3>Modelo</h3>
                            <select className="btnSelect">
                                <option>Seleccionar modelo</option>
                            </select> 
                    </div>
                                                
                </div>
            </div>

            <div className="image-grid">
                {items.map((item, index) => (
                    <div key={index} className="image-item">
                        <CardComponent image={item.image} title={item.title} description={item.description} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default SolicitarBienResponsable;

