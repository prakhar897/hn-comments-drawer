// Create a function that fetches comments and displays them
async function displayHNComments(
	storyId,
	rootElement,
	options
) {
	try {	
		rootElement.innerHTML = ""

		const story = await fetchItemFromHN(storyId)
		if (!story.kids || story.kids.length === 0) {
			rootElement.innerHTML = "No comments found.";
			return;
		}

		rootElement.innerHTML += renderCommentsHeader(story.id, story.title)
		const commentsWrapper = rootElement.appendChild(document.createElement("ul"));
		commentsWrapper.classList.add("comments-list")
		commentsWrapper.style.marginRight = 0 * 20;

		const commentIds = story.kids 
		await createCommentListElement(commentIds,rootElement,0,options.maxDepth)

		rootElement.innerHTML += renderCommentsFooter()
		
	} catch (error) {
		console.error("Error fetching comments:", error);
		commentsDrawer.innerHTML = "Error fetching comments.";
	}
}


async function fetchItemFromHN(itemId){
		const res = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
		);
		const item = await res.json();
		return item;
}

function renderCommentsHeader(storyId, title){
	return `
		<div id="hn-comments-drawer-heading" class="hn-comments-drawer-heading">
		Comments On this post :
		<a href="https://news.ycombinator.com/item?id=${storyId}" target="_blank">
			${title}
		</a>
		</div>
		`;
}
function renderCommentsFooter(){
	return `<div id="hn-comments-drawer-footer" class="hn-comments-drawer-footer">
		<span>This comment section is powered by </span><a href="https://github.com/prakhar897/hn-comments-drawer" target="_blank"> hn-comments-drawer ${renderGithubLogo()}</a>
	</div>`;
}

async function createCommentListElement(commentIds,parentElement, depth, maxDepth = 10){
	const commentsWrapper = parentElement.appendChild(document.createElement("ul"));
	commentsWrapper.classList.add("comments-list")
	commentsWrapper.style.marginRight = depth * 20;

	console.log({maxDepth,depth})
	if(depth >= maxDepth) return;

	for(const commentId of commentIds){
		await createCommentElement(commentId,commentsWrapper,depth+1,maxDepth);
	}
}

async function createCommentElement(commentId, parentElement, depth, maxDepth){

	const comment = await fetchItemFromHN(commentId)

	if(comment == null || comment.deleted) return false;

	const commentElement = document.createElement("li");
	commentElement.innerHTML = `
	<div class="comment-header comment-author">${comment.by}</div>
	<div class="comment-body comment-text">${comment.text}</div>
	`
	parentElement.appendChild(commentElement)

	if(comment.kids && comment.kids.length > 0){
		createCommentListElement(comment.kids,commentElement,depth+1,maxDepth)	
	}
	
}


function renderGithubLogo(){
	return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
}


document.addEventListener("DOMContentLoaded", function (event) {
	const hnCommentsDrawers = document.querySelectorAll(
		'[hn-story-id]'
	);

	hnCommentsDrawers.forEach(async (drawer) => {

		const attr = (attrName)=>drawer.getAttribute(attrName)
		const storyId = attr("hn-story-id")


		console.log( typeof  attr("hn-max-depth"))
		const maxDepth = typeof attr("hn-max-depth") === "string" ? parseInt( attr("hn-max-depth")) : 10;

		displayHNComments(storyId, drawer, {
			maxDepth
			
		});
	});
});
