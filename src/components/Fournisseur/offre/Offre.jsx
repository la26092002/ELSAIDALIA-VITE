import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import OffreTable from './OffreTable';
import { URL } from '../../../constants/Constants';

const Offre = () => {
  const [offerTitle, setOfferTitle] = useState('');
  const [actor, setActor] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  // Using useMemo to pass the refresh state as a dependency to OffreTable
  const memoizedRefresh = useMemo(() => refresh, [refresh]);

  // Fetch actor from localStorage on component mount
  useEffect(() => {
    const storedActor = localStorage.getItem('actor');
    if (storedActor) {
      setActor(storedActor);
    }
  }, []);

  const handleAddOffre = async () => {
    console.log(actor)
    if (!file || !offerTitle || !actor) {
      alert('Veuillez remplir tous les champs et ajouter un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', offerTitle);
    formData.append('actor', actor);

    try {
      const response = await fetch(URL + '/api/offer', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout de l’offre.');
      }

      const { data } = await response.json();
      console.log(data);
      setRefresh((prev) => !prev);
      alert('Offre ajoutée avec succès!');

      setResults((prev) => [...prev, data]); // Update results with the response
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’offre:', error);
      alert('Erreur lors de l’ajout de l’offre.');
    }
  };

  return (
    <div>
      <div sx={{ bgcolor: '#f5f5f5' }}>
        <Box component="main">
          <Toolbar />
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            {/* Centered Title */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Ajouter une Offre
            </Typography>

            {/* Form Fields */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TextField
                    label="Titre de l'Offre"
                    variant="outlined"
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    style={{ width: '30%', marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ width: '30%', marginBottom: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleAddOffre}
                    sx={{ backgroundColor: '#00796b', color: '#fff', height: '55px', width: '30%' }}
                  >
                    Ajouter l'Offre
                  </Button>
                </Grid>

                {/* OffreTable aligned to the right */}
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <OffreTable refresh={memoizedRefresh} />
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Footer */}
          <footer>
            <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
              <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
            </Box>
          </footer>
        </Box>
      </div>
    </div>
  );
};

export default Offre;
