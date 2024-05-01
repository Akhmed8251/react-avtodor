import TreeNode from "./TreeNode";

const Tree = ({ treeData, openFn, isMainMenu = false }) => {
  return (
    <ul className={`${isMainMenu ? "header-menu__list" : "menu__list"}`}>
      
      {treeData.map((node) => (
        node.children?.length > 0
        ?
        <li
          key={node.key}
          className={`${isMainMenu ? "header-menu__item" : "menu__item"} menu-item has-submenu`}
          onClick={openFn}
        >
        <TreeNode node={node} key={node.key} /> 
      </li>
        :
        <li key={node.key} className={`${isMainMenu ? "header-menu__item" : "menu__item"}`}
          onClick={openFn}>
          <a href={node.label} className={`${isMainMenu ? "header-menu__link" : "menu__link"}`}>{node.label}</a>
        </li>
      ))}
    </ul>
  );
};

export default Tree;
