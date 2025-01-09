import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button, Grid, TextField, FormControl, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import ProductCotaTable from "./ProductCotaTable";
import { URL } from "../../../constants/Constants";

const ProduitCotaPharmcien = () => {

  const navigate = useNavigate();



  const [nom, setNom] = useState("");

  const memoizedNom = useMemo(() => nom, [nom]);



  return (
    <Box sx={{ minHeight: "10vh", }}>
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
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Recherchez de l'offre
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center", width: "100%", maxWidth: "800px" }}>
          

          <Grid item xs={12}>
            <ProductCotaTable nom={memoizedNom} /> </Grid>
        </Grid>
      </Box>
      <footer>
        <Box sx={{ textAlign: "center", py: 2, mt: 4 }}>
          <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default ProduitCotaPharmcien;
