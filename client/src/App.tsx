import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { PropertyList } from "./pages/PropertyList"
import { PropertyDetails } from "./pages/PropertyDetails"
import { AddProperty } from "./pages/AddProperty"
import { Favorites } from "./pages/Favorites"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add" element={<AddProperty />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
