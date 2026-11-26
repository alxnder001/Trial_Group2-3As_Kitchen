import express       from 'express';
import cors          from 'cors';
import session       from 'express-session';
import fs            from 'fs';
import path          from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,   // allow cookies
}));

app.use(session({
    secret:            '3akitchen_secret_key',
    resave:            false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge:   24 * 60 * 60 * 1000,  // 1 day
    }
}));

const ROUTES = {
    userRoute:     '/users',
    itemRoute:     '/items',
    orderRoute:    '/orders',
    riderRoute:    '/riders',
    promoRoute:    '/promos',
    expenseRoute:  '/expenses',
    feedbackRoute: '/feedback',
};

for (const [file, prefix] of Object.entries(ROUTES)) {
    const full = path.join(__dirname, 'routes', `${file}.js`);
    if (!fs.existsSync(full)) continue;
    const mod = await import(pathToFileURL(full).href);
    app.use(prefix, mod.default);
    console.log(`mounted ${prefix}`);
}

app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});
