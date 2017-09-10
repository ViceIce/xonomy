# Xonomy XmlEditor

This is a fork of the Xonomy.

<img src="http://www.lexiconista.com/Xonomy/xonomy3.gif" style="display: block; width: 100%; max-width: 948px; border: 2px solid #333333"/>

Xonomy is a web-based, schema-driven XML editor. For demos and documentation see http://www.lexiconista.com/xonomy/

## Quickstart

- Add package

   ```shell
   yarn add Xonomy
   ```
- import style (adapt url)

   ```css
   @import url(~xonomy/assets/css/xonomy.css);
   ```

- import module and render editor

    ```javascript
    import Xonomy from 'xonomy';

    const xml = "<list>sdf + YYY<item label='one'/><item label='two'/></list>";
    const editor = document.getElementById('editor');

    Xonomy.render(xml, editor);
    ```

## Changes
See [Changelog](CHANGELOG.md)

## License
[The MIT License (MIT)](LICENSE)
