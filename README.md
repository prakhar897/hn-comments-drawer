# Hacker News Comments Drawer (hn-comments-drawer)

Integrate Hacker News comments and display them beautifully within your websites.

[See Discussion on this](https://news.ycombinator.com/item?id=38597301)

## Demo

[Live Demo 1](https://softwaredesign.ing/misc/hn-comments-drawer-demo)

[Live Demo 2](https://softwaredesign.ing/blog/moving-away-from-substack)

![Screenshot of the product](https://raw.githubusercontent.com/prakhar897/hn-comments-drawer/main/screenshot.png)

## Features

-   Display HN comments using a single line of code.
-   Customizable styling for comments.
-   Options to vary stuff.

## Usage

1.  Include this snippet in your HTML document:

    `<script src="https://cdn.jsdelivr.net/gh/prakhar897/hn-comments-drawer@latest/src/script.js"></script>`

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

       		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/prakhar897/hn-comments-drawer@latest/src/default.css"  />

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
