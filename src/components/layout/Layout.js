import Navigation from "./Navigation";
import Menu from "./Menu";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main>
        <div className="container">
          <div className="content">
            <div className="content__left">
              <Menu />
            </div>
            <div className="content__right">{props.children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
