const bcrypt = require('bcrypt');
async function test() {
    const hash = await bcrypt.hash('password', 10);
    const match = await bcrypt.compare('password', hash);
    console.log('Bcrypt test:', match ? 'SUCCESS' : 'FAIL');
}
test();
