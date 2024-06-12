import TreeNode from "./TreeNode";

const Tree = ({ treeData, openFn, isMainMenu = false }) => {
  return (
    <ul className={`${isMainMenu ? "header-menu__list" : "menu__list"}`}>
      {treeData.map((node) => (
        (node.childMenu?.length > 0 || node.childMenus?.length > 0)
        ?
        <li
          key={node.id}
          className={`${isMainMenu ? "header-menu__item" : "menu__item"} menu-item has-submenu`}
          onClick={openFn}
        >
        <TreeNode node={node} key={node.id} /> 
      </li>
        :
        <li key={node.id} className={`${isMainMenu ? "header-menu__item" : "menu__item"}`}
          onClick={openFn}>
          <a href={node.link} className={`${isMainMenu ? "header-menu__link" : "menu__link"}`}>{node.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default Tree;
