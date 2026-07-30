import "../css/GoalProgress.css";

function GoalProgress() {
  return (
    <div className="goal-card">

      <h3>🎯 Monthly Goal</h3>

      <div className="progress-circle">
        <div className="progress-value">
          70%
        </div>
      </div>

      <p>You have completed 70% of your monthly sustainability goal.</p>

    </div>
  );
}

export default GoalProgress;