import { Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";

const Search: NextPage = ({ query }: any) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get(`/search?tags=${query.tags.replace(/\s/g, "")}`).then((res) => {
      setImages(res.data);
    });
  }, [query.tags]);

  return (
    <>
      <Center>
        <Heading textTransform={"capitalize"}>{query.tags}</Heading>
      </Center>
      <GalleryComp imageList={images} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};

export default Search;
