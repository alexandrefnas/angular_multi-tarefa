
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular_multi-tarefa/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular_multi-tarefa"
  },
  {
    "renderMode": 2,
    "route": "/angular_multi-tarefa/cadastro"
  },
  {
    "renderMode": 2,
    "route": "/angular_multi-tarefa/teste"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23633, hash: '897a7a4eda99b9d622d8d03e165f3638e4660dd026b32b26714e7859bd04f8a3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17164, hash: '7c10258198febf43e846bf5dd9b00e0002048c8ee69a855724fef463827a7ec3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27691, hash: '8603459ee0d700b4fcfd63db85d03aa97accd4366d90c2b04104acd0efc6ec32', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'cadastro/index.html': {size: 88595, hash: '66797dd0168673fbd8d1734bd64be64013c1b876c49fa80563ce5c2dff4ca013', text: () => import('./assets-chunks/cadastro_index_html.mjs').then(m => m.default)},
    'teste/index.html': {size: 40823, hash: '4d6381e9b7bb65d271d1727a8080bf17edcf37d30acc14d5b6c28a25b703fa4d', text: () => import('./assets-chunks/teste_index_html.mjs').then(m => m.default)},
    'styles-XOFGGUS3.css': {size: 7045, hash: 'uRjKrpq2HLY', text: () => import('./assets-chunks/styles-XOFGGUS3_css.mjs').then(m => m.default)}
  },
};
