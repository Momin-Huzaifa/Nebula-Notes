import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/common/Toast";
import { useToastStore } from "./store/toastStore";

function App() {
  const { message, type, isVisible, hideToast } = useToastStore();
  
  return (
    <div className="min-h-screen mesh-gradient">
      <Navbar />
      <main className="pt-24 pb-12">
        <AppRoutes />
      </main>
      <Toast 
        message={message} 
        type={type} 
        isVisible={isVisible} 
        onClose={hideToast} 
      />
    </div>
  );
}

export default App;