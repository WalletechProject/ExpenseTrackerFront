import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      setUser(userProfile);
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Si erreur de récupération, supprimer le token et déconnecter
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired, logging out.");
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        } else {
          // Token valide, charger le profil utilisateur complet
          loadUserProfile().finally(() => setLoading(false));
        }
      } catch (err) {
        console.log("Invalid token, removing it.");
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      // Charger le profil utilisateur complet après la connexion
      await loadUserProfile();
      navigate("/");
    } catch (error) {
      console.error("Error loading user profile after login:", error);
      // En cas d'erreur, utiliser les données du JWT comme fallback
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        navigate("/");
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, loadUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
