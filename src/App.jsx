import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useWheelSnap from "./useWheelSnap";

export default function App() {
  useWheelSnap();

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <div className="sheet relative z-10">
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
