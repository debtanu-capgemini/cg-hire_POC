function HireProcessBar() {
  return (
    <div className="hire-process-bar-container container-fluid">
      <ul className="hire-process-steps me-5">
        <div className="hire-step-number">1</div>
        <div className="hire-steps">Basic Informatiom</div>
        <hr />
        <div className="hire-step-number">2</div>

        <div className="hire-steps">Interview Process</div>
        <hr />
        <div className="hire-step-number">3</div>
        <div className="hire-steps">Final Process</div>
      </ul>
    </div>
  );
}

export default HireProcessBar;
