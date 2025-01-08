import React, { useMemo, useState } from "react";
import { Box, Typography, Grid, TextField, Toolbar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { wilayas } from "../../../constants/Constants";
import PharmacyTable from "./PharmacyTable";

const PharmacyAdmin = () => {
  const [nom, setNom] = useState("");
  const [wilaya, setWilaya] = useState("");

  const memoizedNom = useMemo(() => nom, [nom]);
  const memoizedWilaya = useMemo(() => wilaya, [wilaya]);

  return (
    <Box sx={{  minHeight: "100vh" }}>
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
          Recherchez votre pharmacien
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
          <FormControl sx={{ width: '300px' }}>
                    <InputLabel>Wilaya</InputLabel>
                    <Select
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      label="Wilaya"
                    >
                      {wilayas.map((wilay, index) => (
                        <MenuItem key={index} value={wilay}>
                          {wilay}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
          </Grid>
          <Grid item xs={12}>
            <PharmacyTable willaya={memoizedWilaya} nom={memoizedNom} />
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

export default PharmacyAdmin;
