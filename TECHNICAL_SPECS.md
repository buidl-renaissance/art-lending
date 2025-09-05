# 🔧 Technical Specifications

> **Open Artist Bank - Technical Architecture and Implementation Details**

This document provides detailed technical specifications for the Open Artist Bank platform, covering smart contracts, web application architecture, and integration requirements.

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Smart Contracts](#smart-contracts)
- [Web Application](#web-application)
- [Database Schema](#database-schema)
- [API Specifications](#api-specifications)
- [Security Considerations](#security-considerations)
- [Integration Requirements](#integration-requirements)

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                         │
├─────────────────────────────────────────────────────────────────┤
│                     API Layer (Node.js)                        │
├─────────────────────────────────────────────────────────────────┤
│                     Database (PostgreSQL)                      │
├─────────────────────────────────────────────────────────────────┤
│                 Blockchain Layer (Ethereum/Polygon)            │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Styled Components with custom theme
- **State Management**: React Context + useState/useReducer
- **Web3**: ethers.js or viem for blockchain interactions
- **Authentication**: NextAuth.js with Web3 wallet support

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens + Web3 signature verification
- **File Storage**: IPFS for artwork metadata and images
- **Email**: SendGrid or similar for notifications

#### Blockchain
- **Networks**: Ethereum Mainnet, Polygon (Layer 2)
- **Standards**: ERC-20 (loan tokens), ERC-1155 (fractional rights)
- **Development**: Hardhat framework
- **Testing**: Foundry for smart contract testing

---

## 📜 Smart Contracts

### Core Contracts Architecture

```
ArtistBank (Main Contract)
├── LoanFactory (Creates individual loans)
├── FractionFactory (Creates fractional tokens)
├── Marketplace (P2P trading)
├── ArtistRegistry (Verified artists)
├── ValuationOracle (Price feeds)
└── GovernanceToken (DAO voting)
```

### 1. ArtistBank.sol (Main Contract)

```solidity
contract ArtistBank {
    struct Artist {
        address wallet;
        bool verified;
        uint256 reputation;
        uint256 totalLoansIssued;
        uint256 successfulRepayments;
    }
    
    struct Loan {
        uint256 id;
        address artist;
        uint256 amount;
        uint256 estimatedValue;
        uint256 repaymentMultiplier; // e.g., 200 = 2x return
        LoanStatus status;
        string artworkHash; // IPFS hash
        uint256 createdAt;
        uint256 deadline;
    }
    
    enum LoanStatus { PENDING, FUNDED, ACTIVE, REPAID, DEFAULTED }
    
    mapping(address => Artist) public artists;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => address[]) public loanBackers;
    
    function createLoan(
        uint256 amount,
        uint256 estimatedValue,
        string calldata artworkHash
    ) external onlyVerifiedArtist returns (uint256 loanId);
    
    function fundLoan(uint256 loanId) external payable;
    
    function repayLoan(uint256 loanId) external payable;
    
    function registerArtist(address artist) external onlyOwner;
}
```

### 2. FractionalLoan.sol (ERC-1155)

```solidity
contract FractionalLoan is ERC1155 {
    struct LoanFraction {
        uint256 loanId;
        uint256 totalSupply;
        uint256 pricePerFraction;
        uint256 expectedReturn;
    }
    
    mapping(uint256 => LoanFraction) public fractions;
    
    function fractionalizeLoan(
        uint256 loanId,
        uint256 totalFractions,
        uint256 pricePerFraction
    ) external returns (uint256 tokenId);
    
    function buyFractions(uint256 tokenId, uint256 amount) external payable;
    
    function claimReturns(uint256 tokenId) external;
}
```

### 3. LoanMarketplace.sol

```solidity
contract LoanMarketplace {
    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 amount;
        uint256 pricePerToken;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
    
    function listFractions(
        uint256 tokenId,
        uint256 amount,
        uint256 pricePerToken
    ) external returns (uint256 listingId);
    
    function buyListing(uint256 listingId, uint256 amount) external payable;
    
    function cancelListing(uint256 listingId) external;
}
```

### Smart Contract Security Features

- **Access Control**: OpenZeppelin's AccessControl for role management
- **Reentrancy Protection**: ReentrancyGuard on all payable functions
- **Pause Mechanism**: Emergency pause functionality
- **Upgradability**: Proxy pattern for future upgrades (carefully implemented)
- **Multi-signature**: Timelock controller for critical operations

---

## 💻 Web Application

### Frontend Architecture

#### Component Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── artist/          # Artist-specific components
│   ├── backer/          # Backer-specific components
│   ├── loan/            # Loan-related components
│   └── marketplace/     # Marketplace components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts for state
├── utils/               # Helper functions
├── types/               # TypeScript type definitions
└── constants/           # App constants and config
```

#### Key Components

```typescript
// Artist Dashboard Components
interface ArtistDashboardProps {
  artist: Artist;
  loans: Loan[];
  stats: ArtistStats;
}

// Loan Creation Component
interface CreateLoanProps {
  onSubmit: (loanData: LoanFormData) => void;
  maxLoanAmount: number;
}

// Backer Portfolio Component
interface BackerPortfolioProps {
  investments: Investment[];
  totalValue: number;
  returns: number;
}
```

#### State Management

```typescript
// Global App Context
interface AppContextType {
  user: User | null;
  wallet: WalletConnection | null;
  contracts: ContractInstances;
  theme: Theme;
}

// Loan Context
interface LoanContextType {
  loans: Loan[];
  loading: boolean;
  createLoan: (data: LoanFormData) => Promise<void>;
  fundLoan: (loanId: string, amount: number) => Promise<void>;
}
```

### API Routes

#### Authentication
```typescript
// POST /api/auth/verify
interface VerifyWalletRequest {
  address: string;
  signature: string;
  message: string;
}

// POST /api/auth/refresh
interface RefreshTokenRequest {
  refreshToken: string;
}
```

#### Artists
```typescript
// GET /api/artists
interface GetArtistsResponse {
  artists: Artist[];
  pagination: PaginationMeta;
}

// POST /api/artists/register
interface RegisterArtistRequest {
  walletAddress: string;
  profile: ArtistProfile;
  portfolio: ArtworkSample[];
}
```

#### Loans
```typescript
// POST /api/loans
interface CreateLoanRequest {
  artworkMetadata: ArtworkMetadata;
  loanAmount: number;
  estimatedValue: number;
}

// GET /api/loans/:id
interface GetLoanResponse {
  loan: LoanDetails;
  fractions: FractionInfo[];
  backers: BackerInfo[];
}
```

---

## 🗄️ Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    email VARCHAR(255),
    profile JSONB,
    role VARCHAR(20) DEFAULT 'backer',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Artists table
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    artist_name VARCHAR(255) NOT NULL,
    bio TEXT,
    portfolio_url VARCHAR(255),
    reputation_score INTEGER DEFAULT 0,
    total_loans INTEGER DEFAULT 0,
    successful_repayments INTEGER DEFAULT 0,
    membership_active BOOLEAN DEFAULT FALSE,
    membership_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Artworks table
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    estimated_value DECIMAL(10,2),
    ipfs_hash VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Loans table
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artwork_id UUID REFERENCES artworks(id),
    artist_id UUID REFERENCES artists(id),
    amount DECIMAL(10,2) NOT NULL,
    estimated_value DECIMAL(10,2) NOT NULL,
    repayment_multiplier DECIMAL(3,2) DEFAULT 2.00,
    status VARCHAR(20) DEFAULT 'pending',
    blockchain_tx_hash VARCHAR(66),
    contract_address VARCHAR(42),
    funded_amount DECIMAL(10,2) DEFAULT 0,
    deadline TIMESTAMP,
    repaid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Investments table
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    loan_id UUID REFERENCES loans(id),
    backer_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    fraction_token_id VARCHAR(255),
    fraction_amount INTEGER,
    returns_claimed DECIMAL(10,2) DEFAULT 0,
    blockchain_tx_hash VARCHAR(66),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    loan_id UUID REFERENCES loans(id),
    type VARCHAR(50) NOT NULL, -- 'investment', 'repayment', 'return'
    amount DECIMAL(10,2) NOT NULL,
    blockchain_tx_hash VARCHAR(66),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes

```sql
-- Performance indexes
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_artist ON loans(artist_id);
CREATE INDEX idx_investments_backer ON investments(backer_id);
CREATE INDEX idx_investments_loan ON investments(loan_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_users_wallet ON users(wallet_address);
```

---

## 🔒 Security Considerations

### Smart Contract Security

1. **Access Control**
   - Role-based permissions (Owner, Artist, Backer)
   - Multi-signature requirements for critical functions
   - Timelock for governance changes

2. **Economic Security**
   - Loan amount limits (max 20% of estimated value)
   - Cooldown periods between loans
   - Reputation-based loan limits

3. **Technical Security**
   - Reentrancy guards on all payable functions
   - Integer overflow protection (Solidity 0.8+)
   - Emergency pause mechanism

### Web Application Security

1. **Authentication**
   - Web3 signature verification
   - JWT token with short expiry
   - Refresh token rotation

2. **Data Protection**
   - Input validation and sanitization
   - SQL injection prevention (Prisma ORM)
   - XSS protection with Content Security Policy

3. **API Security**
   - Rate limiting on all endpoints
   - CORS configuration
   - Request size limits

### Infrastructure Security

1. **Database**
   - Encrypted connections (SSL/TLS)
   - Regular backups with encryption
   - Access logs and monitoring

2. **File Storage**
   - IPFS for decentralized artwork storage
   - Image optimization and validation
   - Content-based addressing

---

## 🔌 Integration Requirements

### Blockchain Integrations

1. **Wallet Connections**
   - MetaMask, WalletConnect, Coinbase Wallet
   - Mobile wallet support
   - Hardware wallet support (Ledger, Trezor)

2. **Network Support**
   - Ethereum Mainnet (high-value loans)
   - Polygon (micro-transactions)
   - Testnet support for development

### External APIs

1. **Payment Processing**
   - Stripe for fiat on-ramps
   - PayPal integration for traditional payments
   - Cryptocurrency payment gateways

2. **Art Market Data**
   - Gallery APIs for pricing data
   - Auction house result feeds
   - Art market analytics services

3. **Communication**
   - SendGrid for email notifications
   - Twilio for SMS notifications
   - Push notifications for mobile

### Social Integrations

1. **Identity Verification**
   - KYC/AML providers (Jumio, Onfido)
   - Social media verification
   - Artist portfolio verification

2. **Community Features**
   - Discord bot integration
   - Twitter API for social sharing
   - POAP integration for events

---

## 📊 Performance Requirements

### Scalability Targets

- **Concurrent Users**: 1,000+ simultaneous users
- **Database**: Handle 10,000+ loans with sub-second queries
- **Blockchain**: Support 100+ transactions per minute
- **File Storage**: Handle artwork images up to 50MB each

### Performance Metrics

- **Page Load Time**: < 2 seconds for initial load
- **API Response Time**: < 500ms for most endpoints
- **Transaction Confirmation**: < 30 seconds on Polygon
- **Database Queries**: < 100ms for standard operations

---

## 🧪 Testing Strategy

### Smart Contract Testing

```solidity
// Example test structure
contract LoanTest {
    function testCreateLoan() public {
        // Test loan creation with valid parameters
    }
    
    function testFundLoan() public {
        // Test loan funding scenarios
    }
    
    function testRepayLoan() public {
        // Test repayment and distribution
    }
}
```

### Frontend Testing

```typescript
// Component testing with React Testing Library
describe('CreateLoanForm', () => {
  it('should submit valid loan data', () => {
    // Test form submission
  });
  
  it('should validate artwork upload', () => {
    // Test file upload validation
  });
});
```

### Integration Testing

- End-to-end testing with Playwright
- API testing with Jest and Supertest
- Blockchain integration testing with local networks

---

**This technical specification serves as the foundation for building a secure, scalable, and user-friendly artist lending platform. 🔧✨**

*Last Updated: December 2024*
