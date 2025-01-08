import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AdminApp from "./components/Admin/AdminApp";
import FournisseurAdmin from "./components/Admin/Fourniseur/FournisseurAdmin";
import ProduitAdmin from "./components/Admin/produit/ProduitAdmin";
import ProduitCotaAdmin from "./components/Admin/produitCota/ProduitCotaAdmin";
import Login from "./components/Admin/Auth/Login";
import Error from "./components/Error";
import PharmacienApp from "./components/Pharmacien/PharmacienApp";
import ProduitPhar from "./components/Pharmacien/produit/ProduitPhar";
import Fourniseur from "./components/Pharmacien/fourniseur/Fourniseur";
import FournisseurApp from "./components/Fournisseur/FournisseurApp";
import Produit from "./components/Fournisseur/produit/Produit";
import PrivateRoute from "./components/PrivateRoute";
import ProduitCota from "./components/Fournisseur/produitCota/ProduitCota";
import Offre from "./components/Fournisseur/offre/Offre";
import Principle from "./components/Home/Principle";
import Aprops from "./components/Home/Aprops";
import FournisurDetail from "./components/Home/FourniseurDetail";
import FournisurSearch from "./components/Home/FournisurSearch";
import Contact from "./components/Home/Contact";
import Seconnect from "./components/Home/Seconnect";
import Register from "./components/Home/Register";
import Forgetpassword from "./components/Home/Forgetpassword";
import Valid from "./components/Home/Valid";
import PharmacyAdmin from "./components/Admin/Pharmacy/PharmacyAdmin";




export const App = () => {
  return <Outlet />;
};

export const appRouter = createBrowserRouter(
  [
    {
      path: "/admin",
      element: <AdminApp />,
      errorElement: <Error />,
      children: [
        { path: "fourniseur", element: <FournisseurAdmin /> },
        { path: "pharmacien", element: <PharmacyAdmin /> },
        
        { path: "produit", element: <ProduitAdmin /> },
        { path: "produitCota", element: <ProduitCotaAdmin /> },
      ],
    },
    
    { path: "/loginAdmin", element: <Login /> },
    {
      path: "/pharmacien",
      element: <PharmacienApp />,
      errorElement: <Error />,
      children: [
        { path: "produit", element: <ProduitPhar /> },
        { path: "fourniseur", element: <Fourniseur /> },
      ],
    },
    {
      path: "/fournisseur",
      element: <FournisseurApp />,
      errorElement: <Error />,
      children: [
        {
          path: "produit",
          element: (
            <PrivateRoute>
              <Produit />
            </PrivateRoute>
          ),
        },
        {
          path: "produitCota",
          element: (
            <PrivateRoute>
              <ProduitCota />
            </PrivateRoute>
          ),
        },
        {
          path: "offre",
          element: (
            <PrivateRoute>
              <Offre />
            </PrivateRoute>
          ),
        },
      ],
    },
    { path: "/", element: <Principle /> },
    { path: "/about", element: <Aprops /> },
    { path: "/fournisseurs", element: <FournisurSearch /> },
    { path: "/contact", element: <Contact /> },
    { path: "/seconnect", element: <Seconnect /> },
    { path: "/forgetpassword", element: <Forgetpassword /> },
    { path: "/validate", element: <Valid /> },
    
    
    { path: "/register", element: <Register /> },
    { path: "/loginAdmin", element: <Login /> },
    { path: "/fourniseurdetail", element: <FournisurDetail /> },
    
    { path: "*", element: <Error /> },
  ]
);

const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;
