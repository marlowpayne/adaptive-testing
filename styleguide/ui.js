require([
    '$',
    'dust!styleguide',
    'dust-helpers',
    'context',
    'dust!table-of-contents',
    'pinny',
    'sheet-right',
    'jquery-ui/autocomplete'
],
function(
    $,
    styleguideTmpl,
    dustHelpers,
    context,
    tableOfContentsTmpl,
    Pinny,
    sheetRight,
    Autocomplete
) {
    // Autocomplete will match against this array of strings
    var _styleguideComponents = [];

    // Update the page URL's hash for scrolling to specific components
    var _setUrlHash = function(hashID) {
        // Delay anchor jump until lockup is released, lockup is causing page jump issues.
        setTimeout(function() {
            var url = window.location.href;
            window.location = url.match(/([a-z]*)\:\/\/(.*)\:(\d+)/i)[0] + '/' + hashID;
        }, 500);
    };

    // Set up all things Autocomplete
    var _initAutoComplete = function() {
        var $autocomplete = $('#autocomplete');
        // Init jQuery-UI's autocomplete
        $autocomplete.autocomplete({
            source: _styleguideComponents,
            appendTo: '.js-living-style-guide-search'
        });

        // Bind Autocomplete submission
        var $searchForm = $('#component-search-form');
        $searchForm.on('submit', function(e) {
            e.preventDefault();
            var searchTerm = $autocomplete.val();
            if (searchTerm !== '') {
                // Transform search term to a component's ID
                searchTerm = '#' + searchTerm.trim().toLowerCase().replace(' ', '-');

                // Only proceed if a component match is found in the DOM
                if ($(searchTerm).length > 0) {
                    // Signal to close Pinny
                    setTimeout(function() {
                        $('body').trigger('mobify:close-toc');
                    });

                    // Reset field val
                    $autocomplete.val('');

                    // Scroll to specific component
                    _setUrlHash(searchTerm);
                } else {
                    console.log('Cannot find component: ' + searchTerm);
                }
            }
        });

        // Bind selection of Autocomplete entries
        var $autocompleteList = $('.ui-autocomplete').addClass('living-style-guide__autocomplete');
        $autocompleteList.on('click', '.ui-menu-item', function() {
            setTimeout(function() {
                $searchForm.submit();
            });
        });
    };

    // Populate a data context object for the entries in the Table of Contents
    //  Also populate a list of all components for Autocomplete to match against
    var _buildListData = function($items) {
        var items = $items.map(function(index, item) {
            var $item = $(item);
            var id = $item.attr('id');
            var title = id.split('-');
            var name = '';

            // Don't build item if there's no ID
            if (!id.length) {
                return;
            }

            for (var i = 0; i < title.length; i++) {
                var text = title[i];

                // Capitalize each word
                name += text.substr(0, 1).toUpperCase() + text.substr(1) + ' ';
            }

            if (_styleguideComponents.findIndex(function(elem) { return elem === name; }) === -1) { // Check if this component is already in the list
                _styleguideComponents.push(name);
            }

            return {
                body: name,
                href: '#' + id
            };
        });

        return {
            items: items
        };
    };

    // Render out the full Styleguide template
    var container = document.querySelector('#living-style-guide');

    styleguideTmpl(context, function(err, out) {
        if (err) {
            console.log('error:', err);
            return;
        }

        // Insert the compiled `styleguide.dust` into the document
        container.innerHTML = out;

        // Prevent anchor tags from triggering default behavior
        $('a[href="#"]').on('click', function(event) {
            event.preventDefault();
        });

        var $tocPinny = $('#tableOfContents');
        // Init Table of Contents Pinny
        $tocPinny.pinny({
            effect: sheetRight,
            coverage: '80%',
            structure: {
                header: false,
                footer: false
            }
        });

        // Bind Table of Contents open button
        $('.js-toc-trigger').on('click', function() {
            $tocPinny.pinny('open');
        });

        // Close Table of Contents and jump to component
        $('body').on('click', '.js-component-anchor', function(e) {
            var hashID = $(this).attr('href');

            e.preventDefault();

            $tocPinny.pinny('close');

            _setUrlHash(hashID);
        });

        // Listen for close events
        $('body').on('mobify:close-toc', function() {
            $tocPinny.pinny('close');
        });

        // Build Table of Contents list
        var $items = $('body').find('.living-style-guide__item');
        var $tocContainer = $('.js-toc-content');
        var listData = _buildListData($items);

        // Render Table of Contents list items
        tableOfContentsTmpl(listData, function(error, out) {
            $tocContainer.html(out);

            // Now that components list is populated, set up Autocomplete
            _initAutoComplete();
        });
    });
}, undefined, true);
// relPath, forceSync
