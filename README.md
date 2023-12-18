# Hacker News Comments Drawer (hn-comments-drawer)

Performance optimised version of the [Hacker News Drawer by prakhar897](https://github.com/prakhar897/hn-comments-drawer/)

## Demo

[New Performance](https://hn-comments-drawer.vercel.app/examples)

[Old Performance](https://prakgupta.com/misc/hn-comments-drawer-demo)


![Screenshot of the product](https://raw.githubusercontent.com/prakhar897/hn-comments-drawer/main/screenshot.png)

## Features

-   Display HN comments using a single line of code.
-   Customizable styling for comments.
-   Options to vary stuff.

## Usage

1.  Include this snippet in your HTML document:

    `<script src="https://hn-comments-drawer.vercel.app/src/script.js"></script>`

2.  Create an HTML element where you want to display the comments. Use the following format for the ID:

        <div
            class="hn-comments-drawer"
            hn-story-id="38300167">
        </div>

    Replace `38300167` with the actual ID of the Hacker News story for which you want to display comments.

## Docs

-   Add maxDepth of comments:

        <div
            class="hn-comments-drawer"
            hn-story-id="38300167"
            hn-max-depth="30">
        </div>

-   Add default styling:

       		<link rel="stylesheet" href="https://hn-comments-drawer.vercel.app/src/default.css"  />


## Styling

Customize the styling of the comments by modifying the provided CSS classes in your own stylesheet:

    /* Example of provided CSS classes for comments */

    .hn-comments-drawer {
      list-style-type: none;
      margin-left: 0;
      padding-left: 20px;
      border: 2px solid red;
      margin-top: 50px;
      margin-bottom: 50px;

    }

    .hn-comments-drawer-heading{
      border: 2px solid red;
    }

    .comments-list {
      list-style-type: none; /* Remove default list-style dots */
      padding-left: 0; /* Remove default padding */
    }

    .comments-list li {
      border-left: 2px solid #ccc; /* Adjust thickness and color as needed */
      padding-left: 10px; /* Adjust left padding for spacing */
      margin-left: 5px; /* Adjust margin for spacing */
      margin-top: 20px;
    }

    .comment-text {
      color: red;
    }

    .comment-header {
      color:blue;
    }

    .comments-loading {
    	text-align: center;
    	padding: 2rem;
    }

## Examples

You can find examples in the `examples` folder.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/prakhar897/hn-comments-drawer/LICENSE) file for details.
