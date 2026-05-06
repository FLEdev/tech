/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Provider} from '@lexical/yjs';
import {CAN_USE_DOM} from '@lexical/utils';
import {WebsocketProvider} from 'y-websocket';
import {Doc} from 'yjs';

const getWebsocketConfig = () => {
  if (!CAN_USE_DOM) {
    return {
      endpoint: 'ws://localhost:1234',
      slug: 'playground',
      id: '0',
    };
  }
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return {
    endpoint: params.get('collabEndpoint') || 'ws://localhost:1234',
    slug: 'playground',
    id: params.get('collabId') || '0',
  };
};

const config = getWebsocketConfig();
const WEBSOCKET_ENDPOINT = config.endpoint;
const WEBSOCKET_SLUG = config.slug;
const WEBSOCKET_ID = config.id;

// parent dom -> child doc
export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>,
): Provider {
  let doc = yjsDocMap.get(id);

  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  return createWebsocketProviderWithDoc(id, doc);
}

export function createWebsocketProviderWithDoc(id: string, doc: Doc): Provider {
  // @ts-expect-error
  return new WebsocketProvider(
    WEBSOCKET_ENDPOINT,
    WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id,
    doc,
    {
      connect: false,
    },
  );
}
