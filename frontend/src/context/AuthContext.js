import { createContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import authConfig from "src/configs/auth";
import axios from "axios";
import { showToast } from "src/utils/showToast";
import { t } from "i18next";
// ** Spinner Import
import Spinner from "src/components/spinner";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SigninMessage } from "src/components/Wallet/SignInMessage";
import { binary_to_base58 } from "base58-js";

const defaultProvider = {
  user: null,
  loading: true,
  isInitialized: false,
  setUser: () => null,
  setLoading: () => Boolean,
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  initAuth: () => Promise.resolve(),
  login: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );
  const ws = useRef(null);

  const router = useRouter();

  const webSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already connected");
      return;
    }
    console.log("Bağlanılıyor...");
    ws.current = new WebSocket("ws://localhost/api/v1/private/socket/ws");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.current.onmessage = (e) => {
      console.log("Message from server:", e.data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      setTimeout(webSocket, 5000);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };
  };

  const closeWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      console.log("WebSocket bağlantısı kapatıldı");
    }
  };

  const deleteStorage = () => {
    setUser(null);
    setLoading(false);
    closeWebSocket();
    const firstPath = router.pathname.split("/")[1];
    if (firstPath !== "login") router.replace("/login");
  };

  const handleLogout = async () => {
    try {
      const response = await axios({
        url: authConfig.logout,
        method: "POST",
      });
      if (response.status === 200) {
        deleteStorage();
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error.response.data.message));
    }
  };

  const initAuth = () => {
    setLoading(true);
    setIsInitialized(false);

    axios({
      url: authConfig.account,
      method: "GET",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const user = response?.data?.data;

          if (user && user?.role) {
            setIsInitialized(true);
            setUser(user);

            if (router.pathname === "/login" || router.pathname === "/register") {
              router.push("/").then(() => router.reload());
            } else {
              setLoading(false);
              webSocket();
            }
          } else {
            setLoading(false);
            handleLogout();
          }
        } else {
          setLoading(false);
          showToast("dismiss");
          showToast("error", response.data.message);
          handleLogout();
        }
      })
      .catch((error) => {
        setLoading(false);
        showToast("dismiss");
        showToast("error", t(error?.response?.data?.message ?? ""));
        handleLogout();
      });
  };

  const handleRegister = async (formData) => {
    try {
      const response = await axios({
        url: authConfig.register,
        method: "POST",
        data: formData,
      });
      if (response.status === 200) {
        showToast("dismiss");
        showToast("success", "Account created successfully");
        router.push("/login");
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
        handleLogout();
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error.response.data.message));
      handleLogout();
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios({
        url: authConfig.login,
        method: "POST",
        data: formData,
      });

      if (response.status === 200) {
        const user = response?.data?.data;
        setUser(user);
        router.push("/home");
        webSocket();
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error.response.data.message));
    }
  };

  // ** Wallet

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      // const csrf = await getCsrfToken();
      if (!wallet.publicKey || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        // nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      console.log("qweqweqe1", signature);
      
      const serializedSignature = binary_to_base58(signature);

      console.log({
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("fdsfdsfdsf", wallet.connected);

    // if (wallet.connected && status === "unauthenticated") {
    if (wallet.connected) {
      handleSignIn();
    }
  }, [wallet]);
  // ** Wallet

  useEffect(() => {
    initAuth();
  }, []);

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    logout: handleLogout,
    register: handleRegister,
    initAuth,
    login: handleLogin,
  };

  if (!isInitialized && loading) return <Spinner />;
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
