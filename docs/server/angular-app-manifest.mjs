
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular_Multi-Tarefa/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular_Multi-Tarefa"
  },
  {
    "renderMode": 2,
    "route": "/angular_Multi-Tarefa/cadastro"
  },
  {
    "renderMode": 2,
    "route": "/angular_Multi-Tarefa/teste"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23633, hash: '87e18347c565567a11f24bff8804fd83a22795ae0a35cb13071487d67e03f998', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17164, hash: '696c1ad1374f7e9ea32c282b2b92422d1c5ce3616115c2834ff31070040af01a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cadastro/index.html': {size: 88595, hash: 'c70824d588cb0c5d62a5d8c852dd2e83e2b5d31212d258e17f7d34d6e82f7b12', text: () => import('./assets-chunks/cadastro_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27691, hash: '16b1d6903fb9140365285f89f910adae481c6b8e73e23ce2e61d5ef6ed737bc2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'teste/index.html': {size: 40836, hash: '464e39518c246263c2724796ce0c72a9de9ce5900227fbccec62faeee4b9f067', text: () => import('./assets-chunks/teste_index_html.mjs').then(m => m.default)},
    'styles-XOFGGUS3.css': {size: 7045, hash: 'uRjKrpq2HLY', text: () => import('./assets-chunks/styles-XOFGGUS3_css.mjs').then(m => m.default)}
  },
};
