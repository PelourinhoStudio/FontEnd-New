import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";

const Home: NextPage = () => {
  const [images, setImages] = useState([]);

  const [imagesID, setImagesID] = useState();

  useEffect(() => {
    api
      .get("/images")
      .then((response) => setImages(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  return (
    <>
      <GalleryComp imageList={images} haveHeader={true} />
    </>
  );
};

export default Home;
