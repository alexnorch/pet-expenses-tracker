import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <i className="far fa-credit-card" />
          <Link className="menu__link" to="/expenses">
            Expenses
          </Link>
        </li>
        <li className="menu__item">
          <i className="fas fa-piggy-bank" />
          <Link className="menu__link" to="/savings">
            Savings
          </Link>
        </li>
        
      </ul>
    </aside>
  );
};

export default Menu;
