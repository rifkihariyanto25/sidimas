"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Kuliner page error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#fdfcf8",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          color: "#8b7355",
          marginBottom: "1rem",
        }}
      >
        Terjadi Kesalahan
      </h2>
      <p
        style={{
          color: "#666",
          marginBottom: "2rem",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        Maaf, ada masalah saat memuat halaman kuliner. Silakan coba lagi.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#8b7355",
          color: "white",
          border: "none",
          borderRadius: "50px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#6d5a47")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#8b7355")}
      >
        Coba Lagi
      </button>
    </div>
  );
}
