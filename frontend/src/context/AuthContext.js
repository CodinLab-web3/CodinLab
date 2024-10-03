import { createContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import authConfig from "src/configs/auth";
import axios from "axios";
import { showToast } from "src/utils/showToast";
import { t } from "i18next";
// ** Spinner Import
import Spinner from "src/components/spinner";
// Wallet

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

  // ** Wallet
  const wallet = useWallet();
  const { disconnect } = useWallet();
  const walletModal = useWalletModal();

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


      // this part is for get container id from websocket but not used in this project
      // const data = JSON.parse(e.data); // 
      // if (data.Type === "container") {
      //   const containerId = data?.Data?.id;

      //   if (containerId) {
      //     localStorage.setItem('containerId', containerId);
      //   }
      // }
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
    if (wallet.connected) disconnect();
    setUser(null);
    setLoading(false);
    closeWebSocket();
    const firstPath = router.pathname.split("/")[1];
    if (firstPath != "login")
      if (firstPath != "register") router.replace("/login");
  };

  const handleLogout = async () => {
    try {
      const response = await axios({
        url: authConfig.logout,
        method: "POST",
      });
      if (response.status === 200) {
        if (user) {
          showToast("dismiss");
          showToast("success", "Logged out successfully");
        }
        deleteStorage();
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error?.response?.data?.message));
    }
  };

  const initAuth = () => {
    setLoading(true);
    setIsInitialized(false);
    if (router.pathname !== "/register") localStorage.removeItem("publicKey")

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
          // showToast("dismiss");
          // showToast("error", response.data.message);
          handleLogout();
        }
      })
      .catch((error) => {
        setLoading(false);
        // showToast("dismiss");
        // showToast("error", t(error?.response?.data?.message ?? ""));
        handleLogout();
      });
  };

  const handleRegister = async (formData) => {
    let pKey = localStorage.getItem("publicKey")

    let data = pKey ? { ...formData, publicKeyBase58: pKey } : formData;

    try {
      const response = await axios({
        url: pKey ? authConfig.walletRegister : authConfig.register,
        method: "POST",
        data: data,
      });
      if (response.status === 200) {
        showToast("dismiss");
        showToast("success", "Account created successfully");
        localStorage.removeItem("publicKey");
        router.push("/login");
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
        handleLogout();
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error?.response?.data?.message));
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
      showToast("error", t(error?.response?.data?.message));
    }
  };

  const handleWalletLogin = async (data) => {
    try {
      const response = await axios({
        url: authConfig.walletLogin,
        method: "POST",
        data: data,
      });

      if (response.status === 200) {
        const user = response?.data?.data;
        setUser(user);

        showToast("dismiss");
        showToast("success", "Logged in successfully");
        router.push("/home");
        webSocket();
      } else {
        showToast("dismiss");
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("dismiss");
      showToast("error", t(error?.response?.data?.message));

      if (error?.response?.data?.message == "public key do not match") {
        localStorage.setItem("publicKey", wallet.publicKey.toBase58());
        router.push("/register");
      }
    }
  };

  const handleSignIn = async () => {
    try {
      // if wallet is not connected then show wallet modal
      if (!wallet.connected) walletModal.setVisible(true)

      // if wallet public key or signMessage is not available then return
      if (!wallet.publicKey || !wallet.signMessage) return;

      // if user already logged in do not then return 
      if (user && user?.publicKey) return;

      // create a new SigninMessage object
      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey.toBase58(),
        statement: `Sign in to ${window.location.host}`,
      });

      const data = new TextEncoder().encode(message.prepare()); // encode the message
      const signature = await wallet.signMessage(data); // sign the message
      const serializedSignature = binary_to_base58(signature); // convert the signature to base58

      // call the handleWalletLogin function with the message, public key and signature to communicate with the backend
      handleWalletLogin({
        message: message.statement, // message statement in plain text
        publicKeyBase58: wallet.publicKey, // public key in base58
        signatureBase58: serializedSignature, // signature in base58
      });
    } catch (error) {
      console.log(error);
    }
  }

  const openSignIn = () => {
    const pKey = localStorage.getItem("publicKey") || null;

    if (wallet.connected) { // if wallet is connected
      if (!pKey) handleSignIn(); // if public key is not available in local storage then call handleSignIn function
      else if (router.pathname !== "/register") router.push("/register") // if public key is available in local storage then redirect to register page
    }
  }

  useEffect(() => {
    if (!wallet.connected && user?.publicKey) {
      handleLogout()
      return
    }

    if (wallet.connected && !user?.publicKey) {
      openSignIn()
    } else initAuth();
  }, [wallet]);
  // ** Wallet

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
