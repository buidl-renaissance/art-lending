import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

interface Deliverable {
  text: string;
  completed?: boolean;
}

interface Metric {
  value: string;
  label: string;
}

interface Phase {
  id: string;
  title: string;
  timeline: string;
  status: 'progress' | 'planned' | 'vision';
  description: string;
  objectives: string[];
  deliverables: Deliverable[];
  metrics: Metric[];
}

const PageWrapper = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.darkBg} 0%, ${({ theme }) => theme.charcoal} 100%);
  color: ${({ theme }) => theme.white};
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="nodes" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(212,175,55,0.1)"/><path d="M10,10 L15,5 M10,10 L5,15" stroke="rgba(64,224,208,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23nodes)"/></svg>');
    z-index: -1;
    pointer-events: none;
  }
`;

const Header = styled.header`
  padding: 2rem 2rem 0;
  max-width: 1400px;
  margin: 0 auto;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.gold};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    color: ${({ theme }) => theme.white};
  }

  &::before {
    content: "←";
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.white};
  line-height: 1.1;
  
  .accent {
    color: ${({ theme }) => theme.gold};
    font-style: italic;
  }
`;

const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  margin-bottom: 3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const PhaseNavigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PhaseTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.gold : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? props.theme.darkBg : props.theme.white};
  border: 2px solid ${({ theme }) => theme.gold};
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:hover {
    background: ${props => props.active ? props.theme.mutedGold : props.theme.gold};
    color: ${({ theme }) => theme.darkBg};
    transform: translateY(-2px);
  }
`;

const PhaseSection = styled.section<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
  animation: ${props => props.visible ? 'fadeIn 0.5s ease-in' : 'none'};

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const PhaseHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.gold}40;
`;

const PhaseTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: ${({ theme }) => theme.gold};
  margin-bottom: 1rem;
`;

const PhaseTimeline = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.teal};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const PhaseStatus = styled.div<{ status: 'progress' | 'planned' | 'vision' }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  background: ${props => {
    switch(props.status) {
      case 'progress': return props.theme.teal;
      case 'planned': return props.theme.purple;
      case 'vision': return props.theme.mutedGold;
      default: return props.theme.gold;
    }
  }};
  color: ${({ theme }) => theme.darkBg};
`;

const PhaseDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2.5rem;
  border-left: 4px solid ${({ theme }) => theme.teal};
`;

const SectionTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.gold};
  margin-bottom: 2rem;
`;

const DeliverablesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DeliverableItem = styled.li<{ completed?: boolean }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &::before {
    content: "${props => props.completed ? '✅' : '📋'}";
    margin-right: 1rem;
    flex-shrink: 0;
    font-size: 1.2rem;
  }
`;

const DeliverableText = styled.div<{ completed?: boolean }>`
  font-family: 'Inter', sans-serif;
  color: ${props => props.completed ? props.theme.white : 'rgba(255, 255, 255, 0.9)'};
  line-height: 1.5;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const MetricCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.gold}20, ${({ theme }) => theme.teal}10);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.gold}30;
`;

const MetricValue = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.gold};
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const TimelineVisualization = styled.div`
  margin: 4rem 0;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.purple}40;
`;

const TimelineTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.purple};
  text-align: center;
  margin-bottom: 3rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, ${({ theme }) => theme.teal}, ${({ theme }) => theme.purple});
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div<{ side: 'left' | 'right' }>`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.side === 'left' ? 'flex-end' : 'flex-start'};

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineContent = styled.div<{ side: 'left' | 'right' }>`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  max-width: 350px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.gold}30;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    ${props => props.side === 'left' ? 'right: -10px' : 'left: -10px'};
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    ${props => props.side === 'left' 
      ? `border-left-color: rgba(255, 255, 255, 0.08);`
      : `border-right-color: rgba(255, 255, 255, 0.08);`
    }
  }

  @media (max-width: 768px) {
    &::before {
      left: -10px;
      border-right-color: rgba(255, 255, 255, 0.08);
      border-left-color: transparent;
    }
  }
`;

const TimelineDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.teal};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TimelinePhase = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin: 0;
`;

const phases: Phase[] = [
  {
    id: 'phase1',
    title: 'Foundation & MVP',
    timeline: 'October - December 2025',
    status: 'progress' as const,
    description: 'Launch core platform with basic loan functionality, onboard pilot artists, and establish proof of concept.',
    objectives: [
      'Launch core platform with basic loan functionality',
      'Onboard pilot artists and establish proof of concept',
      'Build foundational community and validate market fit'
    ],
    deliverables: [
      { text: 'Landing Page & Branding', completed: true },
      { text: 'Smart Contracts v1.0 - Basic loan creation and management' },
      { text: 'Artist Dashboard v1.0 - Loan applications and portfolio' },
      { text: 'Backer Dashboard v1.0 - Browse and invest interface' },
      { text: 'User authentication with Web3 wallets' },
      { text: 'Database schema and API routes' },
      { text: 'Artist membership system ($10/month)' }
    ],
    metrics: [
      { value: '3-5', label: 'Verified Artists' },
      { value: '5-10', label: 'Loan Cycles' },
      { value: '50+', label: 'Registered Backers' },
      { value: '$2-5K', label: 'Total Loans' }
    ]
  },
  {
    id: 'phase2',
    title: 'Fractionalization & Marketplace',
    timeline: 'Q1 2026 (January - March)',
    status: 'planned' as const,
    description: 'Enable micro-investments through loan fractionalization, launch secondary marketplace, and scale community growth.',
    objectives: [
      'Enable micro-investments through loan fractionalization',
      'Launch secondary marketplace for loan rights trading',
      'Scale artist onboarding and community growth'
    ],
    deliverables: [
      { text: 'Fractional Loan Rights (ERC-1155) - Tokenized loan fractions' },
      { text: 'Marketplace Contract - P2P trading of loan fractions' },
      { text: 'Automated Repayment System - Smart contract triggers' },
      { text: 'Enhanced Dashboards - Advanced portfolio analytics' },
      { text: 'Gamification System - Badges and leaderboards' },
      { text: 'Artist Success Programs - Referral incentives' }
    ],
    metrics: [
      { value: '15+', label: 'Active Artists' },
      { value: '200+', label: 'Registered Users' },
      { value: '$10K+', label: 'Active Loans' },
      { value: '500+', label: 'Fraction Trades' }
    ]
  },
  {
    id: 'phase3',
    title: 'Events & Automation',
    timeline: 'Q2-Q3 2026 (April - September)',
    status: 'planned' as const,
    description: 'Integrate with physical art events, implement automated valuation, and establish sustainable revenue streams.',
    objectives: [
      'Integrate with physical art events and galleries',
      'Implement automated valuation and risk assessment',
      'Establish sustainable revenue streams and partnerships'
    ],
    deliverables: [
      { text: 'AI-Powered Valuation Engine - Automated artwork pricing' },
      { text: 'Oracle Integration - Real-time market data feeds' },
      { text: 'Gallery Partnership System - Event integrations' },
      { text: 'POAP & NFT Integration - Digital twins and perks' },
      { text: 'Premium Features - Advanced analytics and access' },
      { text: 'Sponsorship Program - Corporate partnerships' }
    ],
    metrics: [
      { value: '100+', label: 'Artworks' },
      { value: '$50K+', label: 'Total Loans' },
      { value: '5+', label: 'Gallery Partners' },
      { value: '$5K+', label: 'Monthly Revenue' }
    ]
  },
  {
    id: 'phase4',
    title: 'Multi-City Expansion',
    timeline: '2027+',
    status: 'vision' as const,
    description: 'Expand to multiple cities, integrate with broader DeFi ecosystems, and establish as a global cooperative.',
    objectives: [
      'Expand to multiple cities and art markets',
      'Integrate with broader DeFi and NFT ecosystems',
      'Establish Open Artist Bank as a global cooperative'
    ],
    deliverables: [
      { text: 'Multi-City Architecture - Federated city networks' },
      { text: 'DeFi Integration - Yield farming and protocol integration' },
      { text: 'DAO Structure - Community governance tokens' },
      { text: 'Global Expansion - 10+ active markets' },
      { text: 'Celebrity Partnerships - High-profile campaigns' },
      { text: 'Institutional Features - Accredited investor tools' }
    ],
    metrics: [
      { value: '10+', label: 'Active Cities' },
      { value: '$1M+', label: 'Facilitated Loans' },
      { value: '1000+', label: 'Artists' },
      { value: '10K+', label: 'Backers' }
    ]
  }
];

const timelineData = [
  {
    date: 'Oct-Dec 2025',
    phase: 'Foundation & MVP',
    description: 'Launch core platform, onboard pilot artists, validate market fit'
  },
  {
    date: 'Q1 2026',
    phase: 'Fractionalization',
    description: 'Enable micro-investments, launch secondary marketplace'
  },
  {
    date: 'Q2-Q3 2026',
    phase: 'Events & Automation',
    description: 'Gallery partnerships, AI valuation, sustainable revenue'
  },
  {
    date: '2027+',
    phase: 'Global Expansion',
    description: 'Multi-city launch, DeFi integration, global cooperative'
  }
];

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState('phase1');

  return (
    <>
      <Head>
        <title>Roadmap | Open Artist Bank - Building the Future of Artist Financing</title>
        <meta
          name="description"
          content="Explore our 4-phase roadmap from MVP to global expansion. See how we're building the decentralized Artist Bank that transforms cultural investment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <PageWrapper>
        <Header>
          <BackLink href="/">
            Back to Home
          </BackLink>
        </Header>

        <HeroSection>
          <HeroTitle>
            Building the <span className="accent">Future</span><br/>
            of Artist <span className="accent">Financing</span>
          </HeroTitle>
          <HeroSubtitle>
            Our journey from MVP to a global network of artist banks, transforming how artists access capital and communities invest in culture.
          </HeroSubtitle>
        </HeroSection>

        <Main>
          <PhaseNavigation>
            {phases.map((phase) => (
              <PhaseTab
                key={phase.id}
                active={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
              >
                {phase.title}
              </PhaseTab>
            ))}
          </PhaseNavigation>

          {phases.map((phase) => (
            <PhaseSection key={phase.id} visible={activePhase === phase.id}>
              <PhaseHeader>
                <PhaseTitle>{phase.title}</PhaseTitle>
                <PhaseTimeline>{phase.timeline}</PhaseTimeline>
                <PhaseStatus status={phase.status}>
                  {phase.status === 'progress' ? '🔄 In Progress' : 
                   phase.status === 'planned' ? '📋 Planned' : '🔮 Vision'}
                </PhaseStatus>
                <PhaseDescription>{phase.description}</PhaseDescription>
              </PhaseHeader>

              <ContentGrid>
                <ContentSection>
                  <SectionTitle>🎯 Objectives</SectionTitle>
                  <DeliverablesList>
                    {phase.objectives.map((objective, index) => (
                      <DeliverableItem key={index}>
                        <DeliverableText>{objective}</DeliverableText>
                      </DeliverableItem>
                    ))}
                  </DeliverablesList>
                </ContentSection>

                <ContentSection>
                  <SectionTitle>🛠️ Key Deliverables</SectionTitle>
                  <DeliverablesList>
                    {phase.deliverables.map((deliverable, index) => (
                      <DeliverableItem key={index} completed={deliverable.completed}>
                        <DeliverableText completed={deliverable.completed}>
                          {deliverable.text}
                        </DeliverableText>
                      </DeliverableItem>
                    ))}
                  </DeliverablesList>
                </ContentSection>
              </ContentGrid>

              <MetricsGrid>
                {phase.metrics.map((metric, index) => (
                  <MetricCard key={index}>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricLabel>{metric.label}</MetricLabel>
                  </MetricCard>
                ))}
              </MetricsGrid>
            </PhaseSection>
          ))}

          <TimelineVisualization>
            <TimelineTitle>Development Timeline</TimelineTitle>
            <TimelineContainer>
              {timelineData.map((item, index) => (
                <TimelineItem key={index} side={index % 2 === 0 ? 'left' : 'right'}>
                  <TimelineContent side={index % 2 === 0 ? 'left' : 'right'}>
                    <TimelineDate>{item.date}</TimelineDate>
                    <TimelinePhase>{item.phase}</TimelinePhase>
                    <TimelineDescription>{item.description}</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </TimelineVisualization>
        </Main>
      </PageWrapper>
    </>
  );
}
