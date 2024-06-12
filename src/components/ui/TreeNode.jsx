import {useState} from "react";
import Tree from "./Tree";

const TreeNode = ({ node }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    <>
      <div className="menu-wrapper" onClick={handleClick}>
          <a href={node.link} className="menu-wrapper__link">
            {node.name}
          </a>
          <button className="menu-wrapper__btn menu-wrapper-btn">
            <div className="menu-wrapper-btn__icon">
              <svg
                width="18"
                height="11"
                viewBox="0 0 18 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L9 9L17 1" stroke="#4a27c9" strokeWidth="2" />
              </svg>
            </div>
          </button>
        </div>
        <div className="submenu">
          <Tree treeData={node.childMenu ? node.childMenu : node.childMenus} />
        </div>
    </>
  );
};

export default TreeNode;
