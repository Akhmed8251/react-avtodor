import {useState} from "react";
import Tree from "./Tree";

const TreeNode = ({ node }) => {
  const { children, label } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    
    <>
      {/* <div onClick={handleClick} style={{ marginBottom: "10px" }}>
        <span>{label}</span>
      </div>
      <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
        {showChildren && <Tree treeData={children} />}
      </ul> */}
      <div className="header-menu__submenu-wrapper submenu-wrapper" onClick={handleClick}>
          <a href={label} className="submenu-wrapper__link">
            {label}
          </a>
          <button className="submenu-wrapper__btn submenu-btn">
            <div className="submenu-btn__icon">
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
          <ul className="submenu__list">
            {/* {mainMenuItem.childMenu.map((childMenuItem, idx) => (
              <li key={idx} className="submenu__item">
                <a href={childMenuItem.link} className="submenu__link">
                  {childMenuItem.name}
                </a>
              </li>
            ))} */}
            <Tree treeData={children} />
          </ul>
        </div>
    </>
  );
};

export default TreeNode;
