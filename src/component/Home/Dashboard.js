import HRDashboard from "./HRDashboard";
import InterviewerDashboard from "./InterviewerDashboard";

export default function Dashboard() {
  const role = window.sessionStorage.getItem("role");
  if (role === "HR") {
    return <HRDashboard />;
  }
  if (role === "Portal User") {
    return <InterviewerDashboard />;
  }
}
