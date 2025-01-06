import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import ProductCotaTable from "./ProductCotaTable";
import { URL } from "../../../constants/Constants";

const ProduitCotaAdmin = () => {
  const [productName, setProductName] = useState("");
  const [actor, setActor] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Fetch actor from localStorage on component mount
  useEffect(() => {
    const storedActor = localStorage.getItem("actor");
    if (storedActor) {
      setActor(storedActor);
    }
  }, []);

  const handleAddProduct = async () => {
    if (!file || !productName || !actor) {
      alert("Veuillez remplir tous les champs et ajouter un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", productName);
    formData.append("actor", actor);

    try {
      const response = await fetch(`${URL}/api/productCota`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l’ajout du produit.");
      } else {
        alert("Produit ajouté avec succès!");
      }
    } catch (error) {
      console.error("Erreur lors de l’ajout du produit:", error);
      alert("Erreur lors de l’ajout du produit.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Toolbar />
      <Box
        component="main"
        sx={{
          padding: { xs: "10px", sm: "20px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Les Produits Cota
        </Typography>

        {/* Form Fields */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Grid item xs={12}>
            <ProductCotaTable />
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <footer>
        <Box sx={{ textAlign: "center", py: 2, mt: 4 }}>
          <Typography variant="body2">
            &copy; 2024 ELSAIDALIYA. Tous droits réservés.
          </Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default ProduitCotaAdmin;
