import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, GridItem, Image, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Title, { UserTitle } from "./title";
import TitleCard from "./title_card";
import TitlesSearch from "./titles_search";
import Header from "../sections/header";

interface UserGameProps {
    titles: Array<UserTitle>;
    endpoint: string;
}

const UserTitles: React.FC<UserGameProps> = ({titles, endpoint}: UserGameProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      isOpen: titleOpen,
      onOpen: onTitleOpen,
      onClose: onTitleClose,
    } = useDisclosure();
    const [clickedTitle, setClickedTitle] = useState<UserTitle>();
    const [clickedRating, setClickedRating] = useState<number>(0);
    const [sortBy, setSorting] = useState<string>("title");

    const clickTitle = (m: UserTitle) => {
        setClickedTitle(m);
        setClickedRating(m.rating);
        onTitleOpen();
    };

    console.log(titles)

    switch (sortBy) {
      case "dateAdded":
        titles = titles.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
      case "rating":
        titles = titles.sort((a, b) => b.rating - a.rating);
        break;
      case "title":
        titles = titles.sort((a, b) => a.title.name.localeCompare(b.title.name));
        break;
    }

    const upsertTitle = async (userTitle: UserTitle, method: string): Promise<void> => {
      userTitle.isAdded = true;
      const resp = await fetch(`/api/${endpoint}`, {
        method: method,
        body: JSON.stringify(userTitle),
        credentials: "include",
      });
      if (resp.status === 200) {
        location.reload();
      } else {
        console.error(resp);
      }
    };
  
    const refreshTitle = async (): Promise<void> => {
      const resp = await fetch(`/api/refresh-${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(clickedTitle),
        credentials: 'include',
      });
      if (resp.status === 200) {
        location.reload();
      } else {
        console.error(resp);
      }
    };

    return (
      <div>
      <div style={{ paddingLeft: 40 }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sort
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSorting("dateAdded")}>
              Date Added
            </MenuItem>
            <MenuItem onClick={() => setSorting("rating")}>Rating</MenuItem>
            <MenuItem onClick={() => setSorting("title")}>Title</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <TitlesSearch
        isOpen={isOpen}
        onClose={onClose}
        setClickedTitle={setClickedTitle}
        setClickedRating={setClickedRating}
        onTitleOpen={onTitleOpen}
        endpoint={endpoint}
      />
      {clickedTitle !== undefined ? (
        <TitleCard
          isOpen={titleOpen}
          onClose={onTitleClose}
          userTitle={clickedTitle}
          setClickedTitle={setClickedTitle}
          upsertTitle={upsertTitle}
          refreshTitle={refreshTitle}
        />
      ) : (
        <></>
      )}
      <SimpleGrid
        paddingLeft="40px"
        paddingRight="40px"
        minChildWidth="240px"
        spacing='3vw'
        gridTemplateColumns={"repeat(auto-fill, minmax(240px, 1fr))"}
      >
        <GridItem key="plus">
          <Image
            src={"/plus_icon.png"}
            alt="plus"
            h="340px"
            w="240px"
            _hover={{
              cursor: "pointer",
            }}
            onClick={onOpen}
          />
        </GridItem>
        {titles.map((st: UserTitle) => (
          <GridItem key={st.title.name}>
            <Title st={st} clickTitle={clickTitle} />
          </GridItem>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default UserTitles;