// Create a function that fetches comments and displays them
async function displayHNComments(
	storyId,
	commentsDrawer,
	options = { maxDepth: 100, styling: null }
) {
	try {
		// Fetch story details from the Hacker News API
		const storyResponse = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
		);
		const storyData = await storyResponse.json();

		if (!storyData.kids || storyData.kids.length === 0) {
			commentsDrawer.innerHTML = "No comments found.";
			return;
		}

		commentsDrawer.innerHTML += `
    <div id="hn-comments-drawer-heading" class="hn-comments-drawer-heading">
      Comments On this post :
      <a href="https://news.ycombinator.com/item?id=${storyId}">
        ${storyData.title}
      </a>
    </div>
    `;

		// Show loading spinner
		commentsDrawer.innerHTML += `
    <div class="comments-loading">
      Comments Loading , Please wait...
    </div>
  `;

		const comments = storyData.kids;
		const commentsHTML = await createCommentsHTML(comments, options);

		// Remove the loading spinner after commentsHTML has been created
		const loadingSpinner =
			commentsDrawer.querySelector(".comments-loading");
		if (loadingSpinner) {
			loadingSpinner.remove();
		}

		// Display comments in the comments drawer element
		commentsDrawer.innerHTML += commentsHTML;

		commentsDrawer.innerHTML += `<div id="hn-comments-drawer-footer" class="hn-comments-drawer-footer">
    <span>This comment section is powered by </span><a href="https://github.com/prakhar897/hn-comments-drawer"> Hn-comments-drawer <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
  </div>`;

		// Add basic styles for comments dynamically
		if (options.styling == "default") {
			addDefaultStyles();
		}
	} catch (error) {
		console.error("Error fetching comments:", error);
		commentsDrawer.innerHTML = "Error fetching comments.";
	}
}

// Create a recursive function to generate HTML for comments
async function createCommentsHTML(comments, options, depth = 0) {
	let html = `<ul class="comments-list" style="margin-left: ${
		depth * 20
	}px;">`;

	for (const commentId of comments) {
		try {
			const commentResponse = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
			);

			const commentData = await commentResponse.json();

			if (
				commentData == null ||
				(commentData.deleted && commentData.deleted == true)
			) {
				continue;
			}

			html += `<li>
        <div class="comment-header">(${commentData.by})</div>
        \n
        <div class="comment-text">${commentData.text} </div>`;

			if (
				commentData.kids &&
				commentData.kids.length !== 0 &&
				depth < options.maxDepth
			) {
				html += await createCommentsHTML(
					commentData.kids,
					options,
					depth + 1
				);
			}

			html += `</li>`;
		} catch (error) {
			console.error(
				"Error fetching comments:" +
					error +
					" for comment id:" +
					commentId
			);
			html += `<li>Error fetching comments.</li>`;
		}
	}

	html += "</ul>";

	return html;
}

// Function to add basic styles for comments dynamically
function addDefaultStyles() {
	// Create a style element
	const styleElement = document.createElement("style");

	// Define your styles
	const styles = `
    
    .hn-comments-drawer {
      list-style-type: none;
      margin-left: 0;
      padding-left: 20px;
      border: 2px solid red;
      margin-top: 50px;
      margin-bottom: 50px;

    }

    .hn-comments-drawer-heading{
      color: red;
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

    .comment-text p {
      color:blue;
    }

    .hn-comments-drawer-footer{
      color: gray;
    }

	.comments-loading {
		text-align: center;
		padding: 2rem;
	  }
	  
    
  `;

	// Set the styles within the style element
	styleElement.innerHTML = styles;

	const headElement = document.querySelector("head");
	if (headElement) {
		headElement.insertBefore(styleElement, headElement.firstChild);
	} else {
		console.error("<head> element not found.");
	}
}

// Handles Id to Attributes Conversion
async function idToAttributes(id) {
	const attributesList = id.split(" ");
	const attributes = {};

	for (let i = 0; i < attributesList.length; i++) {
		const attribute = attributesList[i];
		const [key, value] = attribute.split("-");
		if (key && value) {
			if (key == "hn" && value == "comments") {
				continue;
			} else {
				attributes[key] = isNaN(value) ? value : parseInt(value);
			}
		}
	}

	return attributes;
}

// Automatically find and display Hacker News comments on load
document.addEventListener("DOMContentLoaded", function (event) {
	const hnCommentsDrawers = document.querySelectorAll(
		'[id^="hn-comments-drawer"]'
	);

	hnCommentsDrawers.forEach(async (drawer) => {
		const attributes = await idToAttributes(drawer.id);

		displayHNComments(attributes.storyId, drawer, {
			maxDepth: attributes.maxDepth,
			styling: attributes.styling,
		});
	});
});
