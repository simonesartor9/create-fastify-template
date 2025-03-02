import {connectToDatabase} from "./plugins/sequelize";
import app, {logger} from "./config/apiConfig";

const start = async () => {
    try {
        await connectToDatabase();
        await app.listen({port: Number(process.env.PORT) || 3000});
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

void start();
