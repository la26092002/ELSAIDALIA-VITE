import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, TextField, Button, Chip, Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import ProductTable from './ProductTable';

const ProduitPhar = () => {
  const [inputValue, setInputValue] = useState(''); // Pour l'entrée utilisateur
  const [keywords, setKeywords] = useState([]); // Pour stocker les mots-clés
  const [searchQuery, setSearchQuery] = useState(''); // Pour stocker la requête de recherche

  // Utiliser useMemo pour calculer searchQuery uniquement lorsque keywords change
  const computedSearchQuery = useMemo(() => {
    return keywords.join(','); // Convertir le tableau de mots-clés en une chaîne séparée par des virgules
  }, [keywords]);

  // Ajouter un mot-clé au tableau
  const handleAddKeyword = () => {
    if (inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue.trim()]); // Ajouter le mot-clé au tableau
      setInputValue(''); // Réinitialiser l'entrée utilisateur
    }
  };

  // Supprimer un mot-clé du tableau
  const handleDeleteKeyword = (keywordToDelete) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToDelete));
  };

  // Gérer la recherche lorsque le bouton "Chercher" est cliqué
  const handleSearch = () => {
    setSearchQuery(computedSearchQuery); // Mettre à jour la requête de recherche
    console.log('Search Query:', computedSearchQuery); // Exemple d'utilisation de searchQuery
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
        {/* Titre */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Recherchez votre listing
        </Typography>

        {/* Champ de saisie et bouton pour ajouter des mots-clés */}
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label="Ajouter un mot-clé"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              aria-label="Ajouter un mot-clé"

            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              onClick={handleAddKeyword}
              fullWidth
              sx={{ height: "56px", backgroundColor: "#00796b" }} // Pour correspondre à la hauteur du TextField
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>

        {/* Afficher les mots-clés ajoutés */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, my: 2 }}>
          {keywords.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleDeleteKeyword(keyword)}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>

        {/* Bouton de recherche */}
        <Button
          variant="contained"
          onClick={handleSearch} // Appeler handleSearch lors du clic
          sx={{ mb: 4, backgroundColor: "#00796b" }}
        >
          Chercher
        </Button>

        <Grid container spacing={2} sx={{ justifyContent: "center", width: "100%", maxWidth: "800px" }}>
          <Grid item xs={12}>
            <ProductTable productName={searchQuery} /> {/* Passer searchQuery au ProductTable */}
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <footer>
        <Box sx={{ textAlign: "center", py: 2, mt: 4 }}>
          <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
        </Box>
      </footer>
    </Box>
  );
};

export default ProduitPhar;