<!doctype html>
<html lang="de">
	<head>
		<title>Reistrierung</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="style.css" >
		<script language="javascript" type="text/javascript" src="nav.js"></script>
	</head>
	<body>
		<header>
			<?php include("menu.inc.php"); ?>
		</header>
		<main>
			<div style="padding: 5em 3em 3em 3em;">
				<form action="">
					<label for="fname">Vorname</label>
					<input type="text" id="fname" name="firstname" placeholder="Dein Vorname...">

					<label for="lname">Nachname</label>
					<input type="text" id="lname" name="lastname" placeholder="Dein Nachname...">
					
					<label for="email">Email</label>
					<input type="text" id="email" name="email" placeholder="Deine E-Mail Adresse...">
					
					<label for="passwort">Passwort</label>
					<input type="text" id="passwort" name="passwort" placeholder="Dein Passwort...">
					
					<label for="passwort2">Passwort erneut eingeben</label>
					<input type="text" id="passwort2" name="passwort2" placeholder="Dein Passwort...">
					
					<input type="submit" value="Registrieren">
				</form>
			</div>
		</main>
		<footer>
			<?php include("footer.inc.php"); ?>
		</footer>
		<script src="script.js"></script>
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
		<script src="https://unpkg.com/scrollreveal/dist/scrollreveal.min.js"></script>
	</body>
</html>