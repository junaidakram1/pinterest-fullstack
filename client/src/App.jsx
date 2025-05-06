import "./app.css";
import Gallery from "./components/gallery/Gallery.jsx";
import SearchBar from "./components/searchBar/SearchBar.jsx";
import SideBar from "./components/sideBar/SideBar.jsx";
const App = () => {
  return (
    <div className="app">
      <SideBar />
      <div className="content">
        <SearchBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
