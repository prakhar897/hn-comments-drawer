# Hacker News Comments Drawer (hn-comments-drawer)

Integrate Hacker News comments and display them beautifully within your websites.

## Features

-   Display HN comments using a single line of code.
-   Customizable styling for comments.
-   Options to vary stuff.

## Usage

1. Include this snippet in your HTML document:
   `<script src="https://cdn.jsdelivr.net/gh/prakhar897/hn-comments-drawer@main/src/script.js"></script>`

2. Create an HTML element where you want to display the comments. Use the following format for the ID:
 <div
 id="hn-comments-drawer storyId-38300167 max-depth-3"
 class="hn-comments-drawer"> 
 </div>
 Replace `38300167` with the actual ID of the Hacker News story for which you want to display comments.

## JavaScript Integration

    // Fetch and display Hacker News comments for a specific story ID

    displayHNComments(storyId);

Replace `storyId` with the actual ID of the Hacker News story for which you want to fetch comments.

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

## Examples

    <!DOCTYPE html>
    <html lang="en">
    	<head>
    		<meta charset="UTF-8" />
    		<title>Hacker News Comments</title>
    		<style>
    			.hn-comments-drawer {
    				border: 10px solid blue;
    			}
    		</style>
    	</head>
    	<body>
    		<h1>Hacker News Comments</h1>

    		<!-- Create multiple comment drawers with different story IDs -->
    		<h2>Story 1 Comments</h2>
    		<div
    			id="hn-comments-drawer storyId-38300167 max-depth-3"
    			class="hn-comments-drawer"
    		></div>

    		<!-- <h2>Story 2 Comments</h2>
    	<div id="hn-comments-drawer-38348010"></div> -->

    		<!-- Automatically load comments -->
    		<!-- <script src="../src/script.js"></script> -->
    		<script src="https://cdn.jsdelivr.net/gh/prakhar897/hn-comments-drawer/src/script.js"></script>
    	</body>
    </html>

You can find more examples in `examples` folder.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/prakhar897/hn-comments-drawer/LICENSE) file for details.
