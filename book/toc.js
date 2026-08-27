// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Part 1: Opening</li><li class="chapter-item expanded "><a href="01.html"><strong aria-hidden="true">1.</strong> Don&#39;t Change Anything Yet</a></li><li class="chapter-item expanded "><a href="02.html"><strong aria-hidden="true">2.</strong> The Two Monsters</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 2: Illusion-Dismantling</li><li class="chapter-item expanded "><a href="03.html"><strong aria-hidden="true">3.</strong> Why Certainty Feels Like Proof</a></li><li class="chapter-item expanded "><a href="04.html"><strong aria-hidden="true">4.</strong> The Relief That Isn&#39;t Yours to Take Credit For</a></li><li class="chapter-item expanded "><a href="05.html"><strong aria-hidden="true">5.</strong> The Understanding You&#39;re Actually After</a></li><li class="chapter-item expanded "><a href="06.html"><strong aria-hidden="true">6.</strong> The Two Doors That Aren&#39;t There</a></li><li class="chapter-item expanded "><a href="07.html"><strong aria-hidden="true">7.</strong> The Loudest Version Isn&#39;t the Truest One</a></li><li class="chapter-item expanded "><a href="08.html"><strong aria-hidden="true">8.</strong> What Weak Actually Looks Like</a></li><li class="chapter-item expanded "><a href="09.html"><strong aria-hidden="true">9.</strong> Being Upset Doesn&#39;t Buy You a Free Pass</a></li><li class="chapter-item expanded "><a href="10.html"><strong aria-hidden="true">10.</strong> The Last-Chance Lie</a></li><li class="chapter-item expanded "><a href="11.html"><strong aria-hidden="true">11.</strong> Why You Do It Again Even Though You Already Know Better</a></li><li class="chapter-item expanded "><a href="12.html"><strong aria-hidden="true">12.</strong> Borrowed Anger</a></li><li class="chapter-item expanded "><a href="13.html"><strong aria-hidden="true">13.</strong> The Crowd Changes the Math</a></li><li class="chapter-item expanded "><a href="14.html"><strong aria-hidden="true">14.</strong> When They Really Are Wrong</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 3: Reframe</li><li class="chapter-item expanded "><a href="15.html"><strong aria-hidden="true">15.</strong> What the Trigger Will Look Like Next Time</a></li><li class="chapter-item expanded "><a href="16.html"><strong aria-hidden="true">16.</strong> Composure Without a Fight</a></li><li class="chapter-item expanded "><a href="17.html"><strong aria-hidden="true">17.</strong> Immune to the Contagion</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 4: Liberation</li><li class="chapter-item expanded "><a href="18.html"><strong aria-hidden="true">18.</strong> Nothing Was Ever at Stake by Waiting</a></li><li class="chapter-item expanded "><a href="19.html"><strong aria-hidden="true">19.</strong> The Closing Ritual — Watching It From Outside</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
