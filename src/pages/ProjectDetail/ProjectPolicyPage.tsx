import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, HIGHLIGHTS, SCHEDULE, LOAN_STATS, CONDITIONS } from "../../data/projectDetail/policy";
import PolicyHero from "../../components/ProjectDetail/policy/PolicyHero";
import PolicyHighlights from "../../components/ProjectDetail/policy/PolicyHighlights";
import PaymentAndLoan from "../../components/ProjectDetail/policy/PaymentAndLoan";
import PolicyConditions from "../../components/ProjectDetail/policy/PolicyConditions";

export default function ProjectPolicyPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;

  return (
    <div className="bg-primary-50/70">
      <ProjectTabs />

      <div className="container mx-auto px-4 pb-20 pt-8 lg:px-8">
        {/* Hero */}
        <PolicyHero base={base} project={PROJECT} />

        {/* Ưu đãi nổi bật */}
        <PolicyHighlights highlights={HIGHLIGHTS} />

        {/* Tiến độ thanh toán + vay */}
        <PaymentAndLoan schedule={SCHEDULE} loanStats={LOAN_STATS} />

        {/* Điều kiện */}
        <PolicyConditions conditions={CONDITIONS} />
      </div>
    </div>
  );
}
