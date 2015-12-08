var ATOM = require('atom');
var fs = require('fs');

/* lets create an atom feed */
var feed = new ATOM({
        title: 'title',
        description: 'description',
        feed_url: 'http://example.com/atom.xml',
        site_url: 'http://example.com',
        image_url: 'http://example.com/icon.png',
        author: 'Dylan Greene'
    });

/* loop over data and add to feed */
feed.item({
    title:  'item title',
    id: 'ids',
    description: 'use this for the content. It can include html.',
    url: 'http://example.com/article4?this&that', // link to the item
    guid: '1123', // optional - defaults to url
    author: 'Guest Author', // optional - defaults to feed author property
    date: 'May 27, 2012', // any format that js Date can parse.
    updated: 'May 27, 2012'
});

// cache the xml
var xml = feed.xml();
fs.writeFile('atom.xml', xml);
