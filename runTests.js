async function runTests() {
    try {
      await require('./tests/login.test');
      await require('./tests/signup.test');
      await require('./tests/users.test');
      console.log('Todas las pruebas se ejecutaron correctamente.');
    } catch (err) {
      console.error('Error en las pruebas:', err);
    }
  }
  
  runTests();
  