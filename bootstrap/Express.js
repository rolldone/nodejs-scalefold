const { App, Cors, BodyParser, Express, Path, Cookie, Session, Env, Redis, RedisStore } = require('@tool');
var multer = require('multer');
var upload = multer();
module.exports = async function(callback){
  App.use(Cors());
  // app.set("views", path.join(__dirname, "../", "views"));
  // app.engine('ejs', ejs.renderFile);
  App.set("view engine", "html");
  //static files
  App.use("/public", Express.static(Path.join(__dirname, '../', "public")));
  App.use("/ractive", Express.static(Path.join(__dirname, '../', "resources/views")));
  // App.use("/public", Express.static(Path.join(__dirname, '../', "resources/views")));

  /* Request Type  */
  /* application/json */
  App.use(BodyParser.json());
  /* application-x-www-form-urlencoded */
  App.use(BodyParser.urlencoded({
    extended: true
  }));
  /* Multipart/form-data */
  App.use(upload.array());
  /* ---------------------------------- */
  
  App.use(Cookie());
  /* Create redis client */
  const redisClient = Redis.createClient({
    port: Env.REDIS_PORT,
    host: Env.REDIS_HOST,
    auth: Env.REDIS_AUTH,
    no_ready_check: true
  });
  const sess = {
    secret: 'p023mvadfv2pmvdkfvmkadfv8204mvafdmvi',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store : new RedisStore({ client : redisClient })
  }
  if (Env.APP_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  App.use(Session(sess));
  console.log('cabback',callback);
  return null;
}