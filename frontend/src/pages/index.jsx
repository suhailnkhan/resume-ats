import { useRef } from "react";
import Canvas from "../components/Canvas";
import Divider from "../components/Divider";
import Header from "../components/Header";
import LazyShow from "../components/LazyShow";
import MainHero from "../components/MainHero";
import MainHeroImage from "../components/MainHeroImage";
import Product from "../components/Product";
import FormWizardComponent from "../components/wizard";
const App = () => {
  const ref = useRef(null);
  const handleScrollToDiv = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header handleScrollToDiv={handleScrollToDiv} />
            <MainHero handleScrollToDiv={handleScrollToDiv} />
          </div>
        </div>
        <MainHeroImage handleScrollToDiv={handleScrollToDiv} />
      </div>
      <Canvas />
      <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <div id="resumeUpload" ref={ref}>
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
          >
            {"Refine Your Resume in 2 steps".split(" ").map((word, index) => (
              <span
                key={index}
                className={index % 2 ? "text-primary" : "text-border"}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          <Divider />
          <FormWizardComponent />{" "}
        </div>
      </LazyShow>
      <Divider />
      <LazyShow>
        <>
          <Canvas />
        </>
      </LazyShow>
    </div>
  );
};

export default App;
