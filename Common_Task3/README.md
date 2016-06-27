## This is Task 3 of WebDev Inductions 2016
### Overview of the task
    The task was to create a basic registration, and login website.
    The basic mode has 2 functions
* Register a member
* Login that member to a page showing the entered details

    The advanced mode included the following:-
* [X] Search for other registered users.
* [X] Use AJAX for form submission.
* [X] User must be able to update his details.

### Features implemented
- Registration of a new user using AJAX for requests. Username, phone and email are unique for each user.
- Secure login for users. Blocked all access of other pages.
- Prevented SQL Injection.
- Update details such as password and profile picture.
- Search for other users, with hints popping up using AJAX. Clicking on hint shows their profile.
- Each registered user has a separate profile page that can be viewed by all registered users.
- Configured Apache Engine using .htaccess to block access to few PHP Pages.

### List of Server Routes
    The list of server routes is as follows:-
* POST /index.php (Through AJAX)
* POST /register.php (Through AJAX)
* POST /search.html (Through AJAX)
* POST /update.php (Through AJAX)

### Tables used in the database
The database is a MySQL database. The db name here is **delta_2016**
<br/>
<br/>
The table name used is **delta_2016_3**
<br/>
<br/>
The table consists of 5 columns. The type, and name are as follows:-
<table>
<tr>
<td>Row Name</td>
<td>Username</td>
<td>Phone</td>
<td>Email</td>
<td>Password</td>
<td>Picture</td>
</tr>
<tr>
<td>Type Of Value Stored</td>
<td>VARCHAR(100)</td>
<td>BIGINT</td>
<td>VARCHAR(100)</td>
<td>TEXT</td>
<td>TEXT</td>
<tr/>
<tr>
<td>Attributes</td>
<td>PRIMARY KEY</td>
<td>UNIQUE, NOT NULL</td>
<td>UNIQUE, NOT NULL</td>
<td>NOT NULL</td>
<td>NOT NULL</td>
</tr>
</table>
<br/>
<br/>
### Build Instructions
> The website uses **WAMP Server**, which is used for running PHP Code, in Windows.
> The first step is to download it if it is not present in your workspace.
<br/>
<br/>
> For windows users,the link for the download can be found [HERE](http://www.wampserver.com/en/)
> Since WAMP is available only in Windows, an alternative could be XAMPP.
> Mac OS, and Linux users can click on [THIS](https://www.apachefriends.org/download.html) link 
> to download XAMPP in their respective devices.
<br/>
<br/>
> After installation, start the server by clicking on the exe file(Windows).
> The username is **root** and the password is *Cjul1968ScB*. This is to ensure compatibility with the
> code written by me.
<br/>
<br/>
> Download all the files and save them in a folder name *Delta_2016_3*.
> Save that folder in the **www** folder created during installation. By default, it is in C:/wamp64/www/
<br/>
<br/>
> Start your favourite browser.
> Type in *http://localhost/Delta_2016_3/* in the box provided.
<br/>
<br/>
> Enjoy using my website. :smiley: