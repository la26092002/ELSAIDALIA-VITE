import React, { useMemo, useState } from "react";
import { Box, Typography, Grid, TextField, Toolbar } from "@mui/material";
import FournisseurTable from "./FournisseurTable";

const FournisseurAdmin = () => {
  const [nom, setNom] = useState("");
  const [wilaya, setWilaya] = useState("");

  const memoizedNom = useMemo(() => nom, [nom]);
  const memoizedWilaya = useMemo(() => wilaya, [wilaya]);

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
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Recherchez votre fournisseur
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center", width: "100%", maxWidth: "800px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Wilaya"
              variant="outlined"
              fullWidth
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FournisseurTable willaya={memoizedWilaya} nom={memoizedNom} />
          </Grid>
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

export default FournisseurAdmin;
