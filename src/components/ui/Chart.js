const Chart = (props) => {
  return (
    <div className="main-chart">
      <div className="main-chart__header">
        <h2 className="main-chart__title">{props.title}</h2>
      </div>
      <div className="main-chart__body">
        <div className="main-chart__data">
          <div className="main-chart__amount">
            <span className="main-chart__total">{props.yearAmount}$</span>
            <p className="main-chart__text">Year total</p>
          </div>
          <div className="main-chart__amount">
            <span className="main-chart__month">{props.monthAmount}$</span>
            <p className="main-chart__text">{props.currentMonth} total</p>
          </div>
        </div>
        <div className="main-chart__chart">
          {props.children}
        </div>
      </div>
    </div>
  );
};


export default Chart;