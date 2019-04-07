# How to Test Our App

### Anonymous User Functionality
###### 1. Test Anonymous Home Screen
* Go to the Web app [URL](https://rocky-shore-19700.herokuapp.com/)
* You should see the **home screen** and verify the following:
  * App Name ("Husky Movie") and app description are shown.
  * The upper right nav bar should shown the options to "Sign Up" or "Login" since you haven't done so yet
  * You should see some of the most recent activity other users have taken. The content is labeled as such: "Recent Activity By Users". If you were logged in, you would see the label "Your Recent Activity" with activity that is specific to you.
    * In the "**Most Recently Liked Movies**" section, you should see up to 3 most recently liked movies by non-anonymous users. Clicking on the name of the movie takes you to the movie details for that movie (this section will be covered later, so just go back to the home screen after verifying).
    * In the "**Most Recently Reviewed Movies**" section, you should see up to 3 most recently reviewed movies by non-anonymous users. Clicking on the name of the movie takes you to the movie details for that movie (again, go back to the home screen after verifying).
    * In the "**Newest Users**" section, you should see up to 3 most recently registered users. The "C" icon is for Critics, the "M" icon is for Movie Goers. Clicking on the user's username take you to their profile page (again, go back to the home screen after verifying).
   
###### 2. Test Search
  * Under the "Find a Movie" section, enter "A Star Is Born" in the search field and press the green button to search.
  * You should be taken to the search results page
     * Various movies that have the "A Star is Born" in the title should be displayed here (~15)
     * Click on the first movie in the list ("A Star is Born" from 2018). Continue with the next section to test the Movie Details view that appears.
  * In a separate window, test getting these results from URL that includes query parameters [https://rocky-shore-19700.herokuapp.com/search/keyword?a%20star%20is%20born](https://rocky-shore-19700.herokuapp.com/search/keyword?a%20star%20is%20born)
###### 3. Test Movie Details Page
  * Continue from the previous step or access the movie details for "A Star is Born" from [here](https://rocky-shore-19700.herokuapp.com/details/tt1517451). You should see:
     * Movie Poster and a variety of movie details
     * A "Like" button. If you try to click it you will receive an alert that this feature is only for logged in users.
     * Likes section: all users who have liked the movie are displayed here. You can click on their usernames to access their profiles.
     * Reviews section: 
       * In the "By Others" you should see a series of reviews on the movie.
       * In the "By Me" section, you should see a message that this feature is only for logged in users with buttons to access Login and Register pages.
  
###### 4. Test [Updates page](https://rocky-shore-19700.herokuapp.com/update)
  * Click on the "Updates" page. You should see a message that this is only for logged in users.
  
###### 5. Test Users Page + Profile Pages
  * Click on the "Users" tab on the nav bar. You should see all users in the database listed.
  * Find user "alice"
    * alice has the critic role so she should have a "C" icon and "(Critic)" displayed after her username.
    * Click on alice's username to arrive at her *Profile*
       * alice's profile should have her username at the top ("alice")
       * Below the username, her self-descrition and email should be shown (no other personal information is provided)
       * Alice's content (all are clickable to go to the details view for that content)
         * all reviews by alice are shown
         * all movies alice has liked are listed
         * "Followers" which includes all users that follow alice.
  * Find user "bob"
      * bob is a movie goer so he should have a "M" icon and "(Movie Goer)" displayed after his username.
      * Click on bob's username to arrive at his *Profile*. Bob's profile should look similar to alice's with a few exceptions:
         * No followers section.
         * "Critics Followed" section which includes all critics that bob follows.

### Registration/Login/Logout/Profile
###### 1. Test Login Error Handling
  * Go to [Login page](https://rocky-shore-19700.herokuapp.com/login)
  * Enter invalid credentials - username: notreal, password: notreal
    * You should receive an error message that your username/password are not correct
###### 2. Test Register Error Handling
  * Go to the [Sign Up page](https://rocky-shore-19700.herokuapp.com/register)
  * Try to register without matching passwords - username: badpasswords, password1: one, password2: two
    * You should receive an passwords do not match error
  * Try to register with an existing user - username: alice, password: alice
    * You should receive a username is already taken error
###### 3. Test Successful Register
   * Register with username: grader, password: grader, email: grader@gmail.com, role: Movie Goer. You can enter the other details as you please.
     * You should be taken to the home screen of the app
     * You should see your username in the upper righthand corner of the nav bar (the login/register buttons no longer appear there as they used to)
   * Stay logged in for the next step
###### 4. Test Profile
   * As a logged in user, tap the carrot next to your username open a dropdown menu with the options: "Profile" and "Logout".
     * Can also be accessed via URL once logged in [here](https://rocky-shore-19700.herokuapp.com/profile)
   * Select "Profile"
     * Ensure your username appears in large font at the top of the screen
     * Below, ensure that any data you entered during the registration step is shown under the appropriate section (for example, grader@gmail.com is shown under the email section if you followed the directions).
   * Update Profile
     * Provide a new value in one of the fields and then click "Update". You should see a green toast message indicating your info was saved. Go click on another page and come back to verify it was saved or logout/back in again.
   * Recent Data
     * Since you are a new user, you shouldn't have any recent activity yet so there should be some explanatory text under the bottom sections of the page saying you don't have reviews, likes, or follow any critics.
###### 5. Test Logout
   * Select the dropdown next to your username in the nav bar again and this time select "Logout".
      * You should again see the "Login" and "Register" buttons on the nav and the anonymous home screen.
###### 6. Test Successful Login
   * Click Login in the upper right hand corner of the screen and login with the account you just created - username: grader, password: grader.
      * You should be taken to the home screen and see your username in the upper right corner of the nav bar.

### Functionality for Logged-In Users
* Login as bob (username: bob, password: bob). Below are the features you should test that are only available for logged in users. These feature are available for both the Critic Role and Movie Goer role so it doesn't matter what role alice is for the time being.
###### 1. View User-Specific Home Screen content
* Rather than the most recent content for all users, you should now see the most recent likes and reviews only for bob on the home screen.
###### 2. Liking a movie
* Get to a movie details page for a movie bob has not yet liked - [Harry Potter and the Half Blood Prince](https://rocky-shore-19700.herokuapp.com/details/tt0417741)
   * You should see a Like button. Click it and notice the button changes state and bob is added to the "Likes" section of the details page.
   * Click the button again to remove like. Notice the button changes and alice is removed from the "Likes" section.
###### 3. Reviewing a movie
* A user can only review a movie once, so find the movie details of a movie bob has not yet reviewed - [Harry Potter and the Half Blood Prince](https://rocky-shore-19700.herokuapp.com/details/tt0417741)
  * Enter a review for the movie and submit, notice it appear in the "By Me" Review section
  * Edit the Review
  * Delete the review
###### 4. Viewing Updates from Critics you follow
* Go to the [Updates Tab](https://rocky-shore-19700.herokuapp.com/update) in the upper left of the Nav Menu
* Observe updates posted from Critics bob follows

### Movie Critic-Only Functionality
* Login as alice (username: alice, password: alice).
###### 1. Test Updates
  * As a critic, you can post updates to your followers
  * Click on the "My Updates" Tab in the upper right of the Nav Bar (this is only shown for Critics)
     * You should see a few updates that have been previously enterred by you
     * You should be able to delete an update
     * You should be able to enter a new update
