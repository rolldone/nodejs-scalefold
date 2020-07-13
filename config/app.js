const {Env} = require('@tool');

module.exports = {
  // -------------------------------------
  // Ini untuk define versi front asset di
  // setiap halaman biar enggak clear cache
  // --------------------------------------
  web_app_ver: Env.WEB_APP_VER || null,
  // -----------------------------------
  // Ini Domain Aplikasinya
  // --------------------------------------
  app_domain: Env.APP_DOMAIN || null,
  app_port: Env.PORT || null,
  /**
  ----------------------------------------
  Socket IO
  ----------------------------------------
  **/
  socket_domain: Env.APP_PROTOCOL + '://' + Env.APP_DOMAIN + ':' + Env.PORT,
  // -----------------------------------------
  // Jika aplikasi ini adalah subdomain
  // Maka define root domain sangat di anjurkan
  // Contoh kasus seperti mylohr.fr
  // --------------------------------------------
  root_domain: Env.ROOT_DOMAIN || null,
  // -----------------------------
  // DEFINE TOKEN EXPIRED
  // USE TIME MILLISECOND 
  // --------------------------------
  expired_token: 1 * 24 * 60 * 60 * 1000 || null,
  // -----------------------------
  // DEFINE TOKEN EXPIRED
  // USE TIME MILLISECOND 
  // --------------------------------
  expired_refresh_token: 7 * 24 * 60 * 60 * 1000 || null,
  // -------------------------------------
  // DEFINE APP SECRET LIKE LARAVEL
  // FOR KEY ENCRYPTION
  // -------------------------------------
  app_secret: Env.APP_SECRET || 'secret',
  // --------------------------------------
  // DEFINE APP PROTOCOL EX http/https
  // ----------------------------------------
  app_protocol: Env.APP_PROTOCOL || 'http',
  // -------------------------------------------
  // DEFINE COOKIE DOMAIN
  // ----------------------------------------------
  cookie_domain: Env.COOKIE_DOMAIN || 'localhost',
  // -------------------------------------------------
  // DEFINE KEY INVOICE UNTUK PREFIX INVOICE CODE
  // -------------------------------------------------
  invoice_key: Env.INVOICE_KEY || null
}