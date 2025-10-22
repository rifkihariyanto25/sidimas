export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdfcf8",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #8b7355",
          borderRadius: "50%",
          animation: "budaya-loading-spin 1s linear infinite",
        }}
      ></div>
      <p
        style={{
          marginTop: "1.5rem",
          color: "#8b7355",
          fontSize: "1.1rem",
          fontWeight: "500",
        }}
      >
        Memuat Budaya Banyumas...
      </p>
    </div>
  );
}
