# Inclusive Public Services Directory

SDG 10 (Reduced Inequalities) and SDG 16 (Peace, Justice and Strong Institutions).
Stack: HTML, CSS, JavaScript, Express.js, MongoDB (Mongoose).

## How to run (in VS Code)

1. Install Node.js (LTS) and MongoDB Community Server (or use a free MongoDB Atlas cluster).
2. Open this folder in VS Code, then open the terminal (Ctrl + `).
3. Run these commands:

```
npm install
npm run seed
npm start
```

4. Open http://localhost:3000 (public site) and http://localhost:3000/admin.html (admin).
   Default admin password: `admin123` (change it in config.js).

## Using MongoDB Atlas instead of local MongoDB

Set the connection string before `npm start`:

- Windows PowerShell: `$env:MONGO_URL="your-connection-string"`
- Mac/Linux: `export MONGO_URL="your-connection-string"`

Run `npm run seed` before every demo to reset the sample data.
