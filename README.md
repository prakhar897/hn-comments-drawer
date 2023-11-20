
  

# Hacker News Comments Drawer (hn-comments-drawer)

  

A JavaScript library designed to fetch and display comments from Hacker News stories in a threaded format within HTML elements on a webpage. This library enables users to effortlessly integrate Hacker News comments for specific stories and display them beautifully within their own websites.

  

## Features

  

- Display HN comments using a single line of code.

- Customizable styling for comments.

  

## Usage

  

1. Include this snippet in your HTML document:
`<script src="path_to_hn-comments.js"></script>`

  
  

2. Create an HTML element where you want to display the comments. Use the following format for the ID:
`<div id="hn-comments-drawer-story-id"></div>`
Replace `story-id` with the actual ID of the Hacker News story for which you want to display comments.

  
  

## JavaScript Integration

 

  

    // Fetch and display Hacker News comments for a specific story ID
    
    displayHNComments(storyId);

  

Replace `storyId` with the actual ID of the Hacker News story for which you want to fetch comments.

  

## Styling

  

Customize the styling of the comments by modifying the provided CSS classes in your own stylesheet:

    `/* Example of provided CSS classes for comments */
    
    .comments-list {
    
    list-style-type: none;
    
    margin-left: 0;
    
    padding-left: 20px;
    
    }

	.comments-list li {

	margin-bottom: 10px;

	}

  

## Example

	<!DOCTYPE  html>

	<html  lang="en">

	<head>

	<meta  charset="UTF-8">

	<title>Hacker News Comments</title>

	<script  src="path_to_hn-comments.js"></script>

	<style>  /* Add custom styles for comments */

	/* ... */  </style>

	</head>

	<body>

	<h1>Hacker News Comments</h1>

	  

	<!-- Create an element to display comments for a story -->

	<div  id="hn-comments-drawer-12345"></div>

	  

	<!-- Load comments on page load -->

	<script>   </script>

	</body>

	</html>

  

You can find more examples in `examples` folder.

  

## Contributing

  

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements or bug fixes.

  

## License

  

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.