# Living Style Guide

For detailed documentation on the benefits and how-to's, see our [official Living Style Guide documentation](https://mobify.atlassian.net/wiki/display/LT/Working+with+a+Living+Style+Guide).

## Viewing the Living Style Guide
1. Run `grunt preview` or `grunt styleguide`
2. Visit `http://localhost:4444` in a browser

## File Description

`index.html`

The browser's entry point into the Living Style Guide. This is boilerplate code that ensures that stylesheets and JS is loaded, as well as providing placeholder markup to be replaced by the Living Style Guide markup. This file does not require any modifications.

`living-style-guide.dust`

Boilerplate dust template, it is where the overall Living Style Guide structure and design is maintained. This file does not require any modifications.

`living-style-guide-components.dust`

This dust template is where project components are showcased with their static mock data. This is the real 'meat' of the Living Style Guide: all components in a project should be included here.

`data/`

This is where the Living Style Guide specific mock data is stored. Data files return a pre-populated JSON data context object that matches with it's designated component. A good practice is to demonstrate all variations of each component by returning a context containing arrays of data which highlight all possible visual states.

`context.js`

This is the Living Style Guide's view file. All data files from `data/` are required in and assigned to key-value pairs based on their designated component, thus forming the Living Style Guide's complete data context.

`config.js`

This is a standard require.js config file that paths out all the Living Style Guide's dependencies so they may be required in correctly.

`ui.js`

This file is responsible for the Living Style Guide's UI scripts and interactions, which include:

- Taking the completed Living Style Guide data context from `context.js` and using it to render out the full Living Style Guide template and its contents
- Setting up the Table of Contents component directory, its [Pinny](https://github.com/mobify/pinny), and all necessary event bindings
- Setting up the Table of Content's search autocomplete functionality

`table-of-contents.dust`

This is the dust template for the Table of Contents component directory. This is also boilerplate that won't be modified much. It is kept as a separate template because its contents are dynamically generated and rendered in `ui.js`.

`living-style-guide.scss`

This is the parent stylesheet for the Living Style Guide's base theme. This file should not color the project components in any way.

`build/`

This is where the Living Style Guide is built into when `grunt styleguide` or `grunt preview` is run. It is ignored from git changes.
