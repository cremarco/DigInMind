import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Banner />
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App

