import React, { useState } from "react";
import { Box, Checkbox, Stack } from "@chakra-ui/core";
import { useEffect } from "react";

const _fixture = {
  id: 1,
  name: "1",
  children: [
    {
      id: 11,
      name: 11,
      children: [
        { id: 111, name: 111 },
        { id: 112, name: 112 }
      ]
    },
    {
      id: 12,
      name: 12,
      children: [
        { id: 121, name: 121 },
        { id: 122, name: 122 }
      ]
    }
  ]
};

const initializeState = (prop) => {
  if (typeof prop.state === "undefined") {
    prop.state = false;
  }
};

const truethy = (prop) => {
  initializeState(prop);
  return prop.state;
};

export default function App() {
  const [fixture, setFixture] = useState(_fixture);

  useEffect(() => {
    console.log(fixture);
  }, [fixture]);

  return (
    <Box bg="gray.400">
      <Checkbox
        isChecked={fixture.children.some((child) =>
          child.children.some(truethy)
        )}
        isIndeterminate={
          !fixture.children.every((child) => child.children.every(truethy)) &&
          fixture.children.some((child) => child.children.some(truethy))
        }
        onChange={() => {}}
      >
        {fixture.name}
      </Checkbox>
      <Stack ml="4">
        {fixture.children.map((child, index) => {
          return (
            <div key={child.id}>
              <Checkbox
                isChecked={child.children.every(truethy)}
                isIndeterminate={
                  child.children.some(truethy) && !child.children.every(truethy)
                }
                onChange={(e) => {
                  const prev = { ...fixture };
                  initializeState(child);
                  prev.children[index].state = !child.state;
                  prev.children[index].children.forEach((item) => {
                    item.state = child.state;
                  });

                  setFixture(prev);
                }}
              >
                {child.name}
              </Checkbox>
              <Stack ml="4">
                {child.children.map((grand, gIndex) => {
                  return (
                    <Checkbox
                      key={grand.id}
                      isChecked={grand.state}
                      onChange={(e) => {
                        const prev = { ...fixture };
                        initializeState(prev.children[index]);
                        initializeState(prev.children[index].children[gIndex]);
                        prev.children[index].children[
                          gIndex
                        ].state = !grand.state;
                        setFixture(prev);
                      }}
                    >
                      {grand.name}
                    </Checkbox>
                  );
                })}
              </Stack>
            </div>
          );
        })}
      </Stack>
    </Box>
  );
}
