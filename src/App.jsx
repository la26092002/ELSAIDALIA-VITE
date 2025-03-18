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
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import Profile from "./components/Fournisseur/profile/Profile";
import ProfilePharm from "./components/Pharmacien/profile/ProfilePharm";
import ProduitCotaPharmcien from "./components/Pharmacien/produitCota/ProduitCotaPharmcien";
import ProfileAll from "./components/Home/Profile/ProfileAll";
import ConditionsEtPolitique from "./components/Home/ConditionsEtPolitique";
import OffrePanier from "./components/Pharmacien/panier/OffrePanier";
import OffersCommander from "./components/Pharmacien/offersCommander/offersCommander";



//
export const App = () => {
  return <Outlet />;
};

export const appRouter = createBrowserRouter(
  [
    {
      path: "/admin",
      element: <AdminApp />,
      errorElement: <Error />,
      children: [(
        <PrivateRouteAdmin>
          <Produit />
        </PrivateRouteAdmin>
      ),
      {
        path: "fourniseur", element: (
          <PrivateRouteAdmin><FournisseurAdmin />
          </PrivateRouteAdmin>
        )
      },
      {
        path: "pharmacien", element: (
          <PrivateRouteAdmin><PharmacyAdmin />
          </PrivateRouteAdmin>
        )
      },

      {
        path: "produit", element: (
          <PrivateRouteAdmin><ProduitAdmin />
          </PrivateRouteAdmin>
        )
      },
      {
        path: "produitCota", element: (
          <PrivateRouteAdmin><ProduitCotaAdmin />
          </PrivateRouteAdmin>
        )
      },
      ],
    },

    { path: "/loginAdmin", element: <Login /> },
    {
      path: "/pharmacien",
      element: <PharmacienApp />,
      errorElement: <Error />,
      children: [
        { path: "produit", element: <ProduitPhar /> },

        { path: "produitCota", element: <ProduitCotaPharmcien /> },

        { path: "fourniseur", element: <Fourniseur /> },

        { path: "panier", element: <OffrePanier /> },

        {
          path: "Profil",
          element: (
            <PrivateRoute>
              <ProfilePharm />
            </PrivateRoute>
          ),
        },
        {
          path: "offers",
          element: (
            <PrivateRoute>
              <OffersCommander />
            </PrivateRoute>
          ),
        },
        
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
        {
          path: "Profil",
          element: (
            <PrivateRoute>
              <Profile />
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
    { path: "/ProfileAll/:actorPharmId", element: <ProfileAll /> },


    { path: "/ConditionsEtPolitique", element: <ConditionsEtPolitique /> },



    { path: "*", element: <Error /> },
  ]
);

const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;
