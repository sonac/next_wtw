import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Text,
  Grid,
  Heading,
  GridItem,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TitleInterface } from "./title";

interface CardProps {
  isOpen: boolean;
  onClose: any;
  title: TitleInterface;
  clickedRating: number;
  setClickedRating: Dispatch<SetStateAction<number>>;
  upsertTitle: () => Promise<void>;
  refreshTitle: () => Promise<void>;
  removeTitle: () => Promise<void>;
}

const TitleCard: React.FC<CardProps> = ({
  isOpen,
  onClose,
  title,
  clickedRating,
  setClickedRating,
  upsertTitle,
  refreshTitle,
  removeTitle,
}: CardProps) => {
  const getBg = (rtng: number): string => {
    if (rtng == clickedRating) {
      return "rgba(120, 116, 171, 0.52)";
    }
    return "transparent";
  };

  console.log(title)

  return (
    <Modal
      variant={"movie"}
      isOpen={isOpen}
      size={"xl"}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody bg="rgba(34, 34, 34, 0.7)" w="60vw">
          <Flex flexDirection="row">
            <Image
              src={`${title.posterLink}`}
              alt={title.name}
              maxW="40%"
              minW="40%"
            />
            <Flex flexDir="column" p='10px' justifyContent="space-between">
              <Heading
                paddingTop='10px'
                paddingLeft={25}
                size="2xl"
                color="white"
              >
                {title.name}
              </Heading>
              <Grid
                p={25}
                templateColumns="repeat(3, 1fr)"
                justifyContent="space-between"
                templateRows="repeat(2,1fr)"
              >
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Year
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Rating
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    Rating Count
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {title.year}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {title.rating}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color="white" fontWeight="bold">
                    {title.ratingCount}
                  </Text>
                </GridItem>
              </Grid>
              <Text fontSize="xl" color="white">
                {title.description.length > 0
                  ? title.description
                  : "No description provided"}
              </Text>
              <Flex flexDir="row" mt='3vh'>
                <Button onClick={refreshTitle} colorScheme='teal' variant='outline' w='30%'>Refresh info</Button>
                <Button onClick={removeTitle} ml='3vw' colorScheme='red' variant='outline' w='20%'>Delete</Button>
                <FormControl ml='3vw' display='flex' alignItems='center'>
                  <FormLabel htmlFor='is-finished' mb='0' fontSize='20px' color='gray'><b>Is finished?</b></FormLabel>
                  <Switch id='is-finished' defaultChecked={title.isFinished} onChange={(e) => title.isFinished = !title.isFinished}/>
                </FormControl>
              </Flex>
              <Flex
                flexDir="row"
                paddingTop={10}
                paddingBottom={10}
                justifyContent="space-between"
              >
                <Box
                  bg={getBg(1)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(1)}
                >
                  <Text align="center">1</Text>
                </Box>
                <Box
                  bg={getBg(2)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(2)}
                >
                  <Text align="center">2</Text>
                </Box>
                <Box
                  bg={getBg(3)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(3)}
                >
                  <Text align="center">3</Text>
                </Box>
                <Box
                  bg={getBg(4)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(4)}
                >
                  <Text align="center">4</Text>
                </Box>
                <Box
                  bg={getBg(5)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(5)}
                >
                  <Text align="center">5</Text>
                </Box>
                <Box
                  bg={getBg(6)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(6)}
                >
                  <Text align="center">6</Text>
                </Box>
                <Box
                  bg={getBg(7)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(7)}
                >
                  <Text align="center">7</Text>
                </Box>
                <Box
                  bg={getBg(8)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(8)}
                >
                  <Text align="center">8</Text>
                </Box>
                <Box
                  bg={getBg(9)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(9)}
                >
                  <Text align="center">9</Text>
                </Box>
                <Box
                  bg={getBg(10)}
                  className="rating"
                  color="white"
                  borderWidth="1px"
                  borderRadius="0.5em"
                  maxH="1.5em"
                  w="1.5em"
                  onClick={() => setClickedRating(10)}
                >
                  <Text align="center">10</Text>
                </Box>
              </Flex>
              <Button onClick={upsertTitle}>
                {title.isSynced ? "Update" : "Add"}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TitleCard;
