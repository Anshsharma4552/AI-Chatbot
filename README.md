## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
# Botato - AI Chatbot

A modern AI-powered chatbot built with Next.js, featuring intelligent search and research capabilities.

## Features

✅ **Smart AI Responses** - Powered by Google's Gemini AI
✅ **Search & Research Modes** - Different response styles for different needs
✅ **User Authentication** - Secure login with Clerk
✅ **Search History** - Save and revisit your conversations
✅ **Discover Page** - Trending topics and quick prompts
✅ **Library** - Personal search history management
✅ **Responsive Design** - Works on all devices
✅ **Real-time Updates** - Instant responses and updates

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase
- **AI**: Google Gemini API
- **UI Components**: Radix UI, Lucide Icons

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase Database**
   Create the following tables in your Supabase project:
   
   **Users table:**
   ```sql
   CREATE TABLE Users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
   
   **Library table:**
   ```sql
   CREATE TABLE library (
     id SERIAL PRIMARY KEY,
     libId VARCHAR(255) UNIQUE,
     searchInput TEXT,
     userEmail VARCHAR(255),
     type VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Sign up/Sign in** using the authentication system
2. **Choose between Search or Research mode** on the home page
3. **Type your question** and get AI-powered responses
4. **Explore trending topics** on the Discover page
5. **View your search history** in the Library
6. **Navigate easily** using the sidebar menu

## Project Structure

```
ai-chatbot/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (routes)/         # Main application routes
│   ├── _components/      # Shared components
│   ├── api/             # API routes
│   └── globals.css      # Global styles
├── components/ui/        # UI components
├── context/             # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── services/            # External services
└── public/              # Static assets
```
