import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <main className="pt-24 pb-12">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;