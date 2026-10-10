import { HouseAssemblyHero } from "../../features/house-assembly";
import CompanyIntroSection from "../../components/Home/CompanyIntroSection";
import HeroSection from "../../components/Home/HeroSection";
import StatsBand from "../../components/Home/StatsBand";
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
      <HouseAssemblyHero />
      <CompanyIntroSection />
      {/* Khối tìm kiếm (hero cũ) giữ nguyên chức năng, nằm sau phần giới thiệu */}
      <HeroSection />
      <StatsBand />
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
