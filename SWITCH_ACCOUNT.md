# 🔄 Switch GitHub Account

## Logout dari IdcuqS07

```bash
# Clear Git credentials
git config --global --unset user.name
git config --global --unset user.email
git config --global --unset credential.helper

# Logout dari GitHub CLI (jika ada)
gh auth logout
```

## Login sebagai 0xYamando

```bash
# Set Git config
git config --global user.name "0xYamando"
git config --global user.email "your-email@example.com"

# Login GitHub CLI
gh auth login
```

## Atau: Pakai SSH Key

```bash
# Generate SSH key untuk 0xYamando
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add ke GitHub:
# 1. Go to https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Paste key
# 4. Save
```

## Push dengan Akun Baru

```bash
cd shadowtrade

# Pakai HTTPS dengan token
git remote add origin https://github.com/0xYamando/ShadowTrade.git
git push -u origin main

# Atau pakai SSH
git remote add origin git@github.com:0xYamando/ShadowTrade.git
git push -u origin main
```

---

## Quick Fix: Pakai Personal Access Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy token
5. Push:
```bash
git remote add origin https://YOUR_TOKEN@github.com/0xYamando/ShadowTrade.git
git push -u origin main
```

---

Sudah logout? Atau mau pakai cara lain?
