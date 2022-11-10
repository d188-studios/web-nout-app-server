function formatTree(pages) {
  const tree = [];

  pages.forEach((page) => {
    const { id, title, expanded, parent } = page;
    if (page.parent === null) {
      tree.push({ id, title, expanded, parent, children: [] });

      const addChildren = (parent) => {
        pages.forEach((page) => {
          if (page.parent === parent.id) {
            parent.children.push({
              id: page.id,
              title: page.title,
              expanded: page.expanded,
              parent: page.parent,
              children: [],
            });

            addChildren(parent.children[parent.children.length - 1]);
          }
        });
      };

      addChildren(tree[tree.length - 1]);
    }
  });

  return tree;
}
