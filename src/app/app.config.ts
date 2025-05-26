import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'tarefas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'data', keypath: 'data', options: { unique: false } },
        { name: 'servico', keypath: 'servico', options: { unique: false } },
        { name: 'prioridadeSelecionada', keypath: 'prioridadeSelecionada', options: { unique: false } },
        { name: 'cliente', keypath: 'cliente', options: { unique: false } },
        { name: 'atividade', keypath: 'atividade', options: { unique: false } },
        { name: 'obs', keypath: 'obs', options: { unique: false } },
        { name: 'quem', keypath: 'quem', options: { unique: false } },
        { name: 'statusSelecionada', keypath: 'statusSelecionada', options: { unique: false } },
        { name: 'financeiroSelecionada', keypath: 'financeiroSelecionada', options: { unique: false } },
        { name: 'valor', keypath: 'valor', options: { unique: false } },
        { name: 'valorNumerico', keypath: 'valorNumerico', options: { unique: false } }
      ]

    }
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

// ✅ Aqui sim, o provider correto:
    provideIndexedDb(dbConfig)
  ],
};
