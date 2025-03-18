import React, { useEffect, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography, Button, IconButton, Toolbar, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { URL } from "../../../constants/Constants";


const OffrePanier = () => {
    const [panier, setPanier] = useState([]);

    // Charger les offres du localStorage au montage du composant
    useEffect(() => {
        const storedOffres = JSON.parse(localStorage.getItem("offres")) || [];
        setPanier(storedOffres);
    }, []);

    // Fonction pour supprimer une offre du panier
    const supprimerOffre = (offreId) => {
        const updatedPanier = panier.filter((offre) => offre._id !== offreId);
        localStorage.setItem("offres", JSON.stringify(updatedPanier));
        setPanier(updatedPanier);
        console.log(`Offre ID ${offreId} supprimée du panier.`);
    };

    // Fonction pour vider tout le panier
    const viderPanier = () => {
        localStorage.removeItem("offres");
        setPanier([]);
        console.log("Panier vidé.");
    };

    // Fonction pour commander les offres
    const commanderOffres = async () => {
        // Confirmation avant de commander
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir commander ces offres ?");
        if (!isConfirmed) return;

        const userId = localStorage.getItem("actorPharmacien"); // Récupérer directement l'ID

        if (!userId) {
            alert("Utilisateur non identifié. Veuillez vous connecter.");
            return;
        }

        const panierTransforme = panier.map(offre => offre._id);




        try {
            console.log(panierTransforme);
            // Envoyer les IDs du panier à l'API
            const response = await fetch(`${URL}/api/CommandOffer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userId,
                    offers: panierTransforme, // Envoyer uniquement les IDs
                }),
            });

            // Vérifier la réponse de l'API
            if (response.ok) {
                console.log("Données envoyées avec succès !");
            } else {
                console.error("Erreur lors de l'envoi :", response.statusText);
            }

            // Vider le panier après la commande
            localStorage.removeItem("offres");
            setPanier([]);

            console.log("Offres commandées avec succès !");
            alert("Votre commande a été passée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la commande :", error);
            alert("Une erreur s'est produite lors de la commande. Veuillez réessayer.");
        }
    };


    // Configuration des colonnes pour MaterialReactTable
    const columns = [
        {
            header: 'Nom',
            accessorKey: 'name',
        },
        {
            header: 'PDF',
            accessorKey: 'dataPdf',
            enableEditing: false,
            Cell: ({ cell }) => (
                <a
                    href={`${URL}/api/productCota/download?file=${cell.getValue()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {cell.getValue()}
                </a>
            ),
        },
        {
            header: 'Acteur',
            accessorKey: 'actor',
            enableEditing: false,
            Cell: ({ cell }) => {
                const actor = cell.getValue();
                return actor
                    ? `${actor.nom} ${actor.prenom} (${actor.email}) (${actor.telephone})`
                    : 'N/A';
            },
        },
        {
            header: 'Date',
            accessorKey: 'date',
            enableEditing: false,
            Cell: ({ cell }) =>
                new Date(cell.getValue()).toLocaleString(),
        },
        {
            header: 'Actions',
            accessorKey: '_id',
            enableEditing: false,
            Cell: ({ cell }) => (
                <IconButton
                    edge="end"
                    aria-label="supprimer"
                    onClick={() => supprimerOffre(cell.getValue())}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    // Configuration de la table
    const table = useMaterialReactTable({
        columns,
        data: panier,
        enableEditing: false,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: false,
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
        },
    });

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
                    Panier de l'offre
                </Typography>
                <Grid container spacing={2} sx={{ justifyContent: "center", width: "100%", maxWidth: "800px" }}>


                    <Grid item xs={12}>

                        {panier.length === 0 ? (
                            <Typography variant="body1">Votre panier est vide.</Typography>
                        ) : (
                            <>
                                <MaterialReactTable table={table} />

                                <Box sx={{ marginTop: 2, textAlign: "center", display: "flex", gap: 2, justifyContent: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={viderPanier}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Vider le panier
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={commanderOffres}
                                    >
                                        Commander les offres
                                    </Button>
                                </Box>
                            </>
                        )}


                    </Grid></Grid>
            </Box>
            <footer>
                <Box sx={{ textAlign: "center", py: 2, mt: 4 }}>
                    <Typography variant="body2">&copy; 2024 ELSAIDALIYA. Tous droits réservés.</Typography>
                </Box>
            </footer>
        </Box>
    );
};

export default OffrePanier;