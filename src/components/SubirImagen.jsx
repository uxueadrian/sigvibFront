import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";

const SubirImagen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null); 
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); 
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Nuevo123"); 

    setUploading(true);
    
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dk2csaiz0/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log("Imagen subida correctamente:", data.secure_url);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: "dk2csaiz0" } });
  const img = imageUrl
    ? cld.image(imageUrl).resize(Resize.scale().width(500).height(500))
    : null;

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        disabled={uploading}
      />
      
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Subiendo..." : "Subir imagen"}
      </button>

      {imageUrl && (
        <div>
          <h2>Imagen subida:</h2>
          <img src={imageUrl}></img>
          <p>URL de la imagen: {imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default SubirImagen;