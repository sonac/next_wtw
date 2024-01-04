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
  setClickedTitle: (title: UserTitle) => void;
}

const seasonToTitle = (season: Season, title: UserTitle): UserTitle => {
  const newTitle = { ...title };
  newTitle.title.name = season.name;
  newTitle.title.numEpisodes = season.episodeCount;
  newTitle.title.seasons = [];
  newTitle.title.rating = season.voteAverage;
  return newTitle;
};

const SeasonsCard: React.FC<SeasonsProps> = ({
  isOpen,
  onClose,
  userTitle,
  setClickedTitle,
}) => {
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
                <Image src={s.posterLink} />
              </GridItem>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SeasonsCard;
