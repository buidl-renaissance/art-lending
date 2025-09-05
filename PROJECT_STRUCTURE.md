# 📁 Project Structure

> **Open Artist Bank - Codebase Organization and File Structure**

This document provides an overview of the project structure, explaining the purpose and organization of each directory and key file.

## 🏗️ Root Directory

```
art-lending/
├── 📄 README.md                    # Main project documentation
├── 📄 ROADMAP.md                   # Development roadmap and phases
├── 📄 TECHNICAL_SPECS.md           # Technical architecture details
├── 📄 CONTRIBUTING.md              # Contribution guidelines
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 SETUP_INSTRUCTIONS.md        # Quick setup guide
├── 📄 THEME_SETUP.md              # Theme and styling documentation
├── 📄 package.json                # Dependencies and scripts
├── 📄 next.config.ts              # Next.js configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 eslint.config.mjs           # ESLint configuration
├── 📄 env.example                 # Environment variables template
├── 📄 .gitignore                  # Git ignore rules
├── 📂 public/                     # Static assets
├── 📂 src/                        # Source code
├── 📂 contracts/                  # Smart contracts (future)
├── 📂 docs/                       # Additional documentation
└── 📂 scripts/                    # Build and deployment scripts
```

## 📂 Source Code (`/src/`)

### Pages Directory (`/src/pages/`)
Next.js pages and API routes following the Pages Router pattern.

```
src/pages/
├── 📄 _app.tsx                    # App wrapper with providers
├── 📄 _document.tsx               # HTML document structure
├── 📄 index.tsx                   # Landing page (main page)
├── 📂 api/                        # API routes
│   ├── 📄 hello.ts                # Example API route
│   ├── 📂 auth/                   # Authentication endpoints
│   ├── 📂 artists/                # Artist-related endpoints
│   ├── 📂 loans/                  # Loan management endpoints
│   ├── 📂 investments/            # Investment tracking endpoints
│   └── 📂 marketplace/            # Marketplace endpoints
├── 📂 artist/                     # Artist dashboard pages
│   ├── 📄 dashboard.tsx           # Artist main dashboard
│   ├── 📄 create-loan.tsx         # Loan creation page
│   ├── 📄 portfolio.tsx           # Artist portfolio
│   └── 📄 settings.tsx            # Artist settings
├── 📂 backer/                     # Backer dashboard pages
│   ├── 📄 dashboard.tsx           # Backer main dashboard
│   ├── 📄 portfolio.tsx           # Investment portfolio
│   ├── 📄 discover.tsx            # Discover new loans
│   └── 📄 settings.tsx            # Backer settings
├── 📂 marketplace/                # Marketplace pages
│   ├── 📄 index.tsx               # Marketplace home
│   ├── 📄 [loanId].tsx           # Individual loan page
│   └── 📄 trade.tsx               # Fraction trading
├── 📂 auth/                       # Authentication pages
│   ├── 📄 signin.tsx              # Sign in page
│   ├── 📄 signup.tsx              # Sign up page
│   └── 📄 verify.tsx              # Wallet verification
└── 📂 legal/                      # Legal pages
    ├── 📄 terms.tsx               # Terms of service
    ├── 📄 privacy.tsx             # Privacy policy
    └── 📄 risks.tsx               # Risk disclosure
```

### Components Directory (`/src/components/`)
Reusable React components organized by feature and type.

```
src/components/
├── 📂 common/                     # Common UI components
│   ├── 📄 Button.tsx              # Styled button component
│   ├── 📄 Input.tsx               # Form input component
│   ├── 📄 Modal.tsx               # Modal dialog component
│   ├── 📄 Loading.tsx             # Loading spinner component
│   ├── 📄 ErrorBoundary.tsx       # Error boundary wrapper
│   └── 📄 Layout.tsx              # Page layout wrapper
├── 📂 navigation/                 # Navigation components
│   ├── 📄 Header.tsx              # Site header with navigation
│   ├── 📄 Footer.tsx              # Site footer
│   ├── 📄 Sidebar.tsx             # Dashboard sidebar
│   └── 📄 Breadcrumbs.tsx         # Breadcrumb navigation
├── 📂 artist/                     # Artist-specific components
│   ├── 📄 ArtistCard.tsx          # Artist profile card
│   ├── 📄 ArtworkUpload.tsx       # Artwork upload component
│   ├── 📄 LoanForm.tsx            # Loan creation form
│   ├── 📄 ArtistStats.tsx         # Artist statistics display
│   └── 📄 ReputationBadge.tsx     # Artist reputation indicator
├── 📂 loan/                       # Loan-related components
│   ├── 📄 LoanCard.tsx            # Loan opportunity card
│   ├── 📄 LoanDetails.tsx         # Detailed loan view
│   ├── 📄 FundingProgress.tsx     # Funding progress bar
│   ├── 📄 InvestmentForm.tsx      # Investment form
│   └── 📄 RepaymentTracker.tsx    # Repayment status
├── 📂 marketplace/                # Marketplace components
│   ├── 📄 MarketplaceGrid.tsx     # Grid of loan opportunities
│   ├── 📄 FilterBar.tsx           # Filtering and search
│   ├── 📄 SortOptions.tsx         # Sorting controls
│   └── 📄 FractionTrading.tsx     # Fraction trading interface
├── 📂 portfolio/                  # Portfolio components
│   ├── 📄 PortfolioOverview.tsx   # Portfolio summary
│   ├── 📄 InvestmentList.tsx      # List of investments
│   ├── 📄 PerformanceChart.tsx    # Performance visualization
│   └── 📄 ReturnsSummary.tsx      # Returns summary
├── 📂 forms/                      # Form components
│   ├── 📄 FormField.tsx           # Generic form field
│   ├── 📄 FileUpload.tsx          # File upload component
│   ├── 📄 ImageCropper.tsx        # Image cropping tool
│   └── 📄 FormValidation.tsx      # Form validation helpers
└── 📂 web3/                       # Web3-specific components
    ├── 📄 WalletConnect.tsx       # Wallet connection
    ├── 📄 TransactionStatus.tsx   # Transaction status display
    ├── 📄 NetworkSwitch.tsx       # Network switching
    └── 📄 ContractInteraction.tsx # Smart contract interactions
```

### Styles Directory (`/src/styles/`)
Styling configuration and theme management.

```
src/styles/
├── 📄 globals.css                 # Global CSS styles
├── 📄 theme.ts                    # Theme configuration
├── 📄 styled.d.ts                 # Styled-components TypeScript declarations
└── 📂 components/                 # Component-specific styles (if needed)
```

### Utils Directory (`/src/utils/`)
Helper functions and utilities.

```
src/utils/
├── 📄 constants.ts                # App constants and configuration
├── 📄 formatting.ts               # Number and date formatting
├── 📄 validation.ts               # Input validation helpers
├── 📄 api.ts                      # API client and helpers
├── 📄 storage.ts                  # Local storage utilities
├── 📄 crypto.ts                   # Cryptographic utilities
├── 📂 web3/                       # Web3 utilities
│   ├── 📄 contracts.ts            # Contract interaction helpers
│   ├── 📄 wallet.ts               # Wallet connection utilities
│   └── 📄 transactions.ts         # Transaction handling
└── 📂 helpers/                    # General helper functions
    ├── 📄 math.ts                 # Mathematical calculations
    ├── 📄 dates.ts                # Date manipulation
    └── 📄 strings.ts              # String manipulation
```

### Types Directory (`/src/types/`)
TypeScript type definitions.

```
src/types/
├── 📄 index.ts                    # Main type exports
├── 📄 api.ts                      # API request/response types
├── 📄 user.ts                     # User and authentication types
├── 📄 artist.ts                   # Artist-specific types
├── 📄 loan.ts                     # Loan and investment types
├── 📄 marketplace.ts              # Marketplace-specific types
├── 📄 blockchain.ts               # Blockchain and Web3 types
└── 📄 common.ts                   # Common utility types
```

### Hooks Directory (`/src/hooks/`)
Custom React hooks for shared logic.

```
src/hooks/
├── 📄 useAuth.ts                  # Authentication hook
├── 📄 useWallet.ts                # Wallet connection hook
├── 📄 useContract.ts              # Smart contract interaction hook
├── 📄 useApi.ts                   # API request hook
├── 📄 useLocalStorage.ts          # Local storage hook
├── 📄 useDebounce.ts              # Debouncing hook
└── 📄 useInfiniteScroll.ts        # Infinite scrolling hook
```

### Contexts Directory (`/src/contexts/`)
React contexts for global state management.

```
src/contexts/
├── 📄 AuthContext.tsx             # User authentication context
├── 📄 WalletContext.tsx           # Wallet connection context
├── 📄 ThemeContext.tsx            # Theme and styling context
└── 📄 NotificationContext.tsx     # Notifications context
```

## 📂 Smart Contracts (`/contracts/`)
Solidity smart contracts and related files (to be created).

```
contracts/
├── 📄 ArtistBank.sol              # Main contract
├── 📄 LoanFactory.sol             # Loan creation factory
├── 📄 FractionalLoan.sol          # ERC-1155 fractional tokens
├── 📄 Marketplace.sol             # P2P trading marketplace
├── 📄 ArtistRegistry.sol          # Artist verification registry
├── 📄 ValuationOracle.sol         # Price oracle contract
├── 📂 interfaces/                 # Contract interfaces
├── 📂 libraries/                  # Shared contract libraries
├── 📂 mocks/                      # Mock contracts for testing
└── 📂 test/                       # Contract test files
```

## 📂 Public Directory (`/public/`)
Static assets served directly by Next.js.

```
public/
├── 📄 favicon.ico                 # Site favicon
├── 📄 manifest.json               # PWA manifest
├── 📄 robots.txt                  # SEO robots file
├── 📂 images/                     # Static images
│   ├── 📄 logo.svg                # Site logo
│   ├── 📄 hero-bg.jpg             # Hero background
│   └── 📂 icons/                  # Icon assets
├── 📂 fonts/                      # Custom fonts (if any)
└── 📂 docs/                       # Static documentation files
```

## 📂 Documentation (`/docs/`)
Additional documentation and guides.

```
docs/
├── 📄 API.md                      # API documentation
├── 📄 DEPLOYMENT.md               # Deployment guide
├── 📄 TESTING.md                  # Testing guide
├── 📄 SECURITY.md                 # Security considerations
├── 📂 contracts/                  # Smart contract documentation
├── 📂 architecture/               # Architecture diagrams
└── 📂 tutorials/                  # User and developer tutorials
```

## 📂 Scripts Directory (`/scripts/`)
Build, deployment, and utility scripts.

```
scripts/
├── 📄 deploy.js                   # Deployment script
├── 📄 seed-db.js                  # Database seeding
├── 📄 migrate.js                  # Database migrations
├── 📄 build-contracts.js          # Contract compilation
└── 📂 utilities/                  # Utility scripts
```

## 🔧 Configuration Files

### Package Management
- **`package.json`** - Dependencies, scripts, and project metadata
- **`package-lock.json`** - Locked dependency versions

### TypeScript Configuration
- **`tsconfig.json`** - TypeScript compiler options
- **`next-env.d.ts`** - Next.js TypeScript declarations

### Build Configuration
- **`next.config.ts`** - Next.js build configuration
- **`eslint.config.mjs`** - ESLint linting rules

### Environment & Deployment
- **`env.example`** - Environment variables template
- **`.gitignore`** - Git ignore patterns
- **`Dockerfile`** - Docker containerization (future)
- **`docker-compose.yml`** - Local development setup (future)

## 📊 File Naming Conventions

### React Components
- **PascalCase** for component files: `ArtistCard.tsx`
- **camelCase** for hooks: `useAuth.ts`
- **kebab-case** for pages: `create-loan.tsx`

### Utilities and Helpers
- **camelCase** for utility files: `formatting.ts`
- **UPPER_CASE** for constants: `API_ENDPOINTS`

### API Routes
- **kebab-case** for API endpoints: `/api/create-loan`
- **RESTful** naming: `/api/loans/:id`

## 🎯 Development Workflow

### Adding New Features
1. Create feature branch: `feature/loan-fractionalization`
2. Add types in `/src/types/`
3. Create components in appropriate `/src/components/` subdirectory
4. Add API routes in `/src/pages/api/`
5. Create pages in `/src/pages/`
6. Add tests and documentation
7. Submit pull request

### Code Organization Principles
- **Separation of Concerns** - Keep business logic separate from UI
- **Reusability** - Create reusable components and utilities
- **Type Safety** - Use TypeScript throughout the application
- **Consistency** - Follow established patterns and conventions
- **Documentation** - Document complex logic and public APIs

---

**This structure provides a solid foundation for building a scalable, maintainable art lending platform. 🏗️✨**

*As the project grows, this structure will evolve to accommodate new features and requirements.*
