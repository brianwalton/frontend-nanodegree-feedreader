/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('All feed element URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All feed element NAMEs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', function() {
            //  http://stackoverflow.com/questions/21987596/get-css-transform-property-with-jquery
            var x = parseInt($('div.slide-menu').css('transform').split(',')[4]);
            expect(x).toBeLessThan(0);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        describe('Menu changes visibility', function(done) {
            // Use the asynchronous simulation pattern to enter a click
            // then wait for 1 second to give the DOM elements a chance to
            // update with the new transform: transition values.
            beforeEach(function(done) {
                $('.menu-icon-link').trigger("click");
                setTimeout(function() {
                    done();
                }, 1000);
            });

            // After click and a delay. Transition value should be updated now.
            it('Menu shows on first menu click', function() {
                var x = parseInt($('div.slide-menu').css('transform').split(',')[4]);
                expect(x).toBeDefined();
                // Check that menu is on-screen
                expect(x).toBe(0);
            });

            // Another click and a delay. Transition values should be updated again.
            it('Menu does not show on next menu click', function() {
                var x = parseInt($('div.slide-menu').css('transform').split(',')[4]);
                expect(x).toBeDefined();
                // Check that menu is off-screen
                expect(x).toBeLessThan(0);
            });
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var containerLinkCount;
        beforeEach(function(done) {
            // Empty the current entries from the container
            $('div.feed').empty();
            //  Save the current link count.  Should all have been removed.
            containerLinkCount = $('div.feed a').length;
            loadFeed(1, function() {
                done();
            });
        });

        it('loadFeed adds at least one entry to feed container', function(done) {
            // Check that the container was empty before
            expect(containerLinkCount).toBeDefined();
            expect(containerLinkCount).toBe(0);
            // Get the new count of the links that were loaded
            var newLength = $('div.feed a').length;
            expect(newLength).toBeDefined();
            expect(newLength).toBeGreaterThan(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var beforeHref;
        beforeEach(function(done) {
            // Copy the link from the first element in the current feed list
            // then load a new feed.
            beforeHref = $('div.feed a:first').attr('href');
            loadFeed(2, function() {
                done();
            });
        });

        it('loadFeed actually changes content', function(done) {
            // Make the old first link was collected in beforeEach
            expect(beforeHref).toBeDefined();
            expect(beforeHref.length).toBeGreaterThan(0);
            // Get the new first link.  They should be different
            var afterHref = $('div.feed a:first').attr('href');
            expect(afterHref).toBeDefined();
            expect(afterHref.length).toBeGreaterThan(0);
            expect(beforeHref === afterHref).toBe(false);
            done();
        });
    });

}());
