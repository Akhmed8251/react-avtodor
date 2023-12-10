import { useContext, useEffect } from "react";
import { AdminContext } from "../../../context";

const PartnersAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext)
  useEffect(() => {
    setCurrentPageName("Партнеры")
  }, [])

  return <section>PartnersAdmin</section>;
};

export default PartnersAdmin;
