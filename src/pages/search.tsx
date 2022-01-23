import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";

const Search: NextPage = ({ query }: any) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get(`/search?tags=${query.tags.replace(/\s/g, "")}`).then((res) => {
      setImages(res.data);
      setLoaded(true)
    });
  }, [query.tags]);

  return (
    <>
      {
        !loaded ? (
          <Flex
            w="100%"
            h="calc(100vh - 124px)"
            align="center"
            justify="center"
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <>
            <Center>
              <Heading textTransform={"capitalize"}>{query.tags}</Heading>
            </Center>
            <GalleryComp imageList={images} />
          </>
        )
      }
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
