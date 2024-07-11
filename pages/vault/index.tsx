import type { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Head from "next/head";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Photo } from "./types";
import { useState } from "react";
import FullScreenImageDialog from "../../components/full-screen-image-dialog";

const Vault = ({
  photos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>();

  const handleSelectPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseFullScreenModal = () => {
    setSelectedPhoto(undefined);
  };

  return (
    <>
      <Head>
        {/* 
          Generated the following tags using ChatGTP for speed using the following prompt
          "Generate me some SEO friendly meta HTML tags to go into the header of the Fanvue website found here https://www.fanvue.com/".

          I haven't updated the links inside of the tags due to the time limit.

          Some tags are also missing, with more customisation here: https://ogp.me/

          Potentially also split this out into a separate head component as it's quite large
        */}
        <title>
          Fanvue: Connect, Create, Earn on the Leading Creator Subscription
          Platform
        </title>
        <meta
          name="description"
          content="Fanvue is the ultimate creator subscription platform, offering tools for creators to share exclusive content, connect with fans, and earn money. Sign up now to take home 85% for the first 3 months!"
        />
        <meta
          name="keywords"
          content="Fanvue, creator platform, subscription platform, exclusive content, earn money, fan connection, AI features, messaging, pay-to-view, creator economy"
        />
        <meta name="author" content="Fanvue" />

        <meta
          property="og:title"
          content="Fanvue: The Future of Creator Subscription Platforms"
        />
        <meta
          property="og:description"
          content="Join the fastest growing creator subscription platform. Connect, create, and earn with exclusive tools and features. Sign up today!"
        />
        <meta
          property="og:image"
          content="https://www.fanvue.com/path/to/featured-image.jpg"
        />
        <meta property="og:url" content="https://www.fanvue.com/vault" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fanvue: Connect, Create, Earn on the Leading Creator Subscription Platform"
        />
        <meta
          name="twitter:description"
          content="Fanvue empowers creators to share exclusive content, connect with fans, and earn. Sign up now and get 85% for the first 3 months!"
        />
        <meta
          name="twitter:image"
          content="https://www.fanvue.com/path/to/featured-image.jpg"
        />
        <meta name="twitter:site" content="@FanvueOfficial" />
      </Head>
      <Container component="main" sx={{ padding: "16px 0" }}>
        {photos.length > 0 ? (
          <ImageList
            gap={12}
            sx={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(250px, 1fr)) !important",
            }}
          >
            {photos.map((photo) => (
              // AYY1 consideration - Isn't very keyboard navigatable, use button or tabIndex with extra handlers
              <ImageListItem
                key={photo.id}
                sx={{ cursor: "pointer", position: "relative" }}
                onClick={() => handleSelectPhoto(photo)}
              >
                <Box>
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="fill"
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography textAlign="center">No photos found</Typography>
        )}
      </Container>
      {selectedPhoto && (
        <FullScreenImageDialog
          onClose={handleCloseFullScreenModal}
          open={!!selectedPhoto}
        >
          <Box>
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              width={1}
              height={1}
              layout="responsive"
              objectFit="fill"
            />
          </Box>
        </FullScreenImageDialog>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  /*
    - Ensure thumbnails are kept to a reasonable amount of compression to reduce file size without
      sacrificing quality. Should help reduce some lighthouse scores - improving SEO and reducing bounce rate
    - Add pagination like the Feed page
    - Only fetch photos for the vault from the relevant source, e.g. a creator if it's for a specific creator.
  */
  try {
    const imagesResponse = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=40"
    );
    const photos: Photo[] = await imagesResponse.json();

    return {
      props: {
        photos,
      },
    };
  } catch (error) {
    // Add some form of monitoring here, e.g. sentry or honeycomb
    console.error(error);

    return {
      props: {
        photos: [],
      },
    };
  }
};

export default Vault;
