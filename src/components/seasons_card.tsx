import {
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import React from "react";
import Title, { Season, UserTitle } from "./title";

interface SeasonsProps {
  isOpen: boolean;
  onClose: any;
  userTitle: UserTitle;
  clickTitle: (title: UserTitle) => void;
}

const seasonToTitle = (season: Season, title: UserTitle): UserTitle => {
  const newTitle = { ...title };
  newTitle.title.name = `${title.title.name} ${season.name}`;
  newTitle.title.numEpisodes = season.episodeCount;
  newTitle.title.seasons = [];
  newTitle.title.rating = season.voteAverage;
  newTitle.title.posterLink = season.posterLink;
  return newTitle;
};

const SeasonsCard: React.FC<SeasonsProps> = ({
  isOpen,
  onClose,
  userTitle,
  clickTitle,
}) => {
  console.log(userTitle);
  return (
    <Modal
      variant={"movie"}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {userTitle.title.name} ({userTitle.title.year})
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {userTitle.title.seasons.map((s) => (
              <GridItem key={s.name}>
                <Image
                  src={s.posterLink}
                  h={["220", "280", "340px"]}
                  w={["150px", "200px", "240px"]}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => clickTitle(seasonToTitle(s, userTitle))}
                />
              </GridItem>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SeasonsCard;
