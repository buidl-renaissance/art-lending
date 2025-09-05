# 🤝 Contributing to Open Artist Bank

> **Welcome! We're excited to have you contribute to building the future of artist financing.**

This guide will help you get started contributing to the Open Artist Bank platform, whether you're a developer, artist, designer, or community member.

## 🌟 Ways to Contribute

### 🔧 For Developers
- **Frontend Development**: React/Next.js components and features
- **Smart Contracts**: Solidity development and testing
- **Backend APIs**: Node.js API development
- **DevOps**: Infrastructure, deployment, and monitoring
- **Testing**: Unit tests, integration tests, and QA

### 🎨 For Artists
- **Beta Testing**: Try the platform and provide feedback
- **Content Creation**: Help create educational content
- **Community Building**: Share your experience and attract other artists
- **Feature Requests**: Suggest improvements based on real needs

### 🎯 For Designers
- **UI/UX Design**: Improve user experience and interfaces
- **Branding**: Help refine visual identity and marketing materials
- **Accessibility**: Ensure the platform is accessible to all users

### 📝 For Writers
- **Documentation**: Improve guides, tutorials, and technical docs
- **Content Marketing**: Blog posts, case studies, success stories
- **Community Management**: Help with Discord, social media, and support

## 🚀 Getting Started

### 1. Set Up Your Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/art-lending.git
cd art-lending

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### 2. Understand the Codebase

- **`/src/pages/`** - Next.js pages and API routes
- **`/src/components/`** - Reusable React components
- **`/src/styles/`** - Theme and styling configuration
- **`/contracts/`** - Smart contract source code
- **`/docs/`** - Additional documentation

### 3. Choose an Issue

- Check out our [Issues](https://github.com/yourusername/art-lending/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Comment on an issue to let others know you're working on it

## 📋 Development Guidelines

### Code Style

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive variable and function names

```typescript
// Good
const calculateLoanReturn = (principal: number, multiplier: number): number => {
  return principal * multiplier;
};

// Avoid
const calc = (p, m) => p * m;
```

#### React Components
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Use styled-components for styling
- Keep components focused and reusable

```typescript
interface ArtworkCardProps {
  artwork: Artwork;
  onInvest: (artworkId: string, amount: number) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onInvest }) => {
  // Component implementation
};
```

#### Smart Contracts
- Follow Solidity best practices
- Include comprehensive NatSpec documentation
- Write thorough tests for all functions
- Use OpenZeppelin contracts where appropriate

```solidity
/**
 * @title LoanContract
 * @dev Manages individual artwork loans
 * @author Open Artist Bank Team
 */
contract LoanContract {
    /**
     * @notice Creates a new loan for an artwork
     * @param _artworkHash IPFS hash of the artwork
     * @param _amount Loan amount in wei
     * @param _estimatedValue Estimated artwork value in wei
     * @return loanId The ID of the created loan
     */
    function createLoan(
        string memory _artworkHash,
        uint256 _amount,
        uint256 _estimatedValue
    ) external returns (uint256 loanId) {
        // Implementation
    }
}
```

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following the style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add loan creation functionality"
   ```

   Use conventional commit messages:
   - `feat:` new features
   - `fix:` bug fixes
   - `docs:` documentation changes
   - `style:` formatting, missing semicolons, etc.
   - `refactor:` code changes that neither fix bugs nor add features
   - `test:` adding or updating tests

4. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Testing Requirements

#### Frontend Testing
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

#### Smart Contract Testing
```bash
# Compile contracts
npm run contracts:compile

# Run contract tests
npm run contracts:test

# Run coverage
npm run contracts:coverage
```

### Pull Request Guidelines

#### Before Submitting
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] No console.logs or debugging code
- [ ] Commit messages follow conventions

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🎯 Priority Areas

### Phase 1 Priorities (Current)
1. **Artist Dashboard** - Loan creation and management interface
2. **Backer Dashboard** - Investment tracking and portfolio
3. **Smart Contracts** - Core loan and repayment logic
4. **Authentication** - Web3 wallet integration
5. **Database Schema** - Data models and relationships

### Community Needs
- **Mobile Responsiveness** - Ensure great mobile experience
- **Accessibility** - WCAG compliance and screen reader support
- **Performance** - Optimize loading times and interactions
- **Security** - Audit and improve security measures

## 🏆 Recognition

### Contributor Levels

#### 🌱 Newcomer
- First contribution merged
- Welcome package and Discord role
- Listed in contributors

#### 🌿 Regular Contributor
- 5+ contributions merged
- Early access to new features
- Special Discord role and privileges

#### 🌳 Core Contributor
- 20+ contributions or major feature
- Governance token allocation
- Input on roadmap decisions

#### 🏛️ Maintainer
- Consistent high-quality contributions
- Commit access and review privileges
- Platform revenue sharing (future)

### Monthly Recognition
- **Contributor of the Month** - Featured in newsletter and social media
- **Innovation Award** - For creative solutions and improvements
- **Community Champion** - For outstanding community support

## 🎉 Community Events

### Developer Meetups
- Monthly virtual dev calls
- Quarterly in-person meetups (Detroit area)
- Annual contributor conference

### Hackathons
- Quarterly themed hackathons
- Prizes and recognition for winners
- Integration with major crypto hackathons

### Artist Showcases
- Monthly featured artist presentations
- Live loan creation demos
- Success story celebrations

## 📞 Getting Help

### Discord Channels
- **#dev-general** - General development discussion
- **#smart-contracts** - Blockchain and contract development
- **#frontend** - React/Next.js development
- **#design** - UI/UX and design feedback
- **#newcomers** - Help for first-time contributors

### Office Hours
- **Tuesdays 2-4 PM EST** - Frontend development
- **Thursdays 6-8 PM EST** - Smart contract development
- **Saturdays 10 AM-12 PM EST** - General Q&A

### Contact
- **Email**: dev@openartistbank.com
- **Discord**: [Join our server](https://discord.gg/openartistbank)
- **GitHub**: [Create an issue](https://github.com/yourusername/art-lending/issues)

## 📜 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

### Our Pledge
- **Be respectful** - Treat all community members with respect
- **Be inclusive** - Welcome people of all backgrounds and experience levels
- **Be collaborative** - Work together towards common goals
- **Be constructive** - Provide helpful feedback and suggestions

### Unacceptable Behavior
- Harassment, discrimination, or hate speech
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Any conduct that could be considered inappropriate in a professional setting

---

**Thank you for contributing to Open Artist Bank! Together, we're building the future of artist financing and cultural investment. 🎨✨**

*Questions? Reach out on Discord or create an issue. We're here to help!*
