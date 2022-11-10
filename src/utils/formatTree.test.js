const formatTree = require("./formatTree");

test("formatTree", () => {
  const tree = formatTree([
    {
      id: "1",
      title: "1",
      expanded: false,
      parent: null,
    },
    {
      id: "2",
      title: "1",
      expanded: false,
      parent: "1",
    },
    {
      id: "3",
      title: "1",
      expanded: false,
      parent: "2",
    },
    {
      id: "4",
      title: "1",
      expanded: false,
      parent: "2",
    },
    {
      id: "4.4",
      title: "1",
      expanded: false,
      parent: "4",
    },
    {
      id: "5",
      title: "1",
      expanded: false,
      parent: null,
    },
    {
      id: "6",
      title: "1",
      expanded: false,
      parent: "5",
    },
    {
      id: "7",
      title: "1",
      expanded: false,
      parent: "5",
    },
  ]);

  //console.log(JSON.stringify(tree, null, 2));

  expect(tree).toEqual([
    {
      id: "1",
      title: "1",
      expanded: false,
      parent: null,
      children: [
        {
          id: "2",
          title: "1",
          expanded: false,
          parent: "1",
          children: [
            {
              id: "3",
              title: "1",
              expanded: false,
              parent: "2",
              children: [],
            },
            {
              id: "4",
              title: "1",
              expanded: false,
              parent: "2",
              children: [
                {
                  id: "4.4",
                  title: "1",
                  expanded: false,
                  parent: "4",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "5",
      title: "1",
      expanded: false,
      parent: null,
      children: [
        {
          id: "6",
          title: "1",
          expanded: false,
          parent: "5",
          children: [],
        },
        {
          id: "7",
          title: "1",
          expanded: false,
          parent: "5",
          children: [],
        },
      ],
    },
  ]);
});
