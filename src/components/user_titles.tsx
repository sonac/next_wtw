import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Title, { UserTitle } from "./title";
import TitleCard from "./title_card";
import TitlesSearch from "./titles_search";
import SeasonCard from "./seasons_card";

interface UserGameProps {
  titles: Array<UserTitle>;
  endpoint: string;
  isDiscovery: boolean;
}

const UserTitles: React.FC<UserGameProps> = ({
  titles,
  endpoint,
  isDiscovery,
}: UserGameProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: titleOpen,
    onOpen: onTitleOpen,
    onClose: onTitleClose,
  } = useDisclosure();
  const [clickedTitle, setClickedTitle] = useState<UserTitle>();
  const [sortBy, setSorting] = useState<string>("");

  const clickTitle = (m: UserTitle): void => {
    setClickedTitle(m);
    onTitleOpen();
  };

  switch (sortBy) {
    case "dateAdded":
      titles = titles.sort(
        (a, b) =>
          new Date(b.dateAdded || "0000").getTime() -
          new Date(a.dateAdded || "0000").getTime()
      );
      break;
    case "rating":
      titles = titles.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "title":
      titles = titles.sort((a, b) => a.title.name.localeCompare(b.title.name));
      break;
  }

  const upsertTitle = async (
    userTitle: UserTitle,
    method: string
  ): Promise<void> => {
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
      method: "PUT",
      body: JSON.stringify(clickedTitle),
      credentials: "include",
    });
    if (resp.status === 200) {
      location.reload();
    } else {
      console.error(resp);
    }
  };

  const gridTitles = titles.map((ut: UserTitle) => (
    <GridItem key={ut.title.name}>
      <Title st={ut} clickTitle={clickTitle} />
    </GridItem>
  ));

  let gridItems = [];

  if (!isDiscovery) {
    gridItems.push(
      <GridItem key="plus">
        <Image
          src={"/plus_icon.png"}
          alt="plus"
          h={["220", "280", "340px"]}
          w={["150px", "200px", "240px"]}
          _hover={{
            cursor: "pointer",
          }}
          onClick={onOpen}
        />
      </GridItem>
    );
  }

  gridItems = gridItems.concat(gridTitles);

  return (
    <div>
      {!isDiscovery ? (
        <div>
          <div style={{ paddingLeft: 40 }}>
            <Menu id="menu" isLazy>
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
            onTitleOpen={onTitleOpen}
            endpoint={endpoint}
          />{" "}
        </div>
      ) : (
        <div></div>
      )}
      {clickedTitle !== undefined ? (
        clickedTitle.title.seasons && clickedTitle.title.seasons.length > 0 ? (
          <SeasonCard
            isOpen={titleOpen}
            onClose={onTitleClose}
            userTitle={clickedTitle}
            clickTitle={clickTitle}
          />
        ) : (
          <TitleCard
            isOpen={titleOpen}
            onClose={onTitleClose}
            userTitle={clickedTitle}
            setClickedTitle={setClickedTitle}
            upsertTitle={upsertTitle}
            refreshTitle={refreshTitle}
          />
        )
      ) : (
        <></>
      )}
      <SimpleGrid
        paddingLeft={{ lg: "30px", "2xl": "40px" }}
        paddingRight={{ lg: "30px", "2xl": "40px" }}
        spacing={{ lg: "2.5vw", "2xl": "3vw" }}
        gridTemplateColumns={{
          lg: "repeat(auto-fill, minmax(200px, 1fr))",
          "2xl": "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {gridItems}
      </SimpleGrid>
    </div>
  );
};

export default UserTitles;
