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

interface WeeklyGoal {
  week: number;
  title: string;
  focus: string;
  deliverables: string[];
  metrics: string[];
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

const WeeklyBreakdown = styled.div`
  margin: 4rem 0;
  padding: 3rem;
  background: rgba(64, 224, 208, 0.05);
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.teal}40;
`;

const WeeklyTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.teal};
  text-align: center;
  margin-bottom: 3rem;
`;

const WeeklyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const WeekCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border-left: 4px solid ${({ theme }) => theme.teal};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

const WeekNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.teal};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const WeekTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
`;

const WeekFocus = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gold};
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WeekList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const WeekListItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.teal};
    font-weight: bold;
  }
`;

const phases: Phase[] = [
  {
    id: 'mvp',
    title: '4-Week MVP Sprint',
    timeline: '4 weeks from today',
    status: 'progress' as const,
    description: 'Focused MVP with one active loan (Danny\'s artwork). Build functioning contract and marketing mechanism to prove the core concept.',
    objectives: [
      'Create functioning loan contract and legal structure',
      'Build marketing mechanism for community participation',
      'Complete one successful loan cycle with Danny',
      'Validate the micro-credit + revenue-share model'
    ],
    deliverables: [
      { text: 'Landing Page & Branding', completed: true },
      { text: 'Simple loan contract template and legal structure' },
      { text: 'Danny\'s artwork documented and appraised' },
      { text: 'Basic web interface for single loan' },
      { text: 'Stripe payment processing setup' },
      { text: 'Marketing landing page and community outreach' },
      { text: 'Print marketplace setup (basic)' },
      { text: 'One complete loan-to-sale cycle documented' }
    ],
    metrics: [
      { value: '1', label: 'Active Loan' },
      { value: '10-20', label: 'Community Backers' },
      { value: '$500-1500', label: 'Total Raised' },
      { value: '1', label: 'Proof of Concept' }
    ]
  },
  {
    id: 'scale',
    title: 'Scale & Automation',
    timeline: 'Weeks 5-8 (Post-MVP)',
    status: 'planned' as const,
    description: 'Scale artist pipeline, improve platform based on user feedback, and add automation to reduce manual processes.',
    objectives: [
      'Scale to 10-15 active artists',
      'Improve platform based on MVP feedback',
      'Expand community to 100+ backers',
      'Add automated systems and enhanced features'
    ],
    deliverables: [
      { text: 'Automated loan processing and underwriting' },
      { text: 'Enhanced artist dashboard with analytics' },
      { text: 'Mobile-responsive improvements' },
      { text: 'Gallery partnership integrations' },
      { text: 'Advanced print marketplace features' },
      { text: 'Community features and social proof' }
    ],
    metrics: [
      { value: '10-15', label: 'Active Artists' },
      { value: '100+', label: 'Community Backers' },
      { value: '$20K+', label: 'Total Loans' },
      { value: '80%', label: 'Automated Processes' }
    ]
  },
  {
    id: 'expansion',
    title: 'Multi-City Expansion',
    timeline: 'Months 2-6 (2025)',
    status: 'planned' as const,
    description: 'Expand to additional cities, integrate with galleries, and establish sustainable revenue streams with institutional partnerships.',
    objectives: [
      'Launch in Chicago, Austin, or Portland',
      'Integrate with galleries and art institutions',
      'Establish sustainable revenue and partnerships',
      'Build advanced features and automation'
    ],
    deliverables: [
      { text: 'Multi-city platform architecture' },
      { text: 'Gallery partnership program' },
      { text: 'AI-powered valuation engine' },
      { text: 'Mobile app (iOS/Android)' },
      { text: 'Advanced analytics and reporting' },
      { text: 'Corporate sponsorship program' }
    ],
    metrics: [
      { value: '3+', label: 'Active Cities' },
      { value: '50+', label: 'Active Artists' },
      { value: '500+', label: 'Community Members' },
      { value: '$100K+', label: 'Total Loans' }
    ]
  },
  {
    id: 'global',
    title: 'Global Platform',
    timeline: '2026+ (Long-term Vision)',
    status: 'vision' as const,
    description: 'Establish global network of artist banks, integrate with DeFi ecosystems, and create open-source protocol for community adoption.',
    objectives: [
      'Launch in 10+ cities globally',
      'Integrate with broader DeFi and NFT ecosystems',
      'Create open-source protocol for community forking',
      'Establish as a global cooperative with DAO governance'
    ],
    deliverables: [
      { text: 'Global federated network architecture' },
      { text: 'DeFi protocol integration and yield farming' },
      { text: 'DAO governance with community tokens' },
      { text: 'Open-source Artist Bank Protocol' },
      { text: 'Celebrity and institutional partnerships' },
      { text: 'Advanced AI valuation and risk systems' }
    ],
    metrics: [
      { value: '10+', label: 'Global Cities' },
      { value: '$1M+', label: 'Annual Loans' },
      { value: '1000+', label: 'Active Artists' },
      { value: '10K+', label: 'Community Members' }
    ]
  }
];

const weeklyGoals: WeeklyGoal[] = [
  {
    week: 1,
    title: 'Contract & Legal Foundation',
    focus: 'Core legal structure and basic contract',
    deliverables: [
      'Simple loan contract template',
      'Basic terms and conditions',
      'Danny\'s artwork documented and appraised',
      'Legal structure for single loan'
    ],
    metrics: [
      'Loan contract ready for use',
      'Danny\'s artwork appraised and documented',
      'Legal framework established'
    ]
  },
  {
    week: 2,
    title: 'Payment Processing & Platform',
    focus: 'Basic payment system and user interface',
    deliverables: [
      'Stripe payment processing setup',
      'Simple loan management tracking',
      'Basic web interface for Danny\'s loan',
      'Manual backer onboarding process'
    ],
    metrics: [
      'Payment system operational',
      'Danny\'s loan page live',
      'Manual processes documented'
    ]
  },
  {
    week: 3,
    title: 'Community & Marketing',
    focus: 'Marketing mechanism and community building',
    deliverables: [
      'Marketing landing page for Danny\'s loan',
      'Community outreach campaign',
      'Print marketplace setup (basic)',
      'Backer registration and investment flow'
    ],
    metrics: [
      'Marketing page live and functional',
      '10-20 potential backers identified',
      'Print ordering system ready'
    ]
  },
  {
    week: 4,
    title: 'Launch & Validation',
    focus: 'Single loan launch and proof of concept',
    deliverables: [
      'Danny\'s loan goes live for community funding',
      'Complete one successful loan cycle',
      'Document the entire process',
      'Gather feedback for iteration'
    ],
    metrics: [
      '1 active loan successfully funded',
      '$500-1500 raised from community',
      'Loan-to-sale process documented',
      'Proof of concept validated'
    ]
  }
];

const timelineData = [
  {
    date: '4 Weeks',
    phase: '4-Week MVP Sprint',
    description: 'One active loan with Danny, functioning contract, marketing mechanism'
  },
  {
    date: 'Weeks 5-8',
    phase: 'Scale & Automation',
    description: 'Expand artist pipeline, improve platform, add automation'
  },
  {
    date: 'Months 2-6',
    phase: 'Multi-City Expansion',
    description: 'Gallery partnerships, additional cities, mobile app'
  },
  {
    date: '2026+',
    phase: 'Global Platform',
    description: 'Global network, DeFi integration, open-source protocol'
  }
];

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState('mvp');

  return (
    <>
      <Head>
        <title>4-Week MVP Sprint | Emerging Artist Credit Fund</title>
        <meta
          name="description"
          content="Fast-track to market in 4 weeks. Danny + local artists, real loans, community investment. See our sprint roadmap from MVP to global expansion."
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
            <span className="accent">4-Week MVP</span> Sprint<br/>
            to Market <span className="accent">Launch</span>
          </HeroTitle>
          <HeroSubtitle>
            Fast-track launch with Danny + local artists. Prove the micro-credit + revenue-share model with real loans, real community investment, and real results.
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

          {activePhase === 'mvp' && (
            <WeeklyBreakdown>
              <WeeklyTitle>4-Week Sprint Breakdown</WeeklyTitle>
              <WeeklyGrid>
                {weeklyGoals.map((week) => (
                  <WeekCard key={week.week}>
                    <WeekNumber>Week {week.week}</WeekNumber>
                    <WeekTitle>{week.title}</WeekTitle>
                    <WeekFocus>{week.focus}</WeekFocus>
                    
                    <SectionTitle style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                      🛠️ Deliverables
                    </SectionTitle>
                    <WeekList>
                      {week.deliverables.map((deliverable, index) => (
                        <WeekListItem key={index}>{deliverable}</WeekListItem>
                      ))}
                    </WeekList>
                    
                    <SectionTitle style={{ fontSize: '1.2rem', marginBottom: '1rem', marginTop: '1.5rem' }}>
                      📊 Success Metrics
                    </SectionTitle>
                    <WeekList>
                      {week.metrics.map((metric, index) => (
                        <WeekListItem key={index}>{metric}</WeekListItem>
                      ))}
                    </WeekList>
                  </WeekCard>
                ))}
              </WeeklyGrid>
            </WeeklyBreakdown>
          )}

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
