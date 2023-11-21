// Create a function that fetches comments and displays them
async function displayHNComments(
	storyId,
	commentsDrawer,
	options = { maxDepth: 100 }
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

		const comments = storyData.kids;
		const commentsHTML = await createCommentsHTML(comments, options);

		// Display comments in the comments drawer element
		commentsDrawer.innerHTML = commentsHTML;

		// Add basic styles for comments dynamically
		addDefaultStyles();
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

// Automatically find and display Hacker News comments on load
document.addEventListener("DOMContentLoaded", function (event) {
	const hnCommentsDrawers = document.querySelectorAll(
		'[id^="hn-comments-drawer"]'
	);

	hnCommentsDrawers.forEach((drawer) => {
		const storyId = drawer.id.split(" ")[1].split("-")[1];
		displayHNComments(storyId, drawer, { maxDepth: 100 }); // Customize maxDepth value as needed
	});
});
