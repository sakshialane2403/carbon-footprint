import "../css/RecentActivities.css";
import {
  FaCar,
  FaBolt,
  FaShoppingBag,
  FaUtensils
} from "react-icons/fa";

function RecentActivities() {

  const activities = [

    {
      icon:<FaCar />,
      activity:"Car Travel",
      category:"Transport",
      date:"Today",
      carbon:"25 kg",
      status:"Completed"
    },

    {
      icon:<FaBolt />,
      activity:"Electricity",
      category:"Energy",
      date:"Yesterday",
      carbon:"18 kg",
      status:"Completed"
    },

    {
      icon:<FaUtensils />,
      activity:"Food",
      category:"Food",
      date:"22 Jul",
      carbon:"12 kg",
      status:"Completed"
    },

    {
      icon:<FaShoppingBag />,
      activity:"Shopping",
      category:"Lifestyle",
      date:"20 Jul",
      carbon:"8 kg",
      status:"Completed"
    }

  ];

  return (

    <div className="activity-card">

      <div className="activity-header">

        <h2>Recent Activities</h2>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Activity</th>
            <th>Category</th>
            <th>Date</th>
            <th>CO₂</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {

            activities.map((item,index)=>(

              <tr key={index}>

                <td>

                  <div className="activity-info">

                    <div className="activity-icon">

                      {item.icon}

                    </div>

                    {item.activity}

                  </div>

                </td>

                <td>

                  <span className="category">

                    {item.category}

                  </span>

                </td>

                <td>{item.date}</td>

                <td>{item.carbon}</td>

                <td>

                  <span className="status">

                    {item.status}

                  </span>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default RecentActivities;