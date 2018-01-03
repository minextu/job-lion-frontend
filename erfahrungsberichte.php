<!doctype html>
<html lang="de">
	<head>
		<title>Erfahrungsberichte</title>
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
			<div style="padding: 5em 3em 2em 3em;">
				<form action="">
					
					<label for="titel">Titel</label>
					<input type="text" id="titel" name="titel" placeholder="Titel hinzufügen..."><br>
					<label for="categories">Kategorien</label>
					<br><a href="kategorien.php">Kategorie hinzufügen</a><br>
					<label for="text">Erfahrungsbericht</label><br>
					<textarea name="text" rows="10" cols="100"></textarea>
					<input type="submit" value="Hinzufügen">
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