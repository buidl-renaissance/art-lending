import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

const PageWrapper = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.darkBg} 0%, ${({ theme }) => theme.charcoal} 100%);
  color: ${({ theme }) => theme.white};
  min-height: 100vh;
  padding: 0;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="nodes" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(212,175,55,0.1)"/><path d="M10,10 L15,5 M10,10 L5,15" stroke="rgba(64,224,208,0.05)" stroke-width="0.5"/></path></pattern></defs><rect width="100" height="100" fill="url(%23nodes)"/></svg>');
    z-index: -1;
    pointer-events: none;
  }
`;

const HeroSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: 70vh;
  }
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', 'Cormorant', serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
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
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-bottom: 3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArtworkFrame = styled.div`
  width: 300px;
  height: 400px;
  background: linear-gradient(145deg, ${({ theme }) => theme.gold}, ${({ theme }) => theme.mutedGold});
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  transform: rotate(-2deg);

  &::before {
    content: "";
    position: absolute;
    inset: 15px;
    background: ${({ theme }) => theme.white};
    border-radius: 4px;
  }

  &::after {
    content: "Sample Artwork";
    position: absolute;
    inset: 15px;
    background: linear-gradient(45deg, ${({ theme }) => theme.teal}, ${({ theme }) => theme.purple});
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.white};
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 320px;
  }
`;

const FlowDiagram = styled.div`
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 968px) {
    position: static;
    transform: none;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
  }

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

const FlowStep = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${({ theme }) => theme.gold};
  border-radius: 12px;
  padding: 1rem;
  width: 150px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: translateX(5px);
  }

  @media (max-width: 568px) {
    width: 120px;
    padding: 0.8rem;
  }
`;

const FlowIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FlowText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 568px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? props.theme.gold : 'transparent'};
  color: ${props => props.variant === 'primary' ? props.theme.darkBg : props.theme.gold};
  border: 2px solid ${({ theme }) => theme.gold};
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 180px;

  &:hover {
    background: ${props => props.variant === 'primary' ? props.theme.mutedGold : props.theme.gold};
    color: ${({ theme }) => theme.darkBg};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }

  @media (max-width: 568px) {
    min-width: 100%;
  }
`;

// Main content sections
const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Section = styled.section`
  padding: 5rem 0;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.gold}40, transparent);
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: ${({ theme }) => theme.gold};
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
  line-height: 1.2;
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

// How It Works Section
const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 3px solid transparent;
  border-image: linear-gradient(145deg, ${({ theme }) => theme.gold}, ${({ theme }) => theme.teal}) 1;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, ${({ theme }) => theme.gold}10, ${({ theme }) => theme.teal}05);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(145deg, ${({ theme }) => theme.gold}, ${({ theme }) => theme.mutedGold});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
`;

const StepTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const StepDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
`;

// Why Join Section
const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  margin: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BenefitCategory = styled.div`
  text-align: center;
`;

const CategoryTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.gold};
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.teal}, ${({ theme }) => theme.purple});
    border-radius: 2px;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.teal};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(5px);
  }
`;

const BenefitIcon = styled.span`
  font-size: 1.8rem;
  margin-right: 1.2rem;
  flex-shrink: 0;
`;

const BenefitText = styled.div`
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.white};
  line-height: 1.6;
`;

// Interactive Calculator Section
const CalculatorSection = styled.div`
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(64, 224, 208, 0.05));
  border: 2px solid ${({ theme }) => theme.gold}40;
  border-radius: 20px;
  padding: 3rem;
  margin: 4rem 0;
  text-align: center;
`;

const CalculatorTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.gold};
  margin-bottom: 2rem;
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const CalculatorCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.gold}30;
`;

const CalculatorLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gold};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CalculatorValue = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.white};
  font-weight: 700;
`;

const SliderContainer = styled.div`
  margin: 3rem 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const SliderLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gold};
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gold};
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
  }
`;

// Marketplace Preview Section
const MarketplaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const ArtworkCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.gold};
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ArtworkImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, ${({ theme }) => theme.teal}, ${({ theme }) => theme.purple});
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ArtworkTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.gold}, ${({ theme }) => theme.teal});
  transition: width 0.3s ease;
`;

const ArtworkStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ClaimButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.gold};
  color: ${({ theme }) => theme.darkBg};
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ theme }) => theme.mutedGold};
    transform: translateY(-2px);
  }
`;

// Membership Section
const MembershipSection = styled.div`
  background: linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(64, 224, 208, 0.1));
  border: 2px solid ${({ theme }) => theme.purple}40;
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
  margin: 5rem 0;
`;

const MembershipTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: ${({ theme }) => theme.purple};
  margin-bottom: 2rem;
`;

const MembershipPrice = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: ${({ theme }) => theme.gold};
  font-weight: 700;
  margin-bottom: 1rem;

  .currency {
    font-size: 2rem;
    vertical-align: top;
  }

  .period {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const MembershipBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 3rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MembershipBenefit = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.purple};

  &::before {
    content: "✓";
    color: ${({ theme }) => theme.gold};
    font-weight: bold;
    margin-right: 1rem;
  }
`;

// Community Trust Section
const TrustSection = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  align-items: center;
`;

const PartnerLogo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.gold};
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    transform: translateY(-2px);
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border-left: 4px solid ${({ theme }) => theme.teal};
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: ${({ theme }) => theme.gold};
    font-family: 'Playfair Display', serif;
  }
`;

const TestimonialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.white};
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.gold};
  font-weight: 600;
`;

// Final CTA Section
const FinalCTASection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.gold}, ${({ theme }) => theme.mutedGold});
  color: ${({ theme }) => theme.darkBg};
  padding: 5rem 2rem;
  text-align: center;
  margin: 5rem 0 0 0;
  border-radius: 20px 20px 0 0;
`;

const FinalCTATitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 4vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
`;

const FinalCTASubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const FinalCTAButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;

  @media (max-width: 568px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const FinalCTAButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? props.theme.darkBg : 'transparent'};
  color: ${props => props.variant === 'primary' ? props.theme.gold : props.theme.darkBg};
  border: 3px solid ${({ theme }) => theme.darkBg};
  border-radius: 12px;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 220px;

  &:hover {
    background: ${props => props.variant === 'primary' ? 'rgba(26, 26, 46, 0.9)' : props.theme.darkBg};
    color: ${({ theme }) => theme.gold};
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 568px) {
    min-width: 280px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.darkBg};
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;

  &:hover {
    background: rgba(26, 26, 46, 0.1);
    transform: translateY(-2px);
  }
`;

export default function ArtLending() {
  const [investmentAmount, setInvestmentAmount] = useState(50);
  const expectedReturn = investmentAmount * 2;

  return (
    <>
      <Head>
        <title>Art Lending Platform | Liquidity for Artists, Returns for Communities</title>
        <meta
          name="description"
          content="Back artists with small loans secured by their artwork and share in the rewards when they sell. Join the Artist Bank."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        
        {/* Hero Section */}
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <HeroTitle>
                <span className="accent">Liquidity</span> for Artists.<br/>
                <span className="accent">Returns</span> for Communities.
              </HeroTitle>
              <HeroSubtitle>
                Back artists with small loans secured by their artwork — and share in the rewards when they sell.
              </HeroSubtitle>
              <CTAButtons>
                <CTAButton variant="primary">Start as an Artist</CTAButton>
                <CTAButton variant="secondary">Start as a Backer</CTAButton>
              </CTAButtons>
              <CTAButtons style={{ marginTop: '1rem', justifyContent: 'center' }}>
                <CTAButton 
                  as="a" 
                  href="/roadmap" 
                  variant="secondary" 
                  style={{ minWidth: '200px', textAlign: 'center' }}
                >
                  📍 View Our Roadmap
                </CTAButton>
              </CTAButtons>
            </HeroContent>
            
            <HeroVisual>
              <ArtworkFrame />
              <FlowDiagram>
                <FlowStep>
                  <FlowIcon>💰</FlowIcon>
                  <FlowText>Loan</FlowText>
                </FlowStep>
                <FlowStep>
                  <FlowIcon>🪙</FlowIcon>
                  <FlowText>Tokens</FlowText>
                </FlowStep>
                <FlowStep>
                  <FlowIcon>📈</FlowIcon>
                  <FlowText>Returns</FlowText>
                </FlowStep>
              </FlowDiagram>
            </HeroVisual>
          </HeroContainer>
        </HeroSection>

        <Main>
          {/* How It Works */}
          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <StepsContainer>
              <StepCard>
                <StepIcon>🎨</StepIcon>
                <StepTitle>Artists List & Request</StepTitle>
                <StepDescription>
                  Artists upload their work and request a loan amount based on estimated value. 
                  Our community evaluates and funds promising pieces.
                </StepDescription>
              </StepCard>
              
              <StepCard>
                <StepIcon>👥</StepIcon>
                <StepTitle>Lenders Fund (Fractionalized)</StepTitle>
                <StepDescription>
                  Community members back artists with micro-loans starting at $10. 
                  Each loan is split into tradeable tokens for maximum accessibility.
                </StepDescription>
              </StepCard>
              
              <StepCard>
                <StepIcon>⚡</StepIcon>
                <StepTitle>Automatic Distribution</StepTitle>
                <StepDescription>
                  When artwork sells, smart contracts automatically distribute returns 
                  to all token holders while artists keep the majority of proceeds.
                </StepDescription>
              </StepCard>
            </StepsContainer>
          </Section>

          {/* Why Join */}
          <Section>
            <SectionTitle>Why Join</SectionTitle>
            <BenefitsGrid>
              <BenefitCategory>
                <CategoryTitle>For Artists</CategoryTitle>
                <BenefitsList>
                  <BenefitItem>
                    <BenefitIcon>💵</BenefitIcon>
                    <BenefitText>Upfront liquidity without traditional debt</BenefitText>
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon>🚫</BenefitIcon>
                    <BenefitText>No debt collectors — just sale-based repayment</BenefitText>
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon>👁️</BenefitIcon>
                    <BenefitText>Exposure to new collectors and art enthusiasts</BenefitText>
                  </BenefitItem>
                </BenefitsList>
              </BenefitCategory>
              
              <BenefitCategory>
                <CategoryTitle>For Backers</CategoryTitle>
                <BenefitsList>
                  <BenefitItem>
                    <BenefitIcon>💎</BenefitIcon>
                    <BenefitText>Micro-loans starting at just $10</BenefitText>
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon>📊</BenefitIcon>
                    <BenefitText>Shared upside when artwork sells successfully</BenefitText>
                  </BenefitItem>
                  <BenefitItem>
                    <BenefitIcon>🤝</BenefitIcon>
                    <BenefitText>Be part of an artist&apos;s success story</BenefitText>
                  </BenefitItem>
                </BenefitsList>
              </BenefitCategory>
            </BenefitsGrid>
          </Section>

          {/* Interactive Calculator */}
          <Section>
            <CalculatorSection>
              <CalculatorTitle>Danny&apos;s Painting Example</CalculatorTitle>
              <CalculatorGrid>
                <CalculatorCard>
                  <CalculatorLabel>Artwork Value</CalculatorLabel>
                  <CalculatorValue>$1,000</CalculatorValue>
                </CalculatorCard>
                <CalculatorCard>
                  <CalculatorLabel>Total Loan</CalculatorLabel>
                  <CalculatorValue>$100</CalculatorValue>
                </CalculatorCard>
                <CalculatorCard>
                  <CalculatorLabel>Artist Keeps</CalculatorLabel>
                  <CalculatorValue>$900</CalculatorValue>
                </CalculatorCard>
                <CalculatorCard>
                  <CalculatorLabel>Lender Return</CalculatorLabel>
                  <CalculatorValue>$200</CalculatorValue>
                </CalculatorCard>
              </CalculatorGrid>
              
              <SliderContainer>
                <SliderLabel>
                  If you back with ${investmentAmount}, your return could be ${expectedReturn}
                </SliderLabel>
                <Slider
                  type="range"
                  min="10"
                  max="100"
                  value={investmentAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInvestmentAmount(parseInt(e.target.value))}
                />
              </SliderContainer>
            </CalculatorSection>
          </Section>

          {/* Marketplace Preview */}
          <Section>
            <SectionTitle>Current Opportunities</SectionTitle>
            <SectionSubtitle>
              Browse live artworks seeking backing from our community
            </SectionSubtitle>
            <MarketplaceGrid>
              {[
                { title: "Urban Dreams #3", funded: 75, expected: "$40" },
                { title: "Digital Sunset", funded: 45, expected: "$25" },
                { title: "Abstract Emotions", funded: 90, expected: "$60" },
                { title: "City Lights", funded: 30, expected: "$20" }
              ].map((artwork, index) => (
                <ArtworkCard key={index}>
                  <ArtworkImage>{artwork.title}</ArtworkImage>
                  <ArtworkTitle>{artwork.title}</ArtworkTitle>
                  <ProgressBar>
                    <ProgressFill percentage={artwork.funded} />
                  </ProgressBar>
                  <ArtworkStats>
                    <span>{artwork.funded}% Funded</span>
                    <span>Expected: {artwork.expected}</span>
                  </ArtworkStats>
                  <ClaimButton>Claim Slice</ClaimButton>
                </ArtworkCard>
              ))}
            </MarketplaceGrid>
          </Section>

          {/* Membership Section */}
          <Section>
            <MembershipSection>
              <MembershipTitle>Join the Artist Bank</MembershipTitle>
              <MembershipPrice>
                <span className="currency">$</span>10<span className="period">/month</span>
              </MembershipPrice>
              <MembershipBenefits>
                <MembershipBenefit>Access to exclusive loan opportunities</MembershipBenefit>
                <MembershipBenefit>Priority artwork listings and early access</MembershipBenefit>
                <MembershipBenefit>Free canvas frames & art materials (monthly)</MembershipBenefit>
                <MembershipBenefit>Community Discord with artists and collectors</MembershipBenefit>
                <MembershipBenefit>Monthly art market insights and reports</MembershipBenefit>
              </MembershipBenefits>
              <CTAButton variant="primary">Become a Member</CTAButton>
            </MembershipSection>
          </Section>

          {/* Community & Trust */}
          <Section>
            <TrustSection>
              <SectionTitle>Trusted by the Community</SectionTitle>
              <PartnersGrid>
                <PartnerLogo>Detroit Studios</PartnerLogo>
                <PartnerLogo>Gallery Collective</PartnerLogo>
                <PartnerLogo>Art District</PartnerLogo>
                <PartnerLogo>Creative Commons</PartnerLogo>
              </PartnersGrid>
              
              <TestimonialGrid>
                <TestimonialCard>
                  <TestimonialText>
                    This platform gave me the liquidity I needed to focus on creating instead of worrying about rent. 
                    When my piece sold, everyone won.
                  </TestimonialText>
                  <TestimonialAuthor>— Maya Chen, Digital Artist</TestimonialAuthor>
                </TestimonialCard>
                
                <TestimonialCard>
                  <TestimonialText>
                    I started with $20 backing local artists. Now I&apos;m part of a community that&apos;s genuinely 
                    supporting Detroit&apos;s creative scene.
                  </TestimonialText>
                  <TestimonialAuthor>— Marcus Johnson, Community Backer</TestimonialAuthor>
                </TestimonialCard>
              </TestimonialGrid>
            </TrustSection>
          </Section>
        </Main>

        {/* Final CTA */}
        <FinalCTASection>
          <FinalCTATitle>Invest in Culture. Empower Creators. Share the Rewards.</FinalCTATitle>
          <FinalCTASubtitle>
            Join a community where art meets opportunity, and every investment supports creative dreams.
          </FinalCTASubtitle>
          <FinalCTAButtons>
            <FinalCTAButton variant="primary">Start Lending</FinalCTAButton>
            <FinalCTAButton variant="secondary">List Your Artwork</FinalCTAButton>
          </FinalCTAButtons>
          <SocialLinks>
            <SocialLink href="/roadmap">View Roadmap</SocialLink>
            <SocialLink href="#">Join Discord</SocialLink>
            <SocialLink href="#">Follow Updates</SocialLink>
            <SocialLink href="#">Newsletter</SocialLink>
          </SocialLinks>
        </FinalCTASection>

      </PageWrapper>
    </>
  );
}