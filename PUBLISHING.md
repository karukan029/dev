# Publishing to GitHub Packages

## Setup

1. Create a Personal Access Token with `write:packages` scope:
   - Go to https://github.com/settings/tokens
   - Generate new token (classic)
   - Select `write:packages` and `read:packages`

2. Configure npm registry:
   ```bash
   npm config set @karukan029:registry https://npm.pkg.github.com
   ```

3. Login to GitHub Packages:
   ```bash
   npm login --scope=@karukan029 --registry=https://npm.pkg.github.com
   # Username: your-github-username
   # Password: your-personal-access-token
   # Email: your-email
   ```

## Publish

```bash
# Bump version
npm version patch  # or minor, major

# Publish to GitHub Packages
npm publish
```

## Usage in Content Repository

1. Create `.npmrc` in your content repository:
   ```
   @karukan029:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
   ```

2. Install the package:
   ```bash
   pnpm add @karukan029/dev
   ```

3. Use the CLI:
   ```bash
   # Development
   npx blog-runtime dev

   # Build
   npx blog-runtime build

   # Preview
   npx blog-runtime preview

   # Deploy
   npx blog-runtime deploy
   ```

4. Or add to package.json scripts:
   ```json
   {
     "scripts": {
       "dev": "blog-runtime dev",
       "build": "blog-runtime build",
       "preview": "blog-runtime preview",
       "deploy": "blog-runtime deploy"
     }
   }
   ```

## CI/CD Setup

For GitHub Actions, add your token as a secret and use it:

```yaml
- name: Install dependencies
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: pnpm install
```
