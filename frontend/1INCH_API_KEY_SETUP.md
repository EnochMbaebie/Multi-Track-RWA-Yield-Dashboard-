# 1inch API Key Setup (Required)

## ⚠️ Important: API Key is Now Mandatory

1inch API now requires an API key for all requests. You must set up an API key before using the 1inch integration.

## Steps to Get API Key

1. **Visit 1inch Developer Portal**: https://portal.1inch.dev/
2. **Sign up or Log in** to your account
3. **Create a new API key**:
   - Go to "API Keys" section
   - Click "Create API Key"
   - Give it a name (e.g., "Alatfi Trading App")
   - Copy the generated API key

## Setup in Your Project

1. **Create or edit `.env.local`** in the `frontend` directory:
   ```bash
   cd frontend
   nano .env.local  # or use your preferred editor
   ```

2. **Add your API key**:
   ```env
   NEXT_PUBLIC_1INCH_API_KEY=your_api_key_here
   ```

3. **Restart your dev server**:
   ```bash
   pnpm run dev
   ```

## Verify Setup

After setting up the API key, the 1inch integration should work without 401 errors. You can test it by:
- Opening the 1inch Swap Demo component
- Trying to fetch a swap quote

## Troubleshooting

### Error: "1inch API key is required"
- Make sure `.env.local` exists in the `frontend` directory
- Verify the variable name is exactly `NEXT_PUBLIC_1INCH_API_KEY`
- Restart your dev server after adding the key
- Make sure there are no spaces around the `=` sign

### Error: "401 Unauthorized"
- Your API key might be invalid
- Check that you copied the full key without extra spaces
- Verify the key is active in the 1inch Developer Portal
- Try generating a new API key

### Error: "Failed to fetch"
- This is usually a CORS issue (should be fixed with the API proxy)
- Make sure the Next.js API route is working
- Check browser console for detailed error messages

## Security Note

- Never commit `.env.local` to git (it should be in `.gitignore`)
- API keys are stored server-side in the API route
- The key is only used for server-to-server communication

## Need Help?

- 1inch Developer Portal: https://portal.1inch.dev/
- 1inch Documentation: https://docs.1inch.io/
- Check the browser console for detailed error messages

