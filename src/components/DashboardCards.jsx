import "../css/DashboardCards.css";
import {
  FaLeaf,
  FaCar,
  FaBullseye,
  FaGlobe
} from "react-icons/fa";

function DashboardCards() {

  const cards = [
    {
      title: "Carbon Emission",
      value: "125 kg",
      subtitle: "This Month",
      icon: <FaLeaf />,
      color: "green"
    },
    {
      title: "Activities",
      value: "18",
      subtitle: "Today's Activities",
      icon: <FaCar />,
      color: "blue"
    },
    {
      title: "Goal Progress",
      value: "70%",
      subtitle: "Monthly Goal",
      icon: <FaBullseye />,
      color: "orange"
    },
    {
      title: "Eco Score",
      value: "85/100",
      subtitle: "Excellent",
      icon: <FaGlobe />,
      color: "purple"
    }
  ];

  return (

    <section className="cards">

      {cards.map((card, index) => (

        <div className={`card ${card.color}`} key={index}>

          <div className="card-top">

            <div>

              <h4>{card.title}</h4>

              <h2>{card.value}</h2>

              <p>{card.subtitle}</p>

            </div>

            <div className="icon-box">

              {card.icon}

            </div>

          </div>

          <div className="progress">

            <div className="progress-bar"></div>

          </div>

        </div>

      ))}

    </section>

  );

}

export default DashboardCards;