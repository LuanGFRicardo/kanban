// Importa a instância do app que foi criada no arquivo 'src/app.js'
import app from "./src/app.js";

// Define a porta em que o servidor vai escutar as requisições
const PORT = 3000;

// Inicia o servidor e faz com que ele escute na porta especificada
app.listen(PORT, () => {
    // Quando o servidor estiver rodando, exibe uma mensagem no console
    console.log(`Servidor na escuta na porta ${PORT}!`);
});
