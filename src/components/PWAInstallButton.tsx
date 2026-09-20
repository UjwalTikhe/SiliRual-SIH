import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
      console.log("PWA install prompt available");
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Install prompt was: ${outcome}`);

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#6A5ACD",
      color: "white",
      padding: "16px 24px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      maxWidth: "90%",
      width: "auto",
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
          Install SiliRual App
        </p>
        <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>
          Add to home screen for offline access
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleInstallClick}
          style={{
            backgroundColor: "white",
            color: "#6A5ACD",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: pointer,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Download size={16} />
          Install
        </button>
        <button
          onClick={handleDismiss}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            padding: "8px",
            cursor: pointer,
            borderRadius: "6px",
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}