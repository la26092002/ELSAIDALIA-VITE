import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import ProductTable from './ProductTable';
import { URL } from '../../../constants/Constants';

const Produit = () => {
  const [productName, setProductName] = useState('');
  const [actor, setActor] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

 // Using useMemo to pass the refresh state as a dependency to ProductTable
  // Memoizing the refresh state to re-render ProductTable only when refresh value changes
  const memoizedRefresh = useMemo(() => refresh, [refresh]);


  // Fetch actor from localStorage on component mount
  useEffect(() => {
    const storedActor = localStorage.getItem('actor');
    if (storedActor) {
      setActor(storedActor);
    }
  }, []);

  const handleAddProduct = async () => {
    if (!file || !productName || !actor) {
      alert('Veuillez remplir tous les champs et ajouter un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', productName);
    formData.append('actor', actor);

    try {
      const response = await fetch(URL+'/api/product', {
        method: 'POST',
        body: formData,
      });


      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout du produit.');
      }

      const { data } = await response.json();
      console.log(data)
      setRefresh((prev) => !prev); 
      alert('Produit ajouté avec succès!');
      
      setResults((prev) => [...prev, data]); // Update results with the response
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit:', error);
      alert('Erreur lors de l’ajout du produit.');
    }
  };

  /*
  {
    "name": "j",
    "dataPdf": "1733938067686_CastraNov CompanyPrice__.pdf",
    "actor": "672639bc87775c00d4a9258f",
    "_id": "6759cb93d1ef4909de4d4ef2",
    "date": "2024-12-11T17:27:47.704Z",
    "__v": 0
}
  */

  return (
    <div>
      <div sx={{ bgcolor: '#f5f5f5' }}>
        <Box component="main">
          <Toolbar />
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            {/* Centered Title */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Ajouter votre produit
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
                    label="Nom du Produit"
                    variant="outlined"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
                    onClick={handleAddProduct}
                    sx={{ backgroundColor: '#00796b', color: '#fff', height: '55px', width: '30%' }}
                  >
                    Ajouter le Produit
                  </Button>
                </Grid>

                {/* ProductTable aligned to the right */}
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <ProductTable refresh={memoizedRefresh}  />
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

export default Produit;
