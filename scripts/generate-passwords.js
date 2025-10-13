const bcrypt = require('bcryptjs');

async function generatePasswords() {
  console.log('🔐 Generating Password Hashes for DPR Assessment System\n');
  
  const passwords = [
    { label: 'MDoNER Admin Password (MDoNER@2025)', plain: 'MDoNER@2025' },
    { label: 'Client User Password (Client@2025)', plain: 'Client@2025' }
  ];
  
  for (const pwd of passwords) {
    const hash = await bcrypt.hash(pwd.plain, 10);
    console.log(`${pwd.label}:`);
    console.log(`Hash: ${hash}\n`);
  }
}

generatePasswords().catch(console.error);