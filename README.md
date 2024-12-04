# AutoSecrets.ca 🚗

The ultimate car listings aggregator for the Canadian market.

## 🌟 Features

- **Real-time Listings**: Aggregates listings from multiple sources
  - Cars.ca
  - Kijiji Autos
  - Facebook Marketplace
  - AutoTrader
  - CarGurus
  - Craigslist
  - Cars.com

- **Smart Search**: Advanced filtering and sorting options
- **Price Tracking**: Get notified when prices drop
- **Saved Searches**: Save your searches and get notifications
- **Market Analytics**: Track price trends and market insights

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Payments**: Stripe
- **Deployment**: Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Firebase account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/theunstuckpath/autosecrets.git
   cd autosecrets
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   python -m pip install -r requirements.txt
   ```

4. Create environment files:
   ```bash
   # Frontend (.env)
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_key

   # Backend (backend/.env)
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

5. Start the development servers:
   ```bash
   # Frontend
   npm run dev

   # Backend
   cd backend
   python run.py
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
