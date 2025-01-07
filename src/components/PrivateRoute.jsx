import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenFournisseur");

  useEffect(() => {
    if (!token) {
      navigate("/seconnect");
    }
  }, [token, navigate]);

  return children;
}
