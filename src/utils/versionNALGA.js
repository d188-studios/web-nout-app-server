function formatTree(pages) {
  const tree = [];
  let json = "[";

  pages.forEach((page) => {
    const { id, title, expanded, parent } = page;
    if (page.parent === null) {
      json += `{ "id": "${id}", "title": "${title}","expanded": ${expanded},"parent": ${parent} ,"children": [`;
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

            json += `{ "id": "${page.id}", "title": "${title}","parent": "${parent.id}", "expanded": ${expanded}, "children": [`;

            addChildren(parent.children[parent.children.length - 1]);

            json += "]},";
          }
        });
      };

      addChildren(tree[tree.length - 1]);
      json += "]},";
    }
  });

  json += "]";
  json = json.replace(/},]/g, "}]");

  // console.log(JSON.stringify(JSON.parse(json), null, 2));
  return JSON.parse(json);
}
