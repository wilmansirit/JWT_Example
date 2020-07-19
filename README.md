1.- Prepare un servidor express simple:

# app = express();

2.- Recordar que express no maneja de forma nativa el formato JSON en el Body, por lo que se debe usar el middleware:

# app.use(express.json());

3.- Se crea un middleware denominado isAuth

# app.use(isAuth({ secret: process.env.PRIVATE_KEY }).unless({ path: ['/api/login'] }));
