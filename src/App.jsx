import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import MobileShell from "./components/MobileShell";
import HomeScreen from "./screens/HomeScreen";
import JobDetailScreen from "./screens/JobDetailScreen";
import ApplicationsScreen from "./screens/ApplicationsScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BottomTabBar from "./components/BottomTabBar";

export default function App() {
  return (
    <ThemeProvider>
      <MobileShell>
        <BrowserRouter>
          <div className="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/job/:id" element={<JobDetailScreen />} />
                <Route path="/applications" element={<ApplicationsScreen />} />
                <Route path="/messages" element={<MessagesScreen />} />
                <Route path="/messages/:id" element={<ChatScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Routes>
            </div>
            <BottomTabBar />
          </div>
        </BrowserRouter>
      </MobileShell>
    </ThemeProvider>
  );
}
