db.auth('root', 'password')

db = db.getSiblingDB('testdatabase')

db.createUser({
  user: 'auth-admin',
  pwd: 'auth-password',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});