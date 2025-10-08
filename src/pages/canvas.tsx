import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

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

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const InfoSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  border: 2px solid ${({ theme }) => theme.teal}40;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.teal};
  margin-bottom: 2rem;
`;

const ProcessList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

const ProcessStep = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.gold};
  position: relative;

  &::before {
    content: counter(step-counter);
    position: absolute;
    left: -15px;
    top: 15px;
    background: ${({ theme }) => theme.gold};
    color: ${({ theme }) => theme.darkBg};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

const StepContent = styled.div`
  margin-left: 1rem;
`;

const StepTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
`;

const ApplicationForm = styled.form`
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(64, 224, 208, 0.05));
  border: 2px solid ${({ theme }) => theme.gold}40;
  border-radius: 20px;
  padding: 3rem;
  margin-top: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const FormTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.gold};
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.white};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.gold};
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;


const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gold};
  color: ${({ theme }) => theme.darkBg};
  border: none;
  border-radius: 12px;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.mutedGold};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;


const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  color: ${({ theme }) => theme.white};

  &::before {
    content: "";
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const ContractPreview = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.teal}30;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const ContractTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  color: ${({ theme }) => theme.teal};
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

interface FormData {
  invitationCode: string;
  artistName: string;
  email: string;
  phone: string;
}

export default function CanvasLoansPage() {
  const [formData, setFormData] = useState<FormData>({
    invitationCode: '',
    artistName: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Welcome to the collective! Your invitation has been redeemed. We\'ll contact you within 24 hours to begin your onboarding and arrange your canvas gift.');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      invitationCode: '',
      artistName: '',
      email: '',
      phone: ''
    });
  };

  return (
    <>
      <Head>
        <title>Canvas Invitation Program | Open Artist Bank - By Invitation Only</title>
        <meta
          name="description"
          content="Enter our creative ecosystem by invitation. Receive a gifted canvas and join a supportive network of creators, mentors, and collaborators."
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
            The <span className="accent">Canvas Invitation</span><br/>
            <span className="accent">Program</span> 💌
          </HeroTitle>
          <HeroSubtitle>
            A regenerative entry into the creative ecosystem — by invitation only. Enter a supportive, intentional network where creativity, respect, and community trust come first.
          </HeroSubtitle>
        </HeroSection>

        <Main>
          <ContentContainer>
            <InfoSection>
              <SectionTitle>🌿 Purpose</SectionTitle>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '2.5rem',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Not everyone can simply join the collective — they must be welcomed in. 
                The Canvas Invitation Program ensures that each artist who receives a gifted canvas 
                is entering a supportive, intentional network where creativity, respect, and community trust come first.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '3rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic'
              }}>
                An invitation isn&apos;t just access to a resource — it&apos;s entry into a living ecosystem of creators, mentors, and collaborators.
              </p>

              <SectionTitle>💌 How It Works</SectionTitle>
              <ProcessList>
                <ProcessStep>
                  <StepContent>
                    <StepTitle>Receive an Invitation</StepTitle>
                    <StepDescription>
                      Members of the collective nominate new artists they believe in. Each invitation carries a unique referral code, symbolizing trust and sponsorship.
                    </StepDescription>
                  </StepContent>
                </ProcessStep>
                
                <ProcessStep>
                  <StepContent>
                    <StepTitle>Onboarding & Connection</StepTitle>
                    <StepDescription>
                      Create your artist profile, choose your practice area, and meet your referrer plus a community mentor. Relationships come before creation.
                    </StepDescription>
                  </StepContent>
                </ProcessStep>
                
                <ProcessStep>
                  <StepContent>
                    <StepTitle>Gift & Creation</StepTitle>
                    <StepDescription>
                      Receive your gifted canvas and optional starter materials. Create freely, reflecting on themes of community, regeneration, or self-expression.
                    </StepDescription>
                  </StepContent>
                </ProcessStep>
                
                <ProcessStep>
                  <StepContent>
                    <StepTitle>Return & Registration</StepTitle>
                    <StepDescription>
                      Bring your completed piece back for professional photography and cataloging. Your work links you, your referrer, and the collective in a transparent creative lineage.
                    </StepDescription>
                  </StepContent>
                </ProcessStep>
                
                <ProcessStep>
                  <StepContent>
                    <StepTitle>Regeneration</StepTitle>
                    <StepDescription>
                      Sales replenish the materials fund. You and your referrer receive recognition and royalties. Every successful cycle unlocks new invitations for organic growth.
                    </StepDescription>
                  </StepContent>
                </ProcessStep>
              </ProcessList>

              <BenefitsList>
                <BenefitItem>💌 Invitation-only access to intentional creative community</BenefitItem>
                <BenefitItem>🤝 Personal mentorship and referrer relationships</BenefitItem>
                <BenefitItem>🎨 Creative lineage linking you to the collective&apos;s story</BenefitItem>
                <BenefitItem>💰 Royalties for both artist and referrer on sales</BenefitItem>
                <BenefitItem>🌱 Organic growth through successful creative cycles</BenefitItem>
              </BenefitsList>
            </InfoSection>

            <ApplicationForm onSubmit={handleSubmit}>
              <FormTitle>Redeem Your Invitation</FormTitle>
              <p style={{ 
                textAlign: 'center', 
                marginBottom: '2rem', 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6'
              }}>
                Have an invitation code? Enter your details below to claim your canvas gift and begin your onboarding into the collective.
              </p>
              
              <FormGrid>
                <FormField>
                  <Label htmlFor="invitationCode">Invitation Code *</Label>
                  <Input
                    type="text"
                    id="invitationCode"
                    name="invitationCode"
                    value={formData.invitationCode}
                    onChange={handleInputChange}
                    placeholder="Enter your unique invitation code"
                    required
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="artistName">Artist Name *</Label>
                  <Input
                    type="text"
                    id="artistName"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </FormField>

              </FormGrid>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Redeeming Invitation...' : 'Redeem Invitation 💌'}
              </SubmitButton>
            </ApplicationForm>
          </ContentContainer>

          <ContractPreview>
            <ContractTitle>💞 Canvas Invitation Agreement</ContractTitle>
            <p><strong>Invited Artist:</strong> [Your Name]</p>
            <p><strong>Referrer:</strong> [Inviting Member]</p>
            <p><strong>Invitation Code:</strong> [Your Code]</p>
            <p><strong>Canvas ID:</strong> [Generated upon acceptance]</p>
            <p><strong>Invitation Principles:</strong></p>
            <ul>
              <li>💌 You enter through the trust and belief of an existing member</li>
              <li>🤝 Your referrer and a community mentor will guide your onboarding</li>
              <li>🎨 Your work connects to the collective&apos;s growing story of collaboration</li>
              <li>💰 Both you and your referrer benefit from your artistic contributions</li>
              <li>🌱 Successful cycles unlock new invitations, expanding the community thoughtfully</li>
              <li>📸 Professional documentation creates transparent creative lineage</li>
            </ul>
            <p><strong>Community Agreement:</strong> By redeeming this invitation, you commit to creating with intention and contributing to our regenerative creative ecosystem built on trust and collaboration.</p>
          </ContractPreview>
        </Main>
      </PageWrapper>
    </>
  );
}
