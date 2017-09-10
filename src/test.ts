import Xonomy from './index';
import * as $ from 'jquery';
import './../assets/css/xonomy.css';

$(() => {
    var xml = "<list>sdf + YYY<item label='one'/><item label='two'/></list>";
    const $body = $('body').append('<div id="editor">');
    var editor = document.getElementById('editor');
    Xonomy.render(xml, editor, null);
});
