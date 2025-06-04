import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Search from "./pages/Search/Search.jsx";
import Post from "./pages/Post/Post.jsx";
import MainLayout from "./pages/Layouts/MainLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/pin/:id" element={<Post />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
