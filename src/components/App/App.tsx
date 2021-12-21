import React from 'react';
import { StickyNoteTransport } from '../../services/StickyNoteTransport';
import { IStickyNote } from '../../interfaces/StickyNote';
import { Desktop } from '../Desktop';

import { debounce } from '../../utils/dabounce';

const App = () => {
  const [stickerList, setStickerList] = React.useState<IStickyNote[]>([]);
  const [pending, setPending] = React.useState(true);

  const rendered = React.useMemo(() => true, []);

  const sendData = React.useCallback(
    debounce((stickerList: IStickyNote[]) => {
      StickyNoteTransport.post(stickerList);
    }),
    [rendered]
  );

  const saveHandler = (stickerList: IStickyNote[]) => {
    sendData(stickerList);
    setStickerList(stickerList);
  };

  // in case of SSR useEffect become useless
  React.useEffect(() => {
    const fetch = async () => {
      const data = await StickyNoteTransport.get();

      setStickerList(data);
      setPending(false);
    };

    fetch();
  }, []);

  return <Desktop onSave={saveHandler} stickerList={stickerList} pending={pending} />;
};

export { App };
