# 🎨 Open Artist Bank - Art Lending Platform

> **Liquidity for Artists. Returns for Communities.**

A decentralized Artist Bank where local artists can access liquidity by taking small loans backed by their artwork, and community members (fans, collectors, supporters) can provide those loans and share in the returns when works sell.

This system blends microfinance, art collecting, and blockchain transparency into a new cultural economy.

## 🌟 Vision

Transform the way artists access capital and communities invest in culture. By creating a peer-to-peer lending marketplace backed by artwork, we enable:

- **Artists**: Upfront liquidity without traditional debt or galleries
- **Backers**: Opportunity to support creators and share in their success
- **Communities**: Direct investment in local cultural ecosystems

## 🚀 How It Works

### For Artists
1. **List & Request** - Upload artwork and request loans based on estimated value
2. **Get Funded** - Community members back your work with micro-loans starting at $10
3. **Create & Sell** - Focus on creating while we handle the funding logistics
4. **Share Success** - When your work sells, backers get their returns automatically

### For Backers
1. **Browse Opportunities** - Discover promising artists and artworks
2. **Micro-Invest** - Back artists with small amounts ($10-$100)
3. **Track Performance** - Monitor your investments and artist progress
4. **Earn Returns** - Get paid when artwork sells (typically 2x return)

### Example: Danny's Painting
- Danny lists a painting (estimated value: $1,000)
- Community provides $100 loan in $10 slices
- When Danny sells for $1,000:
  - Lenders receive $200 total return
  - Danny keeps $900 ($100 upfront + $800 post-sale)
  - Everyone wins! 🎉

## 🏗️ Architecture

### Smart Contracts
- **Loan Contract**: Escrows funds, defines terms, locks repayment to sale events
- **Fractional Rights**: Tokenized loan shares (ERC-20/1155) for micro-investments
- **Marketplace**: P2P trading of loan fractions for liquidity

### Platform Features
- **Artist Dashboard**: Loan applications, artwork management, reputation tracking
- **Backer Dashboard**: Investment opportunities, portfolio tracking, returns
- **Secondary Market**: Trade loan fractions, transparent community involvement

### Risk Management
- Small loan caps ($10-$500 initially)
- Manual curation of trusted artists
- Over-collateralization (loans < estimated value)
- Community-distributed risk

## 💎 Membership System

### Artists ($10/month)
- ✅ Loan access and listing privileges
- ✅ Free canvas frames & art materials (monthly)
- ✅ Community Discord access
- ✅ Priority support and promotion

### Backers (Free)
- ✅ Browse and back any artwork
- ✅ Track investments and returns
- ✅ Community participation
- 🎯 Optional premium perks available

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Styled Components with custom art-focused theme
- **Blockchain**: Ethereum/Polygon smart contracts
- **Backend**: Node.js API routes, database integration
- **Authentication**: Web3 wallet integration

## 🎯 Current Status

**Phase 1 Development** - Landing page and core infrastructure
- ✅ Modern, responsive UI with art gallery aesthetics
- ✅ Theme system and component library
- ✅ Project architecture and documentation
- 🔄 Smart contract development (upcoming)
- 🔄 Artist onboarding system (upcoming)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/art-lending.git
   cd art-lending
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
WALLET_CONNECT_PROJECT_ID=your_project_id
```

## 📁 Project Structure

```
art-lending/
├── src/
│   ├── pages/          # Next.js pages and API routes
│   ├── styles/         # Theme configuration and global styles
│   ├── components/     # Reusable UI components
│   ├── contracts/      # Smart contract interfaces
│   └── utils/          # Helper functions and utilities
├── public/             # Static assets
├── docs/              # Additional documentation
└── contracts/         # Smart contract source code
```

## 🤝 Contributing

We welcome contributions from developers, artists, and community members!

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use styled-components for styling
- Write tests for new features
- Update documentation as needed

## 📋 Roadmap

See our [interactive roadmap page](/roadmap) or [ROADMAP.md](./ROADMAP.md) for detailed development phases and milestones.

**Quick Overview:**
- **Phase 1** (Oct-Dec 2025): MVP launch with pilot artists
- **Phase 2** (Q1 2026): Fractionalization and marketplace
- **Phase 3** (Q2-Q3 2026): Event integration and scaling
- **Phase 4** (2027+): Multi-city expansion and DeFi integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌐 Links

- **Website**: [Coming Soon]
- **Discord**: [Join Community]
- **Twitter**: [@OpenArtistBank]
- **Documentation**: [docs.openartistbank.com]

## 💬 Support

- **Discord**: Join our community for real-time support
- **Email**: hello@openartistbank.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/art-lending/issues)

---

**Built with ❤️ for artists and communities**

*"Invest in Culture. Empower Creators. Share the Rewards."*