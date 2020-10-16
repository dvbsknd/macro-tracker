'use strict';

function main () {
  console.log('Hello, world.');
}

$(document).ready(main());

if (typeof module !== 'undefined') module.exports = { main };
