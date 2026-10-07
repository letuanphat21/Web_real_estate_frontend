import ProjectsSection from "../../components/Home/ProjectsSection";
import MapSection from "../../components/Home/MapSection";
import AiAssistantSection from "../../components/Home/AiAssistantSection";
import CompareSection from "../../components/Home/CompareSection";
import BrokerToolsSection from "../../components/Home/BrokerToolsSection";
import NewsSection from "../../components/Home/NewsSection";
import CareerSection from "../../components/Home/CareerSection";

export default function HomePage() {
  return (
    <>
      <ProjectsSection />
      <MapSection />
      <AiAssistantSection />
      <CompareSection />
      <BrokerToolsSection />
      <NewsSection />
      <CareerSection />
    </>
  );
}
