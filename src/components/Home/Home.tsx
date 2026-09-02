import AnimatedPage from "../AnimatedPage";
import { getGalleryAsset } from "../../utils/galleryAssets";
import type { Language } from "../../types";
import "./Home.css";

const buildingsImage = getGalleryAsset("./img/buildings/7.jpg");
const interiorsImage = getGalleryAsset("./img/furniture/8.jpg");

interface HomeProps {
  language: Language;
}

function Home({ language }: HomeProps) {
  return (
    <AnimatedPage>
      <main className="Home">
        <h2 className="buildings">{language ? "Buildings" : "Архитектура"}</h2>
        <img
          src={buildingsImage.full}
          srcSet={buildingsImage.srcSet}
          sizes="(max-width: 1280px) 70vw, 70vw"
          width={buildingsImage.width}
          height={buildingsImage.height}
          alt={language ? "Cherni Vrah 26 building" : "Сграда Черни връх 26"}
          className="picture1"
          decoding="async"
          fetchPriority="high"
        />
        <div className="curtain1" aria-hidden="true" />
        <img
          src={interiorsImage.src}
          srcSet={interiorsImage.srcSet}
          sizes="(max-width: 1280px) 70vw, 30vw"
          width={interiorsImage.width}
          height={interiorsImage.height}
          alt={language ? "Interior design project" : "Интериорен проект"}
          className="picture2"
          decoding="async"
        />
        <div className="curtain2" aria-hidden="true" />
        <h2 className="interiorDesign">
          {language ? "Interior Design" : "Интериорни проекти"}
        </h2>
      </main>
    </AnimatedPage>
  );
}

export default Home;
