// Create a function that fetches comments and displays them
function displayHNComments(storyId) {
	const commentsDrawer = document.getElementById(
		`hn-comments-drawer-${storyId}`
	);

	// Check if the comments drawer element exists
	if (!commentsDrawer) {
		console.error(
			`Element with ID "hn-comments-drawer-${storyId}" not found.`
		);
		return;
	}

	// Fetch comments from the Hacker News API (Assuming you have the API endpoint)
	fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
		.then((response) => response.json())
		.then((data) => {
			if (!data.kids || data.kids.length === 0) {
				commentsDrawer.innerHTML = "No comments found.";
				return;
			}

			const comments = data.kids;
			const commentsHTML = createCommentsHTML(comments);

			// Display comments in the comments drawer element
			commentsDrawer.innerHTML = commentsHTML;
		})
		.catch((error) => {
			console.error("Error fetching comments:", error);
			commentsDrawer.innerHTML = "Error fetching comments.";
		});
}

// Create a function to generate HTML for comments
function createCommentsHTML(comments) {
	let html = '<ul class="comments-list">';

	comments.forEach((commentId) => {
		fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.by);
				html += `<li>(${commentId}) - ${data.text}`;
				if (data.kids && data.kids.length !== 0) {
					const comments = data.kids;
					const commentsHTML = createCommentsHTML(comments);
				}
			})
			.catch((error) => {
				console.error("Error fetching comments:", error);
				commentsDrawer.innerHTML = "Error fetching comments.";
			});
	});

	html += "</ul>";
	return html;
}

// Automatically find and display Hacker News comments on load
document.addEventListener("DOMContentLoaded", function (event) {
	const hnCommentsDrawers = document.querySelectorAll(
		'[id^="hn-comments-drawer"]'
	);

	hnCommentsDrawers.forEach((drawer) => {
		const storyId = drawer.id.split("hn-comments-drawer-")[1];
		displayHNComments(storyId);
	});
});
